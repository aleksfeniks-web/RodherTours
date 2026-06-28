import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer style={{
      backgroundColor: 'var(--dark-bg)',
      color: '#ffffff',
      padding: '64px 0 24px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        
        {/* Main Columns Grid */}
        <ScrollReveal direction="up" threshold={0.1}>
          <div className="grid-3" style={{ marginBottom: '48px', gap: '48px' }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px' }}>
                <svg viewBox="0 0 500 500" width="100%" height="100%">
                  <circle cx="250" cy="220" r="190" fill="none" stroke="#ffffff" strokeWidth="18" />
                  <circle cx="230" cy="180" r="75" fill="#f59e0b" />
                  <polygon points="170,270 260,150 350,270" fill="#ffffff" />
                  <path d="M 100,270 Q 250,310 400,270 Q 300,360 250,360 Q 200,360 100,270 Z" fill="#0ea5e9" />
                  <g transform="translate(320, 130) rotate(-38) scale(0.95)">
                    <ellipse cx="-10" cy="0" rx="42" ry="11" fill="#ffffff" />
                  </g>
                </svg>
              </div>
              <span style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#ffffff',
                letterSpacing: '-0.5px'
              }}>
                Rodher<span style={{ color: 'rgb(var(--secondary-rgb))' }}>Tours</span>
              </span>
            </div>
            
            <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Agencia de viajes líder especializada en crear experiencias únicas y viajes grupales/individuales de ensueño en los mejores destinos del mundo.
            </p>
            
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '4px'
            }}>
              Viaja. Descubre. Vive.
            </span>

            {/* Social Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
              <a 
                href="https://facebook.com/rodhertours" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'var(--transition-fast)'
                }}
                className="social-btn"
                title="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              <a 
                href="https://instagram.com/rodhertours" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'var(--transition-fast)'
                }}
                className="social-btn"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Enlaces de Interés</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.9rem',
              color: 'var(--text-light)'
            }}>
              <a href="#inicio" className="footer-link">Inicio / Buscador</a>
              <a href="#destinos" className="footer-link">Paquetes de Viajes</a>
              <a href="#ventajas" className="footer-link">Por qué Elegirnos</a>
              <button 
                onClick={onOpenAdmin} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgb(var(--secondary-rgb))',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: 0,
                  alignSelf: 'flex-start'
                }}
                className="footer-link"
              >
                Acceso Administrador (WhatsApp)
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Atención al Cliente</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '0.88rem',
              color: 'var(--text-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span>
                <span>+52 (55) 8765 4321</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📧</span>
                <span>reservaciones@rodhertours.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span>
                <span>Av. Reforma 405, CDMX, México</span>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.08)', margin: '24px 0' }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-light)'
        }}>
          <span>
            © {new Date().getFullYear()} RodherTours S.A. de C.V. Todos los derechos reservados.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link">Términos y Condiciones</a>
            <a href="#" className="footer-link">Aviso de Privacidad</a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link {
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }
        .social-btn:hover {
          color: #ffffff !important;
          background: rgba(14, 165, 233, 0.15) !important;
          border-color: rgba(14, 165, 233, 0.4) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
