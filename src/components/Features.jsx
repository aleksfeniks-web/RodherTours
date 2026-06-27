import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useStaggeredReveal } from '../hooks/useScrollReveal';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Mejor Precio Garantizado",
    description: "Diseñamos itinerarios directos con operadores locales para ofrecerte tarifas sin intermediarios ni costos ocultos."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Asistencia 24/7 en Destino",
    description: "Te asignamos un asesor exclusivo vía WhatsApp durante todo tu viaje para solucionar cualquier duda al instante."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Hoteles Curados de Lujo",
    description: "Evaluamos personalmente cada hotel de nuestro catálogo. Garantizamos estancias con excelentes ubicaciones y alta calificación."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Apartado y Reserva Segura",
    description: "Garantiza tu tarifa congelada pagando únicamente el monto de apartado. El resto lo liquidas en plazos cómodos."
  }
];

export default function Features() {
  const { containerRef, getItemStyle } = useStaggeredReveal(features.length, { staggerMs: 120, threshold: 0.06 });

  return (
    <section id="ventajas" style={{
      padding: '100px 0',
      backgroundColor: '#ffffff'
    }}>
      <div className="container">

        {/* Section Header */}
        <ScrollReveal direction="up" threshold={0.15} style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'rgb(var(--secondary-rgb))'
          }}>
            Por Qué Elegirnos
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--dark-bg)',
            letterSpacing: '-1px',
            marginTop: '10px',
            marginBottom: '14px'
          }}>
            Ventajas que nos Distinguen
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            Combinamos experiencia, tecnología y pasión por los viajes para darte la experiencia que mereces.
          </p>
        </ScrollReveal>
        
        {/* Row Grid */}
        <div ref={containerRef} className="grid-4">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              style={getItemStyle(idx, {
                padding: '32px 24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
              className="feature-card"
            >
              {/* Icon Holder */}
              <div className="flex-center" style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                color: 'rgb(var(--secondary-rgb))',
                alignSelf: 'flex-start'
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--dark-bg)'
              }}>
                {feature.title}
              </h3>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: '1.5'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(var(--secondary-rgb), 0.1) !important;
          background-color: #ffffff !important;
        }
      `}</style>
    </section>
  );
}
