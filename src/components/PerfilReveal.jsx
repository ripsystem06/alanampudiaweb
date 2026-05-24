import { useEffect, useRef } from 'react'

export default function PerfilReveal() {
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const rafRef = useRef(null)

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

      // ========== IMAGE ==========
      // Everything is one continuous motion — no separate phases.
      // The image appears, descends, and shrinks all at once, smoothly.

      // Opacity: quick fade-in at the start
      const opacity = Math.min(1, p / 0.18)
      // Soft ease: fast entry, gentle landing

      // TranslateY: from above viewport down to centered
      // Starts at -50vh, reaches 0 around 60% of progress
      const startY = isMobile ? -55 : -45
      let slide = Math.min(p / 0.65, 1)
      slide = 1 - Math.pow(1 - slide, 3) // ease-out cubic — swift arrival
      const translateY = startY * (1 - slide)

      // Scale: continuous shrink from 1.1 to final size over the entire progress
      const startScale = isMobile ? 1.1 : 1.06
      const endScale = isMobile ? 0.38 : 0.25
      // Ease-in-out for natural deceleration at both ends
      let shrink = p
      shrink = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      const scale = startScale + (endScale - startScale) * shrink

      // Grayscale: kicks in after image has settled, from progress 0.65 → 1
      let grayscale = 0
      if (p > 0.65) {
        grayscale = (p - 0.65) / 0.35 // 0 → 1
        grayscale = grayscale < 0.5
          ? 2 * grayscale * grayscale
          : 1 - Math.pow(-2 * grayscale + 2, 2) / 2
      }

      image.style.opacity = opacity
      image.style.transform = `translateY(${translateY}vh) scale(${scale})`
      image.style.filter = `grayscale(${grayscale})`

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
        .perfil-label {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: var(--magenta);
          z-index: 5;
          pointer-events: none;
          text-transform: uppercase;
        }
        @media (min-width: 768px) {
          .perfil-label {
            left: 4rem;
            top: 2rem;
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
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="perfil-sticky">
        {/* Section label */}
        <div className="perfil-label">02 / Perfil</div>

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
                      color: word === 'AMOR' ? 'var(--magenta)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: 'rgba(255,255,255,0.05)',
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
                      color: word === 'AMOR' ? 'var(--magenta)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: 'rgba(255,255,255,0.05)',
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
                      color: word === 'AMOR' ? 'var(--magenta)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: 'rgba(255,255,255,0.05)',
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
                      color: word === 'AMOR' ? 'var(--magenta)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {word}
                  </span>
                ))}
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                  color: 'rgba(255,255,255,0.05)',
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

        {/* Signature placeholder — will be replaced with new stroke-based SVG */}
      </div>
    </div>
  )
}