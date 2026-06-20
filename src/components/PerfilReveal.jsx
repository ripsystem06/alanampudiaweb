import { useEffect, useRef, useState, Fragment, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import FirmaSVG from './FirmaSVG'

const FIRMA_DURATION = 2800 // ms — animación de la firma durante el bloqueo

export default function PerfilReveal() {
  const { t } = useLanguage();
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const firmaRef = useRef(null)
  const [firmaProgress, setFirmaProgress] = useState(0)
  const scrollLocked = useRef(false)
  const firmaAnimRef = useRef(null)
  const lastScrollY = useRef(window.scrollY)
  const ready = useRef(false)
  const firmaDone = useRef(false) // evita re-lock después de completar

  const startFirmaTimer = useCallback(() => {
    if (firmaAnimRef.current) return
    const start = performance.now()
    const tick = (now) => {
      const prog = Math.min(1, (now - start) / FIRMA_DURATION)
      setFirmaProgress(prog)
      if (prog < 1) {
        firmaAnimRef.current = requestAnimationFrame(tick)
      } else {
        firmaAnimRef.current = null
        scrollLocked.current = false
        firmaDone.current = true
      }
    }
    firmaAnimRef.current = requestAnimationFrame(tick)
  }, [])

  const releaseLock = useCallback(() => {
    scrollLocked.current = false
    if (firmaAnimRef.current) {
      cancelAnimationFrame(firmaAnimRef.current)
      firmaAnimRef.current = null
    }
    setFirmaProgress(0)
  }, [])

  // Wheel interceptor: bloquea scroll hacia abajo durante el lock
  useEffect(() => {
    const onWheel = (e) => {
      if (!scrollLocked.current) return
      if (e.deltaY > 0) {
        e.preventDefault()
      } else if (e.deltaY < 0) {
        releaseLock()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [releaseLock])

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const firma = firmaRef.current
    if (!section || !card) return

    const mob = window.innerWidth < 768
    const targetW = mob ? 63 : 35
    const targetMaxW = mob ? 405 : 600

    const handleScroll = () => {
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const raw = 1 - (rect.top / vh)
      const p = Math.min(1, Math.max(0, raw))

      const scrollY = window.scrollY
      const scrollingDown = scrollY > lastScrollY.current
      const isFirstCall = !ready.current
      lastScrollY.current = scrollY
      ready.current = true

      // Phase 1 (0 - 0.2): image fades in
      // Phase 2 (0.2 - 0.6): image shrinks to card
      const fadeIn = Math.min(1, p / 0.2)
      const shrink = p < 0.2 ? 0 : Math.min(1, (p - 0.2) / 0.4)
      const t = shrink

      const currentW = lerp(90, targetW, t)
      const currentMaxW = lerp(9999, targetMaxW, t)
      const br = lerp(0, 12, t)
      const grayscale = lerp(0, 100, t)
      const contrast = lerp(100, 110, t)
      const bgAlpha = lerp(0, 1, t)
      const shadowAlpha = lerp(0, 0.5, t)
      const padding = lerp(0, mob ? 8 : 12, t)

      card.style.opacity = fadeIn
      card.style.width = `${currentW}vw`
      card.style.maxWidth = `${currentMaxW}px`
      card.style.borderRadius = `${br}px`
      card.style.filter = t > 0 ? `grayscale(${grayscale}%) contrast(${contrast}%)` : `grayscale(${grayscale}%)`
      card.style.background = `rgba(255,255,255,${bgAlpha})`
      card.style.boxShadow = `0 0 60px rgba(0,0,0,${shadowAlpha}), 0 0 30px rgba(233,30,99,${shadowAlpha * 0.1})`
      card.style.padding = `${padding}px`

      // Firma: al llegar a la tarjeta formada, bloquea scroll y anima con timer
      if (!isFirstCall && !firmaDone.current && p >= 0.6 && scrollingDown && !scrollLocked.current) {
        scrollLocked.current = true
        startFirmaTimer()
      }

      if (firma) {
        const firmaOpacity = Math.min(1, Math.max(0, (p - 0.55) / 0.1))
        firma.style.opacity = firmaOpacity
      }
    }

    function lerp(a, b, t) { return a + (b - a) * t }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [startFirmaTimer])

  const marqueeKeys = ['home.perfil_felicidad', 'home.perfil_amor', 'home.perfil_adrenalina']
  const normalColor = 'rgba(255,255,255,0.85)'

  return (
    <section
      ref={sectionRef}
      className="perfil-reveal-section"
    >
      <style>{`
        .perfil-reveal-section {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          background: var(--black);
          margin-bottom: -8vh;
        }
        .perfil-reveal-inner {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .perfil-card {
          position: relative;
          z-index: 2;
          overflow: hidden;
          background: transparent;
          will-change: width, max-width, filter, opacity, border-radius, background, box-shadow, padding;
        }
        .perfil-card img {
          display: block;
          width: 100%;
          object-fit: cover;
          aspect-ratio: auto 3300 / 2538;
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
        .perfil-firma {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 580px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          aspect-ratio: 1.2;
        }
        @media (min-width: 768px) {
          .perfil-firma {
            width: 45vw;
            max-width: 780px;
          }
        }
        .perfil-firma-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: blur(12px);
          opacity: 0.3;
        }
        .perfil-firma-main {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div className="perfil-reveal-inner">

        {/* Marquee Row 1 */}
        <div className="perfil-marquee-row" style={{ top: 'calc(50% - 5.5rem)' }}>
          <div className="perfil-marquee-track" style={{ animation: 'marquee-ltr 18s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`m1-${i}`} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {marqueeKeys.map((key, wi) => (
                  <Fragment key={wi}>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: key === 'home.perfil_amor' ? 'var(--magenta)' : normalColor }}>{t(key)}</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: normalColor, margin: '0 0.3em' }}>—</span>
                  </Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div className="perfil-marquee-row" style={{ top: 'calc(50% + 2.5rem)' }}>
          <div className="perfil-marquee-track" style={{ animation: 'marquee-rtl 18s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`m2-${i}`} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {marqueeKeys.map((key, wi) => (
                  <Fragment key={wi}>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: key === 'home.perfil_amor' ? 'var(--magenta)' : normalColor }}>{t(key)}</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: normalColor, margin: '0 0.3em' }}>—</span>
                  </Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Photo card — shrinks from large to card */}
        <div ref={cardRef} className="perfil-card" style={{ opacity: 0 }}>
          <img
            src="/hero5.webp"
            alt="Alan Ampudia"
            draggable="false"
          />
        </div>

        {/* Signature — animated with FirmaSVG */}
        <div ref={firmaRef} className="perfil-firma">
          {/* Glow behind */}
          <div className="perfil-firma-glow">
            <FirmaSVG progress={1} />
          </div>
          {/* Main animated stroke */}
          <div className="perfil-firma-main">
            <FirmaSVG progress={firmaProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}
