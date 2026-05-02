"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Color, Mesh, Program, Renderer, Triangle } from "ogl"

import { cn } from "@/lib/utils"

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

type ColorStops = readonly [string, string, string]

interface AuroraProps {
  /** Tres colores HEX que forman el gradiente horizontal de la aurora */
  colorStops?: ColorStops
  /** 0 = casi sin movimiento, 1 = velocidad por defecto */
  speed?: number
  /** 0 = transparente, 1 = más sólido */
  blend?: number
  /** 0 = ondas planas, 1+ = más onduladas */
  amplitude?: number
  className?: string
}

const DARK_DEFAULT: ColorStops = ["#ffffff", "#cfcfcf", "#ffffff"]
const LIGHT_DEFAULT: ColorStops = ["#9a9a9a", "#c4c4c4", "#9a9a9a"]

export function Aurora({
  colorStops: colorStopsProp,
  speed = 0.5,
  blend = 0.55,
  amplitude = 1.0,
  className,
}: AuroraProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileMq = window.matchMedia("(max-width: 640px)")
    setReduceMotion(reduceMq.matches)
    setIsMobile(mobileMq.matches)
    const reduceHandler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    reduceMq.addEventListener("change", reduceHandler)
    mobileMq.addEventListener("change", mobileHandler)
    return () => {
      reduceMq.removeEventListener("change", reduceHandler)
      mobileMq.removeEventListener("change", mobileHandler)
    }
  }, [])

  const colorStops: ColorStops =
    colorStopsProp ?? (resolvedTheme === "dark" ? DARK_DEFAULT : LIGHT_DEFAULT)

  const effectiveSpeed = isMobile ? speed * 0.65 : speed
  const effectiveAmplitude = isMobile ? amplitude * 0.7 : amplitude

  const propsRef = React.useRef({
    colorStops,
    speed: effectiveSpeed,
    blend,
    amplitude: effectiveAmplitude,
  })
  propsRef.current = {
    colorStops,
    speed: effectiveSpeed,
    blend,
    amplitude: effectiveAmplitude,
  }

  React.useEffect(() => {
    if (reduceMotion) return
    const ctn = containerRef.current
    if (!ctn) return

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.backgroundColor = "transparent"
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) {
      delete (geometry.attributes as Record<string, unknown>).uv
    }

    const initialStops = propsRef.current.colorStops.map((hex) => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    })

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: propsRef.current.amplitude },
        uColorStops: { value: initialStops },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: propsRef.current.blend },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(canvas)

    const resize = () => {
      const width = ctn.offsetWidth
      const height = ctn.offsetHeight
      renderer.setSize(width, height)
      program.uniforms.uResolution.value = [width, height]
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(ctn)

    let animateId = 0
    const update = (t: number) => {
      animateId = requestAnimationFrame(update)
      const next = propsRef.current
      program.uniforms.uTime.value = t * 0.001 * next.speed
      program.uniforms.uAmplitude.value = next.amplitude
      program.uniforms.uBlend.value = next.blend
      program.uniforms.uColorStops.value = next.colorStops.map((hex) => {
        const c = new Color(hex)
        return [c.r, c.g, c.b]
      })
      renderer.render({ scene: mesh })
    }
    animateId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animateId)
      ro.disconnect()
      if (canvas.parentNode === ctn) {
        ctn.removeChild(canvas)
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [reduceMotion])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  )
}
