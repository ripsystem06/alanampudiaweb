import React, { Suspense } from 'react'

const HeroCanvas = React.lazy(() => import('./HeroCanvas'))

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--black)',
      }}
    >
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
