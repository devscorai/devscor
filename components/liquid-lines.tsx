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

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float beam(float f, float w) {
  return exp(-f * f / (2.0 * w * w));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime * 0.4;

  vec2 q = mat2(0.77, -0.64, 0.64, 0.77) * p;
  float across = q.x + 0.015 * sin(q.y * 2.4 + t * 1.3);
  float along = q.y;

  vec3 light = vec3(0.0);
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float v = across * (7.0 + fk * 6.0) + t * (0.25 + fk * 0.12) + fk * 3.7;
    float id = floor(v) + fk * 31.0;
    float f = fract(v) - 0.5;
    float h = hash(id);
    if (h < 0.3) continue;

    float blur = hash(id + 7.0);
    float w = mix(0.006, 0.14, blur * blur * blur);
    float ca = 0.002 + w * 0.12;
    float energy = pow(0.01 / w, 0.4);
    float sheen = 0.25 + 0.75 * smoothstep(-0.9, 1.0,
      sin(along * (1.2 + h) + h * 6.283 + t * (0.6 + h)));

    vec3 rgb = vec3(
      beam(f - ca, w) * 1.05,
      beam(f, w) * 0.92,
      beam(f + ca, w) * 1.08
    );
        light += rgb * energy * sheen * (h - 0.3) * 4.0;
  }

  vec3 color = TINTA + 1.0 - exp(-light * 2.0);

  float focus = mix(0.12, 1.0, smoothstep(0.25, 0.85, length(p * vec2(0.8, 1.4))));
  float vignette = smoothstep(1.6, 0.4, length(uv - 0.5) * 1.6);
  color = mix(TINTA, color, focus * vignette);

  fragColor = vec4(color, 1.0);
}
`

export function LiquidLines({ className }: { className?: string }) {
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
      className={cn("bg-[#151515]", className)}
    />
  )
}
