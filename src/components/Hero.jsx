import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('tours');
  const [formData, setFormData] = useState({
    origin: 'Ciudad de México (MEX)',
    destination: 'Tokio (NRT)',
    departure: '2026-10-12',
    passengers: '2 Adultos'
  });

  // Parallax background on scroll
  const heroRef = useRef(null);
  const [bgOffset, setBgOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setBgOffset(window.scrollY * 0.3);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const destinationsSection = document.getElementById('destinos');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={heroRef} id="inicio" style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '100px',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `linear-gradient(to bottom, rgba(10, 25, 47, 0.4), rgba(10, 25, 47, 0.85)), url('/images/bali.png')`,
      backgroundSize: 'cover',
      backgroundPosition: `center ${bgOffset}px`,
      backgroundRepeat: 'no-repeat',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Blob / Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(14, 165, 233, 0.25)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ zIndex: 2, position: 'relative', width: '100%' }}>
        <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
          
          {/* LEFT: TEXT CONTENT */}
          <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(14, 165, 233, 0.15)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              color: 'rgb(var(--secondary-rgb))',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              alignSelf: 'flex-start'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              Explora el Mundo con RodherTours
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#ffffff'
            }}>
              Viaja Más Allá de tu <span style={{
                background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Imaginación</span>
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-light)',
              maxWidth: '540px',
              fontWeight: 400
            }}>
              Descubre lugares asombrosos, planifica las vacaciones de tus sueños y crea recuerdos inolvidables con nuestros paquetes exclusivos con todo incluido.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
              <a href="#destinos" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                Explorar Destinos
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <button className="btn btn-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'white',
                  color: 'var(--dark-bg)'
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </span>
                Ver Video
              </button>
            </div>

            {/* Trust Badges / Stats */}
            <div style={{
              display: 'flex',
              gap: '28px',
              marginTop: '28px',
              flexWrap: 'wrap'
            }}>
              {[
                { value: '500+', label: 'Viajeros Felices' },
                { value: '15+', label: 'Destinos Mágicos' },
                { value: '4.9★', label: 'Calificación Promedio' },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.12}s both`,
                }}>
                  <span style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.5px',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FLOATING BADGE / MOCK DESTINATION CARD */}
          <div className="hero-badge-container" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <div className="glass animate-fade-in hero-floating-card" style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '300px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              color: 'var(--text-main)'
            }}>
              <img 
                src="/images/tokyo.png" 
                alt="Tokyo Feature" 
                style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Tokio, Japón 🗼</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Desde <strong style={{ color: 'rgb(var(--accent-rgb))' }}>$1,599 USD</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: FLOATING SEARCH WIDGET */}
        <div className="glass animate-fade-in-up search-widget" style={{
          marginTop: '64px',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          color: 'var(--text-main)'
        }}>
          {/* Tab Selector */}
          <div className="search-tabs" style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            paddingBottom: '12px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'flights', label: 'Vuelos',         icon: '✈️' },
              { id: 'hotels',  label: 'Hoteles',        icon: '🏨' },
              { id: 'tours',   label: 'Tours',          icon: '🗺️' },
              { id: 'cars',    label: 'Autos',          icon: '🚗' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`search-tab-btn${activeTab === tab.id ? ' search-tab-active' : ''}`}
                style={{
                  background: activeTab === tab.id ? 'rgba(14, 165, 233, 0.12)' : 'transparent',
                  border: activeTab === tab.id ? '1.5px solid rgba(14,165,233,0.25)' : '1.5px solid transparent',
                  outline: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: activeTab === tab.id ? 'rgb(var(--secondary-rgb))' : 'var(--text-muted)',
                  transition: 'var(--transition-fast)',
                  whiteSpace: 'nowrap',
                  flex: '1 1 auto',
                  justifyContent: 'center',
                  minWidth: '0'
                }}
              >
                <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                <span className="search-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Fields Form */}
          <form onSubmit={handleSearch} className="search-form">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Origen</label>
              <input 
                type="text" 
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  background: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Destino</label>
              <input 
                type="text" 
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  background: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Fecha Salida</label>
              <input 
                type="date" 
                value={formData.departure}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  background: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Pasajeros</label>
              <select 
                value={formData.passengers}
                onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  background: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                  appearance: 'none',
                  width: '100%',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '16px'
                }}
              >
                <option>1 Adulto</option>
                <option>2 Adultos</option>
                <option>2 Adultos, 1 Niño</option>
                <option>4 Adultos</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary search-submit-btn" style={{ padding: '14px', borderRadius: 'var(--radius-md)', width: '100%', height: '48px' }}>
              Buscar Paquete
            </button>
          </form>
        </div>

      </div>

      <style>{`
        /* Hero badge hidden on tablet/mobile */
        @media (max-width: 992px) {
          .hero-badge-container {
            display: none !important;
          }
        }

        /* Floating destination card animation */
        @keyframes heroFloat {
          0%, 100% { transform: rotate(2deg) translateY(-20px); }
          50%       { transform: rotate(1.5deg) translateY(-34px); }
        }
        .hero-floating-card {
          animation: heroFloat 5s ease-in-out infinite;
        }

        /* ── Search Widget — Desktop ─────────────────────────────── */
        .search-form {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 160px;
          gap: 16px;
          align-items: end;
        }

        /* ── Search Widget — Tablet (≤900px) ─────────────────────── */
        @media (max-width: 900px) {
          .search-form {
            grid-template-columns: 1fr 1fr;
          }
          .search-submit-btn {
            grid-column: 1 / -1;
          }
        }

        /* ── Search Widget — Mobile (≤600px) ─────────────────────── */
        @media (max-width: 600px) {
          .search-widget {
            padding: 16px !important;
            margin-top: 32px !important;
            border-radius: 16px !important;
          }
          .search-form {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .search-submit-btn {
            grid-column: 1 / -1;
            height: 52px !important;
            font-size: 1rem !important;
          }

          /* Tabs: 4 equal pills in 2x2 layout */
          .search-tabs {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px !important;
            margin-bottom: 16px !important;
          }
          .search-tab-btn {
            padding: 10px 8px !important;
            font-size: 0.82rem !important;
            border-radius: 10px !important;
            border: 1.5px solid rgba(0,0,0,0.06) !important;
            background: rgba(255,255,255,0.6) !important;
          }
          .search-tab-active {
            background: rgba(14,165,233,0.12) !important;
            border-color: rgba(14,165,233,0.3) !important;
          }
        }

        /* ── Search Widget — Very small (≤400px) ─────────────────── */
        @media (max-width: 400px) {
          .search-form {
            grid-template-columns: 1fr;
          }
          .search-tab-label {
            display: none;
          }
          .search-tab-btn {
            font-size: 1.3rem !important;
            padding: 10px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </header>
  );
}
