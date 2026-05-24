import { useRef, useState, useEffect } from 'react';

const momentos = [
  { titulo: 'La Preparación para la Baja 1000', subtitulo: 'El Super Bowl de Alan', texto: 'Meses antes de la carrera, cero alcohol, cardio intenso y máxima disciplina. Alan es uno de los pocos pilotos que opta por las 18 horas en solitario, sin relevo.' },
  { titulo: 'Papas and Beer — La Escudería Familiar', subtitulo: 'Ensenada y Rosarito', texto: 'El equipo lleva el nombre de los famosos establecimientos que la familia Ampudia administra en Baja California. Más que un negocio: una identidad.' },
  { titulo: 'Jax Redline & Ken Block', subtitulo: 'Baja 1000 — Una noche legendaria', texto: 'Compartiendo auto con el icónico Ken Block, Alan condujo toda la noche entre nubes de polvo sin una sola llanta ponchada. Una hazaña técnica que pocos olvidan.' },
  { titulo: 'La Misión Más Allá del Podio', subtitulo: 'Inspirar a México', texto: 'Su meta no son solo los campeonatos. Es demostrar que con trabajo duro, en equipo y sin rendirse, un piloto de Ensenada puede ser el mejor del mundo.' },
];

const filosofia = [
  { palabra: 'Felicidad', desc: 'La pasión que lo impulsa desde los 7 años.' },
  { palabra: 'Adrenalina', desc: 'El combustible de cada carrera.' },
  { palabra: 'Amor', desc: 'Por su familia, su tierra y su deporte.' },
];

export default function FueraDePista() {
  const headerRef = useRef();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: '98px', minHeight: '100vh', background: 'var(--black)' }}>
      <div ref={headerRef} style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(135deg, #0a0a1a 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.05)',
          lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        }}>FUERA DE PISTA</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s',
          }}>El Hombre detrás del #1</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, color: 'var(--white)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            FUERA<br />DE <span style={{ color: 'var(--magenta)' }}>PISTA</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '520px',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
          }}>
            El motor se apaga, pero el personaje sigue. Conoce la filosofía, la preparación y los momentos que definen a Alan más allá del desierto.
          </p>
        </div>
      </div>

      <div style={{ padding: '6rem 4rem', background: 'var(--black-mid)', borderBottom: '1px solid rgba(233,30,99,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            La mentalidad del campeón
          </div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '4rem' }}>
            Tres palabras que<br /><span style={{ color: 'var(--magenta)' }}>lo definen todo</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {filosofia.map((item, i) => (
              <div key={i} style={{
                padding: '3rem 2.5rem',
                background: 'var(--black-soft)',
                border: '1px solid rgba(233,30,99,0.15)',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(233,30,99,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(233,30,99,0.15)'}
              >
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '3.5rem',
                  color: 'var(--magenta-bright)', lineHeight: 1, marginBottom: '1rem',
                }}>{item.palabra.toUpperCase()}</div>
                <div style={{ width: '30px', height: '2px', background: 'var(--magenta)', marginBottom: '1rem' }} />
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.95rem', color: 'var(--white-soft)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '1px solid var(--magenta)', borderLeft: '1px solid var(--magenta)' }} />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '4rem', padding: '3rem',
            background: 'rgba(233,30,99,0.06)',
            border: '1px solid rgba(233,30,99,0.2)',
            borderLeft: '4px solid var(--magenta)',
          }}>
            <blockquote style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'var(--white)', lineHeight: 1.1,
            }}>
              "TIENES QUE SER <span style={{ color: 'var(--magenta-bright)' }}>EGOÍSTA</span> Y PENSAR QUE TÚ ERES EL MEJOR,<br />
              SI NO, ¿CÓMO VAS A SALIR A <span style={{ background: 'var(--magenta)', color: 'var(--white)', padding: '0 0.3em', display: 'inline-block', transform: 'skewX(-6deg)' }}>GANARLES</span>?"
            </blockquote>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginTop: '1.5rem' }}>
              — ALAN AMPUDIA
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '6rem 4rem', background: 'var(--black)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Más allá del volante
          </div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '4rem' }}>
            Momentos que<br /><span style={{ color: 'var(--magenta)' }}>cuentan la historia</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {momentos.map((m, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1.4fr',
                gap: '3rem', padding: '3rem 0',
                borderBottom: '1px solid rgba(233,30,99,0.1)',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: '4rem', color: 'rgba(233,30,99,0.2)',
                  lineHeight: 1, textAlign: 'right',
                }}>0{i + 1}</div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {m.subtitulo}
                  </div>
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.6rem', color: 'var(--white)', lineHeight: 1.1, letterSpacing: '0.02em' }}>
                    {m.titulo.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.7 }}>
                  {m.texto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '6rem 4rem', background: 'var(--black-soft)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{
              aspectRatio: '4/5',
              border: '1px solid rgba(233,30,99,0.3)',
              position: 'relative', overflow: 'hidden',
            }}>
              <img src="/images/03-cockpit-prep.webp" alt="Preparación"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '2px solid var(--magenta)', borderLeft: '2px solid var(--magenta)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '2px solid var(--magenta)', borderRight: '2px solid var(--magenta)' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Hombre de acero
              </div>
              <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', color: 'var(--white)', marginBottom: '1.5rem' }}>
                La preparación<br />para el <span style={{ color: 'var(--magenta)' }}>Super Bowl</span>
              </h2>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Para Alan, la Baja 1000 es su Super Bowl. Meses antes de la carrera comienza una preparación de élite: mucho cardio, buena alimentación, cero alcohol y máxima disciplina mental.
              </p>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.8 }}>
                Es uno de los pocos pilotos en Trophy Truck que opta por las exigentes 18 horas de carrera en completa soledad, sin realizar relevos — un desafío físico y mental que pocos se atreven a asumir.
              </p>

              <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
                {[{ num: 'Meses', label: 'preparación' }, { num: '18h', label: 'sin relevo' }, { num: '0', label: 'alcohol' }].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.8rem', color: 'var(--magenta-bright)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--white-dim)', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
