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
        background: '#ffffff',
      }}
    >
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
    </section>
  )
}