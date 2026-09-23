"use client"

import * as React from "react"
import { Geometry, Mesh, Program, Renderer } from "ogl"

import { cn } from "@/lib/utils"

type Shape = {
  src: string
  /** Fraction of the frame the image may occupy. */
  fit: number
  /** Fit used when the frame is narrower than 520px. */
  mobileFit?: number
  /** How long the shape is held before the next morph, in ms. */
  hold: number
}

const VERT = `#version 300 es
in vec2 aFrom;
in vec2 aTo;
in vec4 aSeed;
in vec2 aOffset;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uTime;
uniform float uDpr;
uniform float uSize;
uniform float uMotion;
uniform float uIntro;

out float vSeed;
out float vTravel;
out float vAlpha;

const float PI = 3.14159265;

float easeInOut(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float delay = aSeed.x * 0.4;
  float t = easeInOut(clamp((uProgress - delay) / 0.6, 0.0, 1.0));

  vec2 pos = mix(aFrom, aTo, t);

  float arc = sin(t * PI);
  vec2 swing = (aSeed.zw - 0.5) * 2.0;
  pos += vec2(-swing.y, swing.x) * arc * mix(36.0, 70.0, uIntro);

  float phase = aSeed.y * 6.2831;
  pos += vec2(sin(uTime * 0.8 + phase), cos(uTime * 0.6 + phase * 1.3)) * 1.1 * uMotion;

  pos += aOffset;

  vec2 clip = (pos / uResolution) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = uSize * uDpr * (0.75 + aSeed.w * 0.5);

  vSeed = aSeed.y;
  vTravel = arc;
  vAlpha = mix(1.0, smoothstep(0.0, 0.7, t), uIntro);
}
`

const FRAG = `#version 300 es
precision highp float;

in float vSeed;
in float vTravel;
in float vAlpha;

out vec4 fragColor;

const vec3 MARFIL = vec3(0.961, 0.953, 0.933);
const vec3 NIEBLA = vec3(0.788, 0.851, 0.945);

void main() {
  float d = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.5, 0.0, d);
  if (core <= 0.0) discard;
  vec3 color = mix(MARFIL, NIEBLA, step(0.72, vSeed) * 0.9 + vTravel * 0.35);
  fragColor = vec4(color, core * (0.85 - vTravel * 0.25) * vAlpha);
}
`

const POINTER_RADIUS = 120
const POINTER_FORCE = 1.1
const SPRING = 0.05
const DAMPING = 0.88

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function sampleShape(
  img: HTMLImageElement,
  fit: number,
  width: number,
  height: number,
  count: number,
) {
  const scale = Math.min((width * fit) / img.width, (height * fit) / img.height)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const ox = Math.round((width - w) / 2)
  const oy = Math.round((height - h) / 2)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) return new Float32Array(count * 2)
  ctx.drawImage(img, ox, oy, w, h)

  const { data } = ctx.getImageData(0, 0, width, height)
  const filled: number[] = []
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 110) filled.push((i - 3) / 4)
  }

  const points: [number, number][] = []
  if (!filled.length) return new Float32Array(count * 2)
  for (let i = 0; i < count; i++) {
    const p = filled[(Math.random() * filled.length) | 0]
    points.push([(p % width) + Math.random(), Math.floor(p / width) + Math.random()])
  }
  return toSortedBuffer(points)
}

/** Sorting every shape the same way pairs particles by position, so each one travels a short path. */
function toSortedBuffer(points: [number, number][]) {
  points.sort((a, b) => a[0] - b[0])
  const out = new Float32Array(points.length * 2)
  points.forEach(([x, y], i) => {
    out[i * 2] = x
    out[i * 2 + 1] = y
  })
  return out
}

function dust(width: number, height: number, count: number) {
  const points: [number, number][] = []
  for (let i = 0; i < count; i++) {
    points.push([
      (Math.random() * 1.3 - 0.15) * width,
      height / 2 + (Math.random() - 0.5) * height * 1.1,
    ])
  }
  return toSortedBuffer(points)
}

