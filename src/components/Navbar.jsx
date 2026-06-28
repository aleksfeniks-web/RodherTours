import React, { useState } from 'react';

export default function Navbar({ onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '12px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* LOGO AREA */}
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px' }}>
            <svg viewBox="0 0 500 500" width="100%" height="100%">
              {/* Outer Seal Circle */}
              <circle cx="250" cy="220" r="190" fill="none" stroke="#ffffff" strokeWidth="12" />
              
              {/* Sun */}
              <circle cx="230" cy="180" r="75" fill="#f59e0b" />
              
              {/* Birds */}
              <path d="M 205,125 Q 210,120 215,125 Q 220,120 225,125" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 235,140 Q 238,136 242,140 Q 246,136 250,140" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Mountains */}
              <polygon points="170,270 260,150 350,270" fill="#ffffff" />
              <polygon points="260,270 320,185 380,270" fill="#38bdf8" />
              <polygon points="210,270 260,200 310,270" fill="#0ea5e9" opacity="0.8" />
              
              {/* Sea / Waves */}
              <path d="M 100,270 Q 250,310 400,270 Q 300,360 250,360 Q 200,360 100,270 Z" fill="#0ea5e9" />
              <path d="M 120,290 Q 250,330 380,290 Q 300,350 250,350 Q 200,350 120,290 Z" fill="#38bdf8" opacity="0.8" />
              
              {/* Palm Trees */}
              {/* Left Palm */}
              <path d="M 135,280 Q 145,225 155,185" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 155,185 Q 135,175 115,190" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 155,185 Q 145,160 130,155" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 155,185 Q 165,160 180,155" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 155,185 Q 175,175 195,190" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Smaller Left Palm */}
              <path d="M 160,285 Q 165,245 172,215" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 172,215 Q 155,208 140,220" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 172,215 Q 165,195 152,190" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 172,215 Q 180,195 192,190" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 172,215 Q 188,208 205,220" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Airplane & Trail */}
              <path d="M 100,310 C 170,305 210,240 330,135" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
              <path d="M 100,310 C 170,305 210,240 330,135" fill="none" stroke="#030712" strokeWidth="4" strokeDasharray="10 8" />
              
              <g transform="translate(320, 130) rotate(-38) scale(0.95)">
                {/* Wings */}
                <polygon points="15,0 -10,40 -20,40 -8,0" fill="#0ea5e9" />
                <polygon points="15,-6 -10,-46 -20,-46 -8,-6" fill="#0ea5e9" />
                {/* Tail */}
                <polygon points="-35,5 -45,18 -49,18 -42,0 -49,-18 -45,-18 -35,-5" fill="#ffffff" />
                {/* Fuselage */}
                <ellipse cx="-10" cy="0" rx="42" ry="11" fill="#ffffff" />
                {/* Nose Cone */}
                <ellipse cx="25" cy="0" rx="10" ry="7" fill="#0ea5e9" />
              </g>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: 800,
              fontSize: '1.4rem',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.5px'
            }}>
              Rodher<span style={{ color: 'rgb(var(--secondary-rgb))' }}>Tours</span>
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              lineHeight: 1
            }}>
              Viaja. Descubre. Vive.
            </span>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <div className="nav-links" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}>
          <a href="#inicio" className="nav-item">Inicio</a>
          <a href="#destinos" className="nav-item">Destinos</a>
          <a href="#ventajas" className="nav-item">Ventajas</a>
          <button 
            onClick={onOpenAdmin} 
            className="btn btn-secondary" 
            style={{ 
              padding: '8px 20px', 
              fontSize: '0.9rem',
              borderRadius: '12px'
            }}
          >
            Admin Panel
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'none', // Managed by CSS in standard media query, but let's do inline media style via React if needed, or simple class-based css
          }}
          className="mobile-menu-btn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="glass-dark animate-fade-in" style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          width: '100%',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 999,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', fontWeight: 600 }}>Inicio</a>
          <a href="#destinos" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', fontWeight: 600 }}>Destinos</a>
          <a href="#ventajas" onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', fontWeight: 600 }}>Ventajas</a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }} 
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            Panel Administrador
          </button>
        </div>
      )}

      {/* Injecting CSS specifically for the navbar desktop/mobile responsiveness */}
      <style>{`
        .nav-item {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-main);
          transition: var(--transition-fast);
          position: relative;
        }
        .nav-item:hover {
          color: rgb(var(--secondary-rgb));
        }
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: rgb(var(--secondary-rgb));
          transition: var(--transition-fast);
        }
        .nav-item:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
