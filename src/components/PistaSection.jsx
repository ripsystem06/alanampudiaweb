import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PistaSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const textRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // GSAP ScrollTrigger text entry animation
  useEffect(() => {
    if (!visible) return;
    textRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, [visible]);

  const blocks = [
    {
      id: 'en-pista', to: '/en-pista',
      titleKey: 'home.pista_title',
      descKey: 'home.pista_desc',
      img: '/images/onoftrack/ontrack.webp',
      side: 'left',
    },
    {
      id: 'fuera-pista', to: '/fuera-de-pista',
      titleKey: 'home.fuera_title',
      descKey: 'home.fuera_desc',
      img: '/images/onoftrack/oftrack.webp',
      side: 'right',
    },
  ];

  const isActive = (i) => selected === i;

  return (
    <section ref={sectionRef} style={{ background: 'var(--black)' }}>
      <style>{`
        /* ===== DESKTOP BASE ===== */
        .pista-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
          align-items: stretch;
          overflow: visible;
        }
        .pista-card {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          min-height: 600px;
          height: 100%;
        }

        /* ===== MOBILE ONLY (max-width: 767px) ===== */
        @media (max-width: 767px) {
          .pista-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .pista-card {
            min-height: 50vh !important;
          }
          .pista-img {
            object-fit: contain !important;
            height: 100% !important;
            opacity: 0.5 !important;
          }
          /* En pista: imagen a la izquierda */
          .pista-card--en .pista-img {
            left: 50% !important;
            right: auto !important;
            transform: translate(calc(-50% - 25vw), -50%) scale(0.9) !important;
          }
          /* Fuera de pista: imagen a la derecha */
          .pista-card--fuera .pista-img {
            left: 50% !important;
            right: auto !important;
            transform: translate(calc(-50% + 25vw), -50%) scale(0.9) !important;
          }
          .pista-text {
            position: relative !important;
            top: auto !important;
            left: 0 !important;
            right: 0 !important;
            text-align: center !important;
            align-items: center !important;
            max-width: 100% !important;
            padding: 2rem 1rem;
            opacity: 1 !important;
            transform: none !important;
            z-index: 2 !important;
          }
          .pista-glow {
            opacity: 1 !important;
          }
          .pista-title {
            text-shadow: 0 4px 30px rgba(233,30,99,0.5), 0 2px 10px rgba(0,0,0,0.8) !important;
          }
        }
      `}</style>

      <div className="pista-grid">
        {blocks.map((block, i) => (
          <div key={block.id}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`pista-card pista-card--${i === 0 ? 'en' : 'fuera'}${isActive(i) ? ' active' : ''}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateX(0)'
                : `translateX(${block.side === 'left' ? '-80px' : '80px'})`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {/* Glow */}
            <div className="pista-glow" style={{
              position: 'absolute',
              inset: '-10%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,99,0.3) 0%, transparent 50%)',
              opacity: isActive(i) ? 1 : 0.4,
              transition: 'opacity 0.6s ease',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            {/* Image — both sides offset, contain to avoid cropping */}
            <img src={block.img} alt={t(block.titleKey)}
              className="pista-img" style={{
              position: 'absolute',
              top: '50%',
              width: '100%',
              height: '100%',
              [block.side === 'left' ? 'left' : 'right']: '-30%',
              transform: isActive(i)
                  ? 'translateY(-50%) scale(1.04)'
                  : 'translateY(-50%) scale(1)',
              objectFit: 'contain',
              objectPosition: 'center',
              opacity: 1,
              transition: 'transform 0.6s ease, opacity 0.6s ease',
              zIndex: 0,
            }} />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Text — aligned toward screen center on desktop */}
            <div ref={el => textRefs.current[i] = el} className="pista-text" style={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              transform: 'translateY(-50%)',
              right: block.side === 'left' ? '5%' : undefined,
              left: block.side === 'right' ? '5%' : undefined,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '55%',
            }}>
              <h2 className="pista-title" style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 7.2rem)',
                lineHeight: 1.15,
                color: 'var(--white)',
                whiteSpace: 'pre-line',
                marginBottom: '1.5rem',
                textShadow: isActive(i)
                  ? '0 4px 30px rgba(233,30,99,0.5), 0 2px 10px rgba(0,0,0,0.8)'
                  : '0 2px 10px rgba(0,0,0,0.8)',
                transition: 'text-shadow 0.4s ease, opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}>
                {t(block.titleKey).split('\n').map((line, li) => (
                  <span key={li} style={{ display: 'block' }}>{line}</span>
                ))}
              </h2>

              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--white)',
                lineHeight: 1.5,
                maxWidth: '280px',
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
              }}>
                {t(block.descKey)}
              </p>

              <Link to={block.to} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'Anton, sans-serif', fontSize: '1rem',
                letterSpacing: '0.1em', color: 'var(--magenta-bright)',
                marginTop: '1rem', textDecoration: 'none',
                transition: 'all 0.3s, opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}>
                <span>{t('common.explorar')}</span>
                <span style={{ fontSize: '1.4rem' }}>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}