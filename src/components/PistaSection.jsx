import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PistaSection() {
  const [hovered, setHovered] = useState(null);

  const blocks = [
    {
      id: 'en-pista', to: '/en-pista', num: '05',
      title: 'EN\nPISTA', tag: 'TRACK',
      description: 'Resultados, estadísticas, victorias y momentos desde el desierto.',
      tags: ['RESULTADOS', 'STATS', 'CARRERAS'],
      img: '/images/02-truck-action-side.webp',
    },
    {
      id: 'fuera-pista', to: '/fuera-de-pista', num: '06',
      title: 'FUERA\nDE PISTA', tag: 'OFF-TRACK',
      description: 'El piloto, el hombre, la familia. Lo que sucede cuando se apaga el motor.',
      tags: ['VIDA', 'FAMILIA', 'CAMPAÑAS'],
      img: '/images/09-alan-cockpit.webp',
    },
  ];

  return (
    <section id="en-pista" style={{ background: 'var(--black)', borderTop: '1px solid rgba(233,30,99,0.2)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px' }}>
        {blocks.map((block, i) => (
          <Link key={block.id} to={block.to}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'block', textDecoration: 'none',
              padding: '4rem', position: 'relative', overflow: 'hidden',
              borderRight: i === 0 ? '1px solid rgba(233,30,99,0.2)' : 'none',
              cursor: 'pointer', minHeight: '500px',
            }}
          >
            <img src={block.img} alt={block.title} style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: hovered === i ? 0.7 : 0.35,
              transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.5s ease', zIndex: 0,
            }} />

            <div style={{
              position: 'absolute', inset: 0,
              background: hovered === i
                ? 'linear-gradient(135deg, rgba(5,5,5,0.5), rgba(233,30,99,0.4))'
                : 'linear-gradient(135deg, rgba(5,5,5,0.85), rgba(5,5,5,0.7))',
              transition: 'all 0.5s', zIndex: 1,
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                letterSpacing: '0.25em', color: 'var(--magenta-bright)',
              }}>
                [{block.num}] {block.tag}
              </div>

              <h2 style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 1.05,
                color: 'var(--white)', whiteSpace: 'pre-line',
                marginBottom: '2rem', marginTop: '4rem',
                transition: 'all 0.4s ease',
                transform: hovered === i ? 'translateX(10px)' : 'translateX(0)',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              }}>
                {block.title.split('\n').map((line, li) => (
                  <span key={li} style={{ display: 'block' }}>{line}</span>
                ))}
              </h2>

              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white)', lineHeight: 1.6, marginBottom: '2rem',
                maxWidth: '320px', textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}>{block.description}</p>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {block.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                    fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '0.3rem 0.7rem',
                    border: '1px solid var(--magenta)',
                    background: 'rgba(233,30,99,0.2)', color: 'var(--white)',
                    backdropFilter: 'blur(10px)',
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{
                position: 'absolute', bottom: '0', right: '0',
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                fontFamily: 'Anton, sans-serif', fontSize: '1rem',
                letterSpacing: '0.1em', color: 'var(--magenta-bright)',
                transition: 'all 0.3s',
              }}>
                <span>EXPLORAR</span>
                <span style={{
                  fontSize: '1.5rem',
                  transform: hovered === i ? 'translateX(8px)' : 'translateX(0)',
                  transition: 'transform 0.3s',
                }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
