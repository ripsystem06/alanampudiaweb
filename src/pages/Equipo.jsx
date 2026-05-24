const miembros = [
  { rol: 'PILOTO #1', nombre: 'Alan Ampudia', detail: '35 años — Ensenada, B.C.', bio: 'Campeón Mundial SCORE Trophy Truck 2024. El primer ensenadense en lograr el título absoluto. Lleva las riendas del Ford Raptor #1.', code: 'P.001', img: '/images/01-alan-portrait.webp' },
  { rol: 'TEAM PRINCIPAL', nombre: 'Rodrigo Ampudia Sr.', detail: 'Cerebro técnico — Padre', bio: 'Responsable del programa técnico, la confiabilidad del vehículo y la estrategia de carrera. La obsesión por la perfección viene de él.', code: 'T.002', img: '/images/05-team-group.webp' },
  { rol: 'CO-PILOTO', nombre: 'Aaron Ampudia', detail: 'Hermano', bio: 'Parte esencial de la dinastía familiar. Su sincronía con Alan en cabina es producto de toda una vida compartiendo el desierto.', code: 'C.003', img: '/images/07-alan-with-craft.webp' },
  { rol: 'CO-PILOTO', nombre: 'Rodrigo Ampudia Jr.', detail: 'Hermano', bio: 'El automovilismo corre en la sangre. Co-piloto rotativo, garantía de continuidad en la familia.', code: 'C.004', img: '/images/09-alan-cockpit.webp' },
];

export default function Equipo() {
  return (
    <div style={{ paddingTop: '98px', minHeight: '100vh', background: 'var(--black)' }}>
      <div style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(135deg, #1a0a14 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(6rem, 16vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        }}>TEAM PAPAS</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Escudería Familiar
          </div>
          <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, color: 'var(--white)' }}>
            EL <span style={{ color: 'var(--magenta)' }}>EQUIPO</span>
          </h1>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem', maxWidth: '520px' }}>
            Detrás del número #1 hay una dinastía forjada en el desierto. Cuatro nombres. Una sola misión: la perfección.
          </p>
        </div>
      </div>

      <div style={{ padding: '5rem 4rem', background: 'var(--black-mid)' }}>
        <div style={{
          maxWidth: '1300px', margin: '0 auto',
          aspectRatio: '21/9',
          border: '1px solid rgba(233,30,99,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          <img src="/images/05-team-group.webp" alt="Team Papas"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem',
            background: 'linear-gradient(to top, rgba(5,5,5,0.95), transparent)',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.3rem' }}>
              CREW.PHOTO / PRE-RACE BLESSING
            </div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.8rem', color: 'var(--white)' }}>
              EL EQUIPO COMPLETO
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '5rem 4rem', background: 'var(--black)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {miembros.map((m, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '280px 1fr',
                gap: '3rem', padding: '3rem 0',
                borderBottom: '1px solid rgba(233,30,99,0.1)',
              }}>
                <div style={{
                  aspectRatio: '4/5',
                  background: 'var(--black-card)',
                  border: '1px solid rgba(233,30,99,0.2)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <img src={m.img} alt={m.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '0.8rem', left: '0.8rem',
                    padding: '0.3rem 0.6rem', background: 'var(--magenta)',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    letterSpacing: '0.2em', color: 'var(--white)', fontWeight: 700,
                  }}>{m.code}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    {m.rol}
                  </div>
                  <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: '3rem', color: 'var(--white)', lineHeight: 1, marginBottom: '0.4rem' }}>
                    {m.nombre.toUpperCase()}
                  </h2>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.95rem', color: 'var(--white-dim)', marginBottom: '1.5rem' }}>
                    {m.detail}
                  </div>
                  <div style={{ width: '60px', height: '3px', background: 'var(--magenta)', marginBottom: '1.5rem' }} />
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem', color: 'var(--white-soft)', lineHeight: 1.7, maxWidth: '600px' }}>
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '4rem', padding: '3rem',
            background: 'rgba(233,30,99,0.06)',
            border: '1px solid rgba(233,30,99,0.2)',
            borderLeft: '4px solid var(--magenta)',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.8rem' }}>
              // PROTOCOL POST-RACE
            </div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: 'var(--white)', marginBottom: '0.8rem' }}>
              LA OBSESIÓN POR LA PERFECCIÓN
            </div>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.7 }}>
              Tras cada carrera, el equipo desarma el Ford Raptor por completo e instala tornillos nuevos en todo el vehículo, sin excepciones. Es la firma del Team Papas: cada milla compite con un coche prácticamente nuevo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