export function ParticleMorph({
  shapes,
  transitionDuration = 2200,
  particleSize = 2,
  className,
  children,
}: {
  shapes: Shape[]
  transitionDuration?: number
  particleSize?: number
  className?: string
  children?: React.ReactNode
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const ctn = containerRef.current
    if (!ctn) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let disposed = false
    let cleanup = () => {}

    Promise.all(shapes.map((s) => loadImage(s.src))).then((images) => {
      if (disposed) return

      let renderer: Renderer
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 2),
          alpha: true,
          premultipliedAlpha: false,
        })
      } catch {
        return
      }
      const gl = renderer.gl
      gl.clearColor(0, 0, 0, 0)
      const canvas = gl.canvas as HTMLCanvasElement
      canvas.style.position = "absolute"
      canvas.style.inset = "0"
      canvas.style.width = "100%"
      canvas.style.height = "100%"

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        depthTest: false,
        uniforms: {
          uResolution: { value: [1, 1] },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uDpr: { value: renderer.dpr },
          uSize: { value: particleSize },
          uMotion: { value: reduce ? 0 : 1 },
          uIntro: { value: 0 },
        },
      })
      program.setBlendFunc(gl.SRC_ALPHA, gl.ONE)

      let mesh: Mesh | null = null
      let targets: Float32Array[] = []
      let current = 0
      let count = 0
      let from: Float32Array = new Float32Array(0)
      let seeds = new Float32Array(0)
      let offsets = new Float32Array(0)
      let velocity = new Float32Array(0)
      let settled = true
      let phaseStart = performance.now()
      let morphing = true
      let introPlayed = false
      const pointer = {
        x: -9999,
        y: -9999,
        targetX: -9999,
        targetY: -9999,
        active: 0,
        targetActive: 0,
      }

      let size = { width: 0, height: 0 }

      const build = () => {
        const width = Math.max(1, Math.round(ctn.clientWidth))
        const height = Math.max(1, Math.round(ctn.clientHeight))
        if (width === size.width && height === size.height) return
        size = { width, height }
        renderer.setSize(width, height)
        program.uniforms.uResolution.value = [width, height]

        count = Math.min(26000, Math.round((width * height) / 1000) * 70)
        const narrow = width < 520
        targets = images.map((img, i) =>
          sampleShape(
            img,
            narrow ? (shapes[i].mobileFit ?? shapes[i].fit) : shapes[i].fit,
            width,
            height,
            count,
          ),
        )

        seeds = new Float32Array(count * 4)
        for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random()
        offsets = new Float32Array(count * 2)
        velocity = new Float32Array(count * 2)
        settled = true

        const intro = !reduce && !introPlayed
        introPlayed = true
        from = intro ? dust(width, height, count) : targets[current]
        const geometry = new Geometry(gl, {
          aFrom: { size: 2, data: from },
          aTo: { size: 2, data: targets[current] },
          aSeed: { size: 4, data: seeds },
          aOffset: { size: 2, data: offsets },
        })
        mesh?.geometry.remove()
        mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program })
        phaseStart = performance.now()
        morphing = intro
        program.uniforms.uIntro.value = intro ? 1 : 0
        program.uniforms.uProgress.value = intro ? 0 : 1
        renderer.render({ scene: mesh })
      }

      const advance = (now: number) => {
        if (!mesh || targets.length < 2) return
        const next = (current + 1) % targets.length
        const attrs = mesh.geometry.attributes
        from = targets[current]
        attrs.aFrom.data = from
        attrs.aFrom.needsUpdate = true
        attrs.aTo.data = targets[next]
        attrs.aTo.needsUpdate = true
        program.uniforms.uProgress.value = 0
        program.uniforms.uIntro.value = 0
        current = next
        phaseStart = now
        morphing = true
      }

      const onPointerMove = (e: PointerEvent) => {
        const rect = ctn.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        if (pointer.targetActive === 0) {
          pointer.x = x
          pointer.y = y
        }
        pointer.targetX = x
        pointer.targetY = y
        pointer.targetActive = 1
      }
      const onPointerLeave = () => {
        pointer.targetActive = 0
      }
      const onTouchEnd = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") pointer.targetActive = 0
      }

      const stepPhysics = () => {
        if (!mesh) return
        const pushing = pointer.active > 0.01
        if (!pushing && settled) return

        const to = targets[current]
        const progress = program.uniforms.uProgress.value as number
        const r2 = POINTER_RADIUS * POINTER_RADIUS
        let energy = 0

        for (let i = 0; i < count; i++) {
          const ix = i * 2
          const iy = ix + 1
          let vx = velocity[ix]
          let vy = velocity[iy]

          if (pushing) {
            const t = easeInOut(
              Math.min(1, Math.max(0, (progress - seeds[i * 4] * 0.4) / 0.6)),
            )
            const dx = from[ix] + (to[ix] - from[ix]) * t + offsets[ix] - pointer.x
            const dy = from[iy] + (to[iy] - from[iy]) * t + offsets[iy] - pointer.y
            const d2 = dx * dx + dy * dy
            if (d2 < r2 && d2 > 0.0001) {
              const d = Math.sqrt(d2)
              const falloff = 1 - d / POINTER_RADIUS
              const force = falloff * falloff * POINTER_FORCE * pointer.active
              vx += (dx / d) * force
              vy += (dy / d) * force
            }
          }

          vx = (vx - offsets[ix] * SPRING) * DAMPING
          vy = (vy - offsets[iy] * SPRING) * DAMPING
          offsets[ix] += vx
          offsets[iy] += vy
          velocity[ix] = vx
          velocity[iy] = vy
          energy += Math.abs(offsets[ix]) + Math.abs(offsets[iy]) + Math.abs(vx) + Math.abs(vy)
        }

        settled = !pushing && energy < count * 0.01
        if (settled) {
          offsets.fill(0)
          velocity.fill(0)
        }
        mesh.geometry.attributes.aOffset.needsUpdate = true
      }

      let resizeTimer = 0
      const ro = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(build, 150)
      })

      ctn.appendChild(canvas)
      build()
      ro.observe(ctn)
      setReady(true)

      let frame = 0
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick)
        const elapsed = now - phaseStart
        if (morphing) {
          const p = Math.min(1, elapsed / transitionDuration)
          program.uniforms.uProgress.value = p
          if (p >= 1) {
            morphing = false
            phaseStart = now
          }
        } else if (elapsed > shapes[current].hold) {
          advance(now)
        }

        pointer.x += (pointer.targetX - pointer.x) * 0.35
        pointer.y += (pointer.targetY - pointer.y) * 0.35
        pointer.active += (pointer.targetActive - pointer.active) * 0.1
        stepPhysics()

        program.uniforms.uTime.value = now * 0.001
        if (mesh) renderer.render({ scene: mesh })
      }

      if (!reduce) {
        frame = requestAnimationFrame(tick)
        window.addEventListener("pointermove", onPointerMove, { passive: true })
        window.addEventListener("pointerup", onTouchEnd, { passive: true })
        window.addEventListener("pointercancel", onPointerLeave, { passive: true })
        document.documentElement.addEventListener("pointerleave", onPointerLeave)
      }

      cleanup = () => {
        cancelAnimationFrame(frame)
        window.clearTimeout(resizeTimer)
        ro.disconnect()
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", onTouchEnd)
        window.removeEventListener("pointercancel", onPointerLeave)
        document.documentElement.removeEventListener("pointerleave", onPointerLeave)
        mesh?.geometry.remove()
        canvas.remove()
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [shapes, transitionDuration, particleSize])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          ready && "invisible",
        )}
      >
        {children}
      </div>
    </div>
  )
}
