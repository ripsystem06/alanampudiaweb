import { useEffect, useRef, useState } from 'react'
import FirmaSVG from './FirmaSVG'

// Smoothstep: silky ease-in-out
function smoothstep(t) {
  t = Math.max(0, Math.min(1, t))
  return t * t * (3 - 2 * t)
}

export default function PerfilReveal() {
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const rafRef = useRef(null)
  const [firmaProgress, setFirmaProgress] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const image = imageRef.current
    if (!wrapper || !image) return

    const updateProgress = () => {
      const wrapperRect = wrapper.getBoundingClientRect()
      const wrapperHeight = wrapper.offsetHeight
      const viewportHeight = window.innerHeight

      let p = -wrapperRect.top / (wrapperHeight - viewportHeight)
      p = Math.max(0, Math.min(1, p))

      const isMobile = window.innerWidth < 768

      // ========== IMAGE — gentle emergence ==========
      // Opacity: soft fade-in over the first 30% — no jarring pop
      const opacityRaw = Math.min(1, p / 0.3)
      const opacity = smoothstep(opacityRaw)

      // TranslateY: gentle descent from above — not a dramatic drop
      const startY = isMobile ? -28 : -20
      let slide = Math.min(p / 0.75, 1)
      slide = 1 - Math.pow(1 - slide, 3) // ease-out cubic
      const translateY = startY * (1 - slide)

      // Scale: continuous gradual shrink from slightly-large to final size
      const startScale = isMobile ? 1.15 : 1.10
      const endScale = 0.36
      let shrink = p
      shrink = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      const scale = startScale + (endScale - startScale) * shrink

      // Grayscale: subtle kick-in after image mostly settled (0.70 → 1)
      let grayscale = 0
      if (p > 0.70) {
        grayscale = (p - 0.70) / 0.30
        grayscale = grayscale < 0.5
          ? 2 * grayscale * grayscale
          : 1 - Math.pow(-2 * grayscale + 2, 2) / 2
      }

      image.style.opacity = opacity
      image.style.transform = `translateY(${translateY}vh) scale(${scale})`
      image.style.filter = `grayscale(${grayscale})`

      // ========== SIGNATURE — progressive stroke draw ==========
      let firmaP = (p - 0.45) / 0.50
      firmaP = Math.max(0, Math.min(1, firmaP))
      setFirmaProgress(firmaP)

      rafRef.current = null
    }

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateProgress)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true })
          onScroll()
        } else {
          window.removeEventListener('scroll', onScroll)
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
          }
        }
      },
      { threshold: 0 }
    )

    observer.observe(wrapper)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const marqueeWords = ['FELICIDAD', 'ADRENALINA', 'AMOR']
  const marqueeSep = ' \u00B7 '
  const normalColor = 'rgba(255,255,255,0.85)'

  return (
    <div
      ref={wrapperRef}
      className="perfil-outer-wrapper"
      style={{ position: 'relative', height: '280vh', background: 'var(--black)' }}
    >
      <style>{`
        .perfil-outer-wrapper {
          margin-top: -10vh;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .perfil-outer-wrapper {
            height: 320vh !important;
            margin-top: -12vh;
          }
        }
        .perfil-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .perfil-image {
          width: 85vw;
          max-width: 500px;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: center 15%;
          border-radius: 8px;
          border: 1px solid rgba(233,30,99,0.3);
          box-shadow: 0 0 50px rgba(233,30,99,0.1);
          will-change: transform, opacity, filter;
          opacity: 0;
          transform: translateY(-55vh) scale(1.1);
          transition: filter 0.3s ease;
        }
        @media (min-width: 768px) {
          .perfil-image {
            width: 38vw;
            max-width: none;
            transform: translateY(-45vh) scale(1.06);
          }
        }
        .perfil-marquee-row {
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          line-height: 1;
        }
        .perfil-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .perfil-firma {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(200px, 50vw, 360px);
          opacity: 0;
          z-index: 3;
          pointer-events: none;
          will-change: opacity;
          transition: none;
        }
        @media (min-width: 768px) {
          .perfil-firma {
            bottom: 10%;
            width: clamp(240px, 28vw, 400px);
          }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="perfil-sticky">
        

        {/* Marquee Row 1 — scrolls LEFT to RIGHT */}
        <div
          className="perfil-marquee-row"
          style={{ top: 'calc(50% - 4.5rem)' }}
        >
          <div
            className="perfil-marquee-track"
            style={{ animation: 'marquee-ltr 18s linear infinite' }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`m1-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingRight: '0.4rem' }}>
                {marqueeWords.map((word, wi) => (
                  <span
                    key={wi}
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                      whiteSpace: 'nowrap',
                      color: word === 'AMOR' ? 'var(--magenta)' : normalColor,
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: normalColor,
                  whiteSpace: 'nowrap',
                }}>
                  {marqueeSep}
                </span>
              </span>
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`m1d-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingRight: '0.4rem' }}>
                {marqueeWords.map((word, wi) => (
                  <span
                    key={wi}
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                      whiteSpace: 'nowrap',
                      color: word === 'AMOR' ? 'var(--magenta)' : normalColor,
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: normalColor,
                  whiteSpace: 'nowrap',
                }}>
                  {marqueeSep}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — scrolls RIGHT to LEFT */}
        <div
          className="perfil-marquee-row"
          style={{ top: 'calc(50% + 0.5rem)' }}
        >
          <div
            className="perfil-marquee-track"
            style={{ animation: 'marquee-rtl 18s linear infinite' }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`m2-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingRight: '0.4rem' }}>
                {marqueeWords.map((word, wi) => (
                  <span
                    key={wi}
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                      whiteSpace: 'nowrap',
                      color: word === 'AMOR' ? 'var(--magenta)' : normalColor,
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: normalColor,
                  whiteSpace: 'nowrap',
                }}>
                  {marqueeSep}
                </span>
              </span>
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`m2d-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingRight: '0.4rem' }}>
                {marqueeWords.map((word, wi) => (
                  <span
                    key={wi}
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                      whiteSpace: 'nowrap',
                      color: word === 'AMOR' ? 'var(--magenta)' : normalColor,
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: normalColor,
                  whiteSpace: 'nowrap',
                }}>
                  {marqueeSep}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Center: image */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            ref={imageRef}
            className="perfil-image"
            src="/perfil.webp"
            alt="Alan Ampudia"
            draggable="false"
          />
        </div>

        {/* Signature — scroll-driven stroke drawing animation */}
        <div
          className="perfil-firma"
          style={{
            opacity: firmaProgress > 0.01 ? 1 : 0,
          }}
        >
          <FirmaSVG progress={firmaProgress} />
        </div>
      </div>
    </div>
  )
}