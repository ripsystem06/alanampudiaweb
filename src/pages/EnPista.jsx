import { useState, useEffect, useRef } from 'react';

const temporadas = [
  {
    year: '2025',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2025', posicion: '1°', estado: 'Victoria', nota: '3 victorias consecutivas iniciadas' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2025', posicion: '1°', estado: 'Victoria', nota: 'Segunda consecutiva del año' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2025', posicion: '1°', estado: 'Victoria', nota: 'Tercer mexicano en lograrlo' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2025', posicion: 'TBD', estado: 'Pendiente', nota: '' },
    ],
  },
  {
    year: '2024',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2024', posicion: '1°', estado: 'Victoria', nota: 'Récord: 70.71 mph promedio' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2024', posicion: '1°', estado: 'Victoria', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2024', posicion: '1°', estado: 'Victoria', nota: 'Campeonato asegurado por 1 punto' },
      { nombre: 'Campeonato Mundial SCORE', fecha: '2024', posicion: '1°', estado: 'Campeón', nota: 'Primer ensenadense en lograrlo' },
    ],
  },
  {
    year: '2022',
    carreras: [
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2022', posicion: 'Top 5', estado: 'Completada', nota: 'Con Ken Block — 0 ponchadas en noche completa' },
    ],
  },
  {
    year: '2019',
    carreras: [
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2019', posicion: '1°', estado: 'Victoria', nota: 'Victoria histórica absoluta — 1,000 millas' },
    ],
  },
];

const estadoColor = {
  'Victoria': 'var(--magenta-bright)',
  'Campeón': 'var(--monster-green)',
  'Pendiente': 'rgba(176,168,152,0.4)',
  'Completada': 'var(--white-dim)',
};

export default function EnPista() {
  const [activeYear, setActiveYear] = useState('2025');
  const headerRef = useRef();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const temporada = temporadas.find(t => t.year === activeYear);

  return (
    <div style={{ paddingTop: '98px', minHeight: '100vh', background: 'var(--black)' }}>
      <div ref={headerRef} style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(135deg, #1a0a14 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '2rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none',
        }}>EN PISTA</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s',
          }}>Historial de Competencia</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.9, color: 'var(--white)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            EN<br /><span style={{ color: 'var(--magenta)' }}>PISTA</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '500px',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
          }}>
            Resultados, victorias y momentos definitorios en la máxima categoría del off-road mundial.
          </p>
        </div>

        <div style={{
          display: 'flex', gap: '3rem', marginTop: '3rem',
          opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
        }}>
          {[
            { num: '1', label: 'Campeonato Mundial' },
            { num: '3', label: 'Triple Corona' },
            { num: '70.71', label: 'mph Récord SF250' },
            { num: '18h', label: 'Baja 1000 solitario' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.2rem', color: 'var(--magenta-bright)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--white-dim)', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '0',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        background: 'var(--black-mid)', padding: '0 4rem',
      }}>
        {temporadas.map(t => (
          <button key={t.year} onClick={() => setActiveYear(t.year)}
            style={{
              padding: '1rem 2rem', background: 'transparent', border: 'none',
              borderBottom: activeYear === t.year ? '2px solid var(--magenta)' : '2px solid transparent',
              color: activeYear === t.year ? 'var(--magenta-bright)' : 'var(--white-dim)',
              fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
              letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >{t.year}</button>
        ))}
      </div>

      <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        {activeYear === '2025' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(233,30,99,0.12)',
            border: '1px solid rgba(233,30,99,0.3)', marginBottom: '2rem',
          }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--magenta)', borderRadius: '50%', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)', textTransform: 'uppercase' }}>
              Temporada en curso
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {temporada.carreras.map((carrera, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              alignItems: 'center', gap: '2rem',
              padding: '1.8rem 2rem',
              background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)',
              border: '1px solid rgba(233,30,99,0.06)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '3px',
                background: estadoColor[carrera.estado] || 'transparent',
              }} />

              <div style={{ paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', letterSpacing: '0.03em' }}>
                  {carrera.nombre}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--white-dim)', marginTop: '0.2rem', letterSpacing: '0.1em' }}>
                  {carrera.fecha}
                  {carrera.nota && <span style={{ color: 'var(--magenta-bright)', marginLeft: '1rem' }}>— {carrera.nota}</span>}
                </div>
              </div>

              <div style={{
                fontFamily: 'Anton, sans-serif', fontSize: '2rem',
                color: estadoColor[carrera.estado] || 'var(--white-dim)', lineHeight: 1,
              }}>{carrera.posicion}</div>

              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
                fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '0.3rem 0.8rem',
                border: `1px solid ${estadoColor[carrera.estado]}40`,
                color: estadoColor[carrera.estado], whiteSpace: 'nowrap',
              }}>{carrera.estado}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
