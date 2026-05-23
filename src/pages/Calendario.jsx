const carreras2025 = [
  { num: '01', nombre: 'SCORE San Felipe 250', lugar: 'San Felipe, B.C.', fecha: 'Marzo 2025', estado: 'Completada', resultado: '1° Lugar' },
  { num: '02', nombre: 'SCORE Baja 500', lugar: 'Ensenada, B.C.', fecha: 'Junio 2025', estado: 'Completada', resultado: '1° Lugar' },
  { num: '03', nombre: 'SCORE Baja 400', lugar: 'Ensenada, B.C.', fecha: 'Septiembre 2025', estado: 'Completada', resultado: '1° Lugar' },
  { num: '04', nombre: 'SCORE Baja 1000', lugar: 'Ensenada → La Paz, B.C.', fecha: 'Noviembre 2025', estado: 'Próxima', resultado: null },
];

const estadoBg = {
  'Completada': 'rgba(233,30,99,0.06)',
  'Próxima': 'rgba(233,30,99,0.12)',
};

export default function Calendario() {
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
          fontFamily: 'Anton, sans-serif', fontSize: '14rem',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none',
        }}>2025</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Temporada SCORE 2025
          </div>
          <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.9, color: 'var(--white)' }}>
            CALEN<span style={{ color: 'var(--magenta)' }}>DARIO</span>
          </h1>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem', maxWidth: '500px' }}>
            El circuito SCORE International es la máxima categoría del off-road mundial. Cuatro carreras. Un campeonato. La leyenda de Baja California.
          </p>
        </div>
      </div>

      <div style={{ padding: '5rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {carreras2025.map((carrera, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr auto',
              gap: '2rem', alignItems: 'center',
              padding: '2rem 2.5rem',
              background: estadoBg[carrera.estado],
              border: `1px solid ${carrera.estado === 'Próxima' ? 'rgba(233,30,99,0.5)' : 'rgba(233,30,99,0.15)'}`,
              position: 'relative', overflow: 'hidden',
            }}>
              {carrera.estado === 'Próxima' && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--magenta-bright)', boxShadow: '0 0 10px var(--magenta)' }} />
              )}

              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.5rem', color: 'rgba(233,30,99,0.3)', lineHeight: 1 }}>
                {carrera.num}
              </div>

              <div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: '0.2rem' }}>
                  {carrera.nombre}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--white-dim)', letterSpacing: '0.1em' }}>
                    {carrera.lugar}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--magenta-bright)', letterSpacing: '0.1em' }}>
                    {carrera.fecha}
                  </div>
                </div>
                {carrera.resultado && (
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: 'var(--magenta-bright)', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
                    {carrera.resultado}
                  </div>
                )}
              </div>

              <div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
                  fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '0.4rem 0.9rem',
                  border: `1px solid ${carrera.estado === 'Próxima' ? 'var(--magenta-bright)' : 'rgba(233,30,99,0.4)'}`,
                  color: carrera.estado === 'Próxima' ? 'var(--magenta-bright)' : 'var(--magenta)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  {carrera.estado === 'Próxima' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--magenta-bright)', animation: 'blink 2s infinite' }} />}
                  {carrera.estado}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '4rem', padding: '2.5rem',
          background: 'var(--black-soft)',
          border: '1px solid rgba(233,30,99,0.15)',
        }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta-bright)', marginBottom: '0.8rem', letterSpacing: '0.04em' }}>
            SOBRE EL CAMPEONATO SCORE INTERNATIONAL
          </div>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.95rem', color: 'var(--white-soft)', lineHeight: 1.7 }}>
            SCORE International es el organismo rector del off-road de larga distancia más prestigioso del mundo. La categoría Trophy Truck es la máxima expresión de velocidad y resistencia en el desierto de Baja California. Alan Ampudia compite con el número #1 como Campeón Defensor.
          </p>
        </div>
      </div>
    </div>
  );
}
