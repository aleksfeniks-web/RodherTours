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
      `}</style>
    </footer>
  );
}
