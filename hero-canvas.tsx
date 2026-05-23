'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── WebGL Ink-Reveal Hero ─────────────────────────────────────────────────
// Base image  : Alan with helmet (casco)  — shown first
// Reveal image: Alan without helmet (persona) — revealed by brushing
//
// The shader does proper "object-fit: cover, object-position: top center" UV
// mapping so both images are centered and zoomed 10% from the top.
// The displacement buffer is a plain Uint8Array so reads/writes are consistent.

const VERT = `
attribute vec2 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_uv;
}
`

const FRAG = `
precision highp float;
uniform sampler2D u_base;
uniform sampler2D u_reveal;
uniform sampler2D u_disp;
uniform float     u_time;
uniform vec2      u_resolution;
uniform vec2      u_imgSize;

// object-fit: cover, anchored top-center, with extra zoom
vec2 coverUV(vec2 uv, vec2 canvasSize, vec2 imgSize, float zoom) {
  float canvasAspect = canvasSize.x / canvasSize.y;
  float imgAspect    = imgSize.x / imgSize.y;

  vec2 scale;
  if (canvasAspect > imgAspect) {
    scale = vec2(1.0, imgAspect / canvasAspect);
  } else {
    scale = vec2(canvasAspect / imgAspect, 1.0);
  }
  scale *= zoom;

  // Center horizontally, anchor to top (GL: y=1 is top)
  vec2 offset = vec2((1.0 - scale.x) * 0.5, 1.0 - scale.y);
  return offset + uv * scale;
}

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  // Both images sampled with identical clean UV — no distortion on either
  vec2 texUV = coverUV(uv, u_resolution, u_imgSize, 1.1);

  // Ink coverage from brush buffer (0..1)
  float ink = texture2D(u_disp, uv).r;

  // Base (helmet) — completely sharp, no ripple ever
  vec4 base   = texture2D(u_base,   texUV);
  // Reveal (persona) — also sharp, no UV distortion
  vec4 reveal = texture2D(u_reveal, texUV);

  // Smooth blend driven purely by ink mask
  float mixFactor = smoothstep(0.05, 0.80, ink);

  // Subtle animated shimmer at the edge of the brush stroke — neon green
  float edge = smoothstep(0.04, 0.18, ink) * (1.0 - smoothstep(0.18, 0.50, ink));
  float shimmer = sin(uv.x * 40.0 + u_time * 5.0) * 0.5 + 0.5;
  // Neon green (#C8FF00 approx) to bright white shimmer
  vec3 glowColor = mix(vec3(0.78, 1.0, 0.0), vec3(0.90, 1.0, 0.55), shimmer);

  vec4 blended = mix(base, reveal, mixFactor);
  blended.rgb  = mix(blended.rgb, glowColor, edge * 0.28);

  gl_FragColor = blended;
}
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[v0] Shader compile error:', gl.getShaderInfoLog(shader))
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const prog = gl.createProgram()!
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[v0] Program link error:', gl.getProgramInfoLog(prog))
  }
  return prog
}

function loadTex(gl: WebGLRenderingContext, img: HTMLImageElement, unit: number): WebGLTexture {
  const tex = gl.createTexture()!
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return tex
}

const DISP_W = 512
const DISP_H = 512

export default function HeroCanvas({ className }: { className?: string }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)
  // Use plain Uint8Array so values are always 0–255 integers
  const dispDataRef  = useRef<Uint8Array>(new Uint8Array(DISP_W * DISP_H * 4))
  const dispTexRef   = useRef<WebGLTexture | null>(null)
  const glRef        = useRef<WebGLRenderingContext | null>(null)
  const progRef      = useRef<WebGLProgram | null>(null)
  const isHoveringRef  = useRef<boolean>(false)
  const needsUploadRef = useRef<boolean>(false)

  /** Paint a soft Gaussian brush into the displacement buffer */
  const paint = useCallback((normX: number, normY: number, radius = 55, strength = 0.92) => {
    const data = dispDataRef.current
    const cx   = Math.round(normX  * DISP_W)
    const cy   = Math.round(normY  * DISP_H)
    const r2   = radius * radius

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const dist2 = dx * dx + dy * dy
        if (dist2 > r2) continue
        const px = cx + dx
        const py = cy + dy
        if (px < 0 || px >= DISP_W || py < 0 || py >= DISP_H) continue
        const idx = (py * DISP_W + px) * 4
        const t       = Math.sqrt(dist2) / radius
        // Smooth brush falloff (Gaussian-like)
        const falloff = Math.exp(-t * t * 3.5)
        const inkAdd  = Math.round(strength * falloff * 255)
        // Accumulate, clamp to 255
        data[idx]     = Math.min(255, data[idx]     + inkAdd)
        data[idx + 1] = Math.min(255, data[idx + 1] + inkAdd)
        data[idx + 2] = Math.min(255, data[idx + 2] + inkAdd)
        data[idx + 3] = 255
      }
    }
    needsUploadRef.current = true
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) return
    glRef.current = gl

    const prog = createProgram(gl)
    progRef.current = prog
    gl.useProgram(prog)

    // Full-screen quad (two triangles as TRIANGLE_STRIP)
    const buf = (data: Float32Array) => {
      const b = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      return b
    }

    const posBuf = buf(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]))
    const aPos   = gl.getAttribLocation(prog, 'a_position')
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uvBuf = buf(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]))
    const aUv   = gl.getAttribLocation(prog, 'a_uv')
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
    gl.enableVertexAttribArray(aUv)
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0)

    // Sampler uniforms
    gl.uniform1i(gl.getUniformLocation(prog, 'u_base'),   0)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_reveal'), 1)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_disp'),   2)

    // Create displacement texture from zeroed Uint8Array.
    // UNPACK_FLIP_Y is set so row-0 of the array = top of screen (CSS y=0),
    // matching the coordinate system used in paint().
    const dispTex = gl.createTexture()!
    dispTexRef.current = dispTex
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, dispTex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, DISP_W, DISP_H, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, dispDataRef.current
    )
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // Resize observer
    function resize() {
      if (!canvas || !gl || !prog) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w * Math.min(window.devicePixelRatio, 2)
      canvas.height = h * Math.min(window.devicePixelRatio, 2)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // Load textures — report natural image size so shader can map correctly
    let loaded = 0
    const tryStart = (img: HTMLImageElement) => {
      if (++loaded === 2) {
        // Both images should be same size (they are — square 1080x1080)
        gl.uniform2f(gl.getUniformLocation(prog, 'u_imgSize'), img.naturalWidth, img.naturalHeight)
        startRender()
      }
    }

    const imgBase = new Image()
    imgBase.crossOrigin = 'anonymous'
    imgBase.src = '/images/alan-casco.jpg'
    imgBase.onload = () => { loadTex(gl, imgBase, 0); tryStart(imgBase) }

    const imgReveal = new Image()
    imgReveal.crossOrigin = 'anonymous'
    imgReveal.src = '/images/alan-persona.jpg'
    imgReveal.onload = () => { loadTex(gl, imgReveal, 1); tryStart(imgReveal) }

    const startTime = performance.now()

    function startRender() {
      const uTime = gl.getUniformLocation(prog, 'u_time')

      function decayBuffer() {
        const data = dispDataRef.current
        // When not hovering: fast decay. While hovering: slow decay (trail fades).
        const decayAmount = isHoveringRef.current ? 2 : 8
        const len = data.length
        let changed = false
        for (let i = 0; i < len; i += 4) {
          if (data[i] > 0) {
            data[i]     = Math.max(0, data[i]     - decayAmount)
            data[i + 1] = Math.max(0, data[i + 1] - decayAmount)
            data[i + 2] = Math.max(0, data[i + 2] - decayAmount)
            changed = true
          }
        }
        if (changed) needsUploadRef.current = true
      }

      function frame() {
        if (!gl || !prog) return

        decayBuffer()

        // Upload displacement texture only when it changed
        if (needsUploadRef.current) {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
          gl.activeTexture(gl.TEXTURE2)
          gl.bindTexture(gl.TEXTURE_2D, dispTexRef.current)
          gl.texSubImage2D(
            gl.TEXTURE_2D, 0, 0, 0, DISP_W, DISP_H,
            gl.RGBA, gl.UNSIGNED_BYTE, dispDataRef.current
          )
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
          needsUploadRef.current = false
        }

        const t = (performance.now() - startTime) / 1000
        gl.uniform1f(uTime, t)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        rafRef.current = requestAnimationFrame(frame)
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      let clientX: number, clientY: number
      if ('touches' in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      // No Y-flip: row 0 of dispData = top of screen in CSS.
      // The disp texture is uploaded with UNPACK_FLIP_Y so the shader reads it correctly.
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top)  / rect.height
      paint(x, y, 55, 0.92)
    },
    [paint]
  )

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseEnter={() => { isHoveringRef.current = true }}
      onMouseLeave={() => { isHoveringRef.current = false }}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
