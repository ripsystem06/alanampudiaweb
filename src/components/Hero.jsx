import React, { Suspense, useState, useEffect, useRef } from 'react'

const HeroCanvas = React.lazy(() => import('./HeroCanvas'))

export default function Hero() {
  const heroRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const heroHeight = rect.height
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / heroHeight)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const opacity = 1 - Math.min(1, scrollProgress / 0.5)
  const textY = `${scrollProgress * 12}%`

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--black)',
      }}
    >
      <style>{`
        @keyframes heroFadeInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeInUpSmall {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroPulseDot {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2); opacity: 1; }
        }
        @keyframes heroScrollLine {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.15); }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to right, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.0) 38%, rgba(5,5,5,0.0) 62%, rgba(5,5,5,0.72) 100%), ' +
            'linear-gradient(to top,   rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.0) 40%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px 24px 40px',
          pointerEvents: 'none',
          transform: `translateY(${textY})`,
          opacity: opacity,
        }}
        className="hero-text-overlay"
      >
        <style>{`
          @media (min-width: 768px) {
            .hero-text-overlay {
              padding: 32px 48px 40px !important;
            }
          }
        `}</style>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                opacity: 0,
                animation: 'heroFadeInUp 0.9s 2.3s forwards',
                animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
<h1
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(4.5rem, 12vw, 16rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--magenta)',
                    textShadow: '0 0 60px var(--magenta-glow)',
                    margin: 0,
                  }}
                >
                  AMPUDIA
                </h1>
            </div>
          </div>

          <div
            style={{
              opacity: 0,
              animation: 'heroFadeInUpSmall 0.8s 2.6s forwards',
              animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
          opacity: 0,
          animation: 'heroFadeIn 0.8s 3.2s forwards',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--magenta)',
            opacity: 0.5,
            animation: 'heroScrollLine 2.2s ease-in-out infinite',
            transformOrigin: 'top',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.5em',
            color: 'var(--white-dim)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.06)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        #1
      </div>
    </section>
  )
}
