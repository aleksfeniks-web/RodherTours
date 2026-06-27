import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useStaggeredReveal } from '../hooks/useScrollReveal';

const packages = [
  {
    id: 'tokyo',
    name: 'Tokio y Kioto Mágico',
    country: 'Japón 🇯🇵',
    image: '/images/tokyo.png',
    tag: 'Top Rated',
    duration: '10 Días / 9 Noches',
    highlights: 'Monte Fuji • Shibuya Crossing • Templos de Asakusa • Tren Bala',
    price: 1599,
    downPayment: 100, // Down payment in USD
    rating: 4.9,
    reviews: 248,
    badgeColor: '#0ea5e9'
  },
  {
    id: 'china',
    name: 'Maravillas de China Antigua y Moderna',
    country: 'China 🇨🇳',
    image: '/images/china.png',
    tag: 'Recomendado',
    duration: '12 Días / 11 Noches',
    highlights: 'Gran Muralla • Ciudad Prohibida • Guerreros de Terracota • Shanghái',
    price: 1899,
    downPayment: 120,
    rating: 4.8,
    reviews: 196,
    badgeColor: '#f59e0b'
  },
  {
    id: 'bali',
    name: 'Bali: Paraíso Tropical e Histórico',
    country: 'Indonesia 🇮🇩',
    image: '/images/bali.png',
    tag: 'Best Seller',
    duration: '8 Días / 7 Noches',
    highlights: 'Templos de Ubud • Puerta del Cielo • Playas de Seminyak • Terrazas de Arroz',
    price: 1299,
    downPayment: 80,
    rating: 4.9,
    reviews: 312,
    badgeColor: '#10b981'
  },
  {
    id: 'dubai',
    name: 'Lujo del Desierto y Modernidad',
    country: 'Dubai, EAU 🇦🇪',
    image: '/images/dubai.png',
    tag: 'Premium',
    duration: '7 Días / 6 Noches',
    highlights: 'Burj Khalifa • Safari en Dunas • Marina Marina Tour • Mezquita Abu Dhabi',
    price: 1999,
    downPayment: 150,
    rating: 4.7,
    reviews: 145,
    badgeColor: '#a855f7'
  }
];

export default function Destinations({ onSelectDestination }) {
  const { containerRef, getItemStyle } = useStaggeredReveal(packages.length, { staggerMs: 130, threshold: 0.06 });

  return (
    <section id="destinos" style={{
      padding: '100px 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid rgba(0,0,0,0.02)',
      borderBottom: '1px solid rgba(0,0,0,0.02)'
    }}>
      <div className="container">
        
        {/* Header Text */}
        <ScrollReveal direction="up" delay={0} threshold={0.15}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'rgb(var(--secondary-rgb))'
            }}>
              Nuestros Paquetes Exclusivos
            </span>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--dark-bg)',
              letterSpacing: '-1px'
            }}>
              Destinos Populares de Temporada
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Explora nuestros tours guiados de alta gama con itinerarios optimizados y el mejor soporte local. Asegura tu lugar hoy con un pequeño apartado.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards Grid - stagger-animated */}
        <div ref={containerRef} className="grid-2" style={{ gap: '32px' }}>
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className="destination-card"
              style={getItemStyle(index, {
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.04)',
                position: 'relative'
              })}
            >
              {/* Card Image Area */}
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'var(--transition-slow)'
                  }}
                  className="card-image"
                />
                
                {/* Floating Tag */}
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: pkg.badgeColor,
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  {pkg.tag}
                </span>

                {/* Floating Rating */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(4px)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{pkg.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({pkg.reviews})</span>
                </div>
              </div>

              {/* Card Info Area */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgb(var(--secondary-rgb))', fontWeight: 700 }}>
                    {pkg.country}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    ⏱️ {pkg.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-bg)', fontWeight: 700 }}>
                  {pkg.name}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flexGrow: 1 }}>
                  {pkg.highlights}
                </p>

                <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Costo Total</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-bg)' }}>
                      ${pkg.price.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>USD</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Aparta con solo</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'rgb(var(--accent-rgb))' }}>
                      ${pkg.downPayment} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>USD</span>
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectDestination(pkg)}
                  className="btn btn-accent" 
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '8px',
                    fontSize: '0.95rem'
                  }}
                >
                  Reservar y Apartar Lugar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {styleHook}
    </section>
  );
}

// Hover styles injected via style element inside React
const styleHook = (
  <style>{`
    .destination-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl) !important;
      border-color: rgba(var(--secondary-rgb), 0.15) !important;
    }
    .destination-card:hover .card-image {
      transform: scale(1.06);
    }
  `}</style>
);
export { packages };
