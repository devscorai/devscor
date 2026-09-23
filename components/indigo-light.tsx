"use client"

import * as React from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

import { cn } from "@/lib/utils"

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

out vec4 fragColor;

const vec3 TINTA = vec3(0.082, 0.082, 0.082);
const vec3 INDIGO = vec3(0.216, 0.188, 0.769);
const vec3 NIEBLA = vec3(0.788, 0.851, 0.945);

float band(vec2 p, float offset, float speed, float width) {
  float wave =
    sin(p.x * 1.6 + uTime * speed + offset) * 0.22 +
    sin(p.x * 3.1 - uTime * speed * 0.7 + offset * 1.7) * 0.07;
  float d = abs(p.y - wave);
  return exp(-d * d / width);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  float breath = 0.5 + 0.5 * sin(uTime * 0.6);

  float glow = band(p, 0.0, 0.55, 0.05 + 0.015 * breath);
  float core = band(p, 0.0, 0.55, 0.0035);
  float echo = band(p + vec2(0.0, 0.16), 2.1, 0.4, 0.02) * 0.35;

  vec3 color = TINTA;
  color = mix(color, INDIGO, clamp(glow * 0.85 + echo, 0.0, 1.0));
  color += NIEBLA * core * 0.35;

  float vignette = smoothstep(1.25, 0.2, length(uv - 0.5) * 1.6);
  color = mix(TINTA, color, vignette);

  fragColor = vec4(color, 1.0);
}
`

export function IndigoLight({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const ctn = containerRef.current
    if (!ctn) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: Renderer
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        antialias: false,
      })
    } catch {
      return
    }
    const gl = renderer.gl
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.display = "block"

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(canvas)

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight)
      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ]
      if (reduce) renderer.render({ scene: mesh })
    }
    const ro = new ResizeObserver(resize)
    ro.observe(ctn)
    resize()

    let frame = 0
    const tick = (t: number) => {
      frame = requestAnimationFrame(tick)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }
    if (!reduce) frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      canvas.remove()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        "bg-[radial-gradient(ellipse_at_center,#3730C4_0%,#151515_60%)]",
        className,
      )}
    />
  )
}
