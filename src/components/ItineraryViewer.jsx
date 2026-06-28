import React, { useState } from 'react';
import { getItineraryForPackage } from '../data/itineraries';

// Inline SVGs for timeline nodes to ensure they render beautifully and load instantly
const getIconSVG = (iconName) => {
  switch (iconName) {
    case 'flight':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
        </svg>
      );
    case 'hotel':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      );
    case 'food':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'shopping':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      );
    case 'transport':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="22" height="13" rx="2" ry="2"/>
          <line x1="1" y1="9" x2="23" y2="9"/>
          <line x1="6" y1="16" x2="6" y2="21"/>
          <line x1="18" y1="16" x2="18" y2="21"/>
        </svg>
      );
    case 'sightseeing':
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      );
  }
};

export default function ItineraryViewer({ destination, onClose, onBook }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  
  const itinerary = getItineraryForPackage(destination);
  
  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
        No se encontró el itinerario del paquete.
      </div>
    );
  }

  const currentDay = itinerary.days[activeDayIdx] || itinerary.days[0];

  // Construct WhatsApp customized quote link
  const waQuoteText = `Hola RodherTours! Me interesa cotizar de manera personalizada el itinerario para el tour "${destination.name}" en ${destination.country}. 

📆 Duración: ${destination.duration}
Precio base: $${destination.price} USD
Día seleccionado para consulta: Día ${currentDay.day} (${currentDay.date})

¿Me podrían brindar más información de fechas de salida disponibles? 😊`;

  const waQuoteUrl = `https://wa.me/525587654321?text=${encodeURIComponent(waQuoteText)}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(3, 7, 18, 0.82)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      padding: '16px'
    }} className="animate-fade-in">
      
      {/* Container Card */}
      <div className="glass" style={{
        width: '100%',
        maxWidth: '1080px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        overflow: 'hidden',
        color: 'var(--text-main)',
        position: 'relative'
      }}>
        
        {/* Glow Decor */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'rgba(14, 165, 233, 0.15)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(to right, #070b19, #0f172a)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'rgb(var(--secondary-rgb))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Planificador de Ruta 🗺️
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 0 0', color: 'white' }}>
              {itinerary.title}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              transition: 'var(--transition-fast)'
            }}
            className="close-btn"
          >
            &times;
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="itinerary-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          flexGrow: 1,
          overflow: 'hidden',
          zIndex: 1
        }}>
          
          {/* LEFT COLUMN: Timeline & Tabs */}
          <div style={{
            padding: '24px',
            overflowY: 'auto',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            
            {/* Days Tab Bar */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '14px', flexWrap: 'nowrap', overflowX: 'auto' }}>
              {itinerary.days.map((day, idx) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDayIdx(idx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: activeDayIdx === idx ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    background: activeDayIdx === idx ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: activeDayIdx === idx ? '#a3e635' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    boxShadow: activeDayIdx === idx ? '0 0 10px rgba(163, 230, 53, 0.1)' : 'none'
                  }}
                >
                  Día {day.day}
                </button>
              ))}
            </div>

            {/* Timeline Header Info */}
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actividades programadas</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0 0', color: '#ffffff' }}>
                {currentDay.date}
              </h4>
            </div>

            {/* Vertical Timeline List */}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '8px' }}>
              
              {/* Timeline Connector Line */}
              <div style={{
                position: 'absolute',
                top: '12px',
                bottom: '12px',
                left: '23px',
                width: '2px',
                background: 'dashed rgba(255, 255, 255, 0.12)',
                borderLeft: '2px dashed rgba(255, 255, 255, 0.15)',
                zIndex: 0
              }}></div>

              {currentDay.events.map((event, eIdx) => (
                <div key={eIdx} style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '28px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {/* Timeline Colored Circle Node */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: event.color || 'var(--accent-rgb)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 12px ${event.color}40`,
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {getIconSVG(event.icon)}
                  </div>

                  {/* Timeline Card */}
                  <div style={{
                    flexGrow: 1,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>
                        {event.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                        {event.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Google Maps & Specs */}
          <div style={{
            padding: '24px',
            background: 'rgba(3, 7, 18, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            {/* Map Title/Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
                Ubicación del Día 📍
              </span>
              <strong style={{ fontSize: '1rem', color: 'white' }}>
                {currentDay.mapQuery.split(',')[0]}
              </strong>
            </div>

            {/* Google Maps Embed iframe Container */}
            <div style={{
              flexGrow: 1,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              minHeight: '300px',
              position: 'relative'
            }}>
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(currentDay.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  filter: 'invert(90%) hue-rotate(180deg) opacity(0.85)', // Premium dark map filter effect
                  display: 'block' 
                }} 
                allowFullScreen 
                loading="lazy"
                title={`Map of ${currentDay.mapQuery}`}
              ></iframe>
            </div>

            {/* Quick Pricing Summary Info Box */}
            <div style={{
              background: 'rgba(14, 165, 233, 0.05)',
              border: '1px solid rgba(14, 165, 233, 0.15)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Costo Total Estimado</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                  ${destination.price.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>USD</span>
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Apartado con</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a3e635' }}>
                  ${destination.downPayment} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>USD</span>
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer / CTAs */}
        <div style={{
          padding: '16px 24px',
          background: 'linear-gradient(to right, #0f172a, #070b19)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1,
          flexWrap: 'wrap'
        }}>
          {/* Whatsapp CTA Button */}
          <a
            href={waQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
              textDecoration: 'none',
              transition: 'var(--transition-fast)'
            }}
            className="wa-itinerary-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.849-4.417 9.851-9.85.002-5.43-4.415-9.849-9.851-9.849-5.431 0-9.85 4.417-9.852 9.85-.001 1.954.512 3.86 1.488 5.567l-.999 3.647 3.747-.981zm12.006-7.531c-.328-.164-1.942-.959-2.242-1.069-.3-.11-.518-.165-.736.164-.219.328-.847 1.069-1.037 1.288-.19.219-.38.246-.708.082-.328-.164-1.386-.511-2.64-1.629-.976-.87-1.635-1.946-1.826-2.274-.19-.328-.02-.505.144-.668.148-.147.328-.383.493-.574.164-.191.219-.328.328-.546.11-.219.055-.41-.027-.574-.082-.164-.736-1.777-1.009-2.433-.267-.641-.539-.553-.736-.563-.19-.01-.409-.012-.628-.012-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.732 0 1.612 1.174 3.17 1.338 3.389.164.218 2.312 3.53 5.599 4.95 1.666.721 2.502.936 3.424.811.895-.121 2.766-1.131 3.153-2.227.387-1.096.387-2.031.272-2.227-.113-.195-.411-.304-.739-.469z"/>
            </svg>
            Cotizar por WhatsApp
          </a>

          {/* Book online button */}
          <button
            onClick={onBook}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            className="btn btn-accent"
          >
            Apartar en Línea
          </button>
        </div>

      </div>

      {/* Styled hooks for modal hover effects and responsive grids */}
      <style>{`
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: scale(1.05);
        }
        .wa-itinerary-btn:hover {
          background: #20ba59 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35) !important;
        }
        @media (max-width: 900px) {
          .itinerary-grid {
            grid-template-columns: 1fr !important;
            overflow-y: auto !important;
          }
          .itinerary-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            overflow-y: visible !important;
          }
          .itinerary-grid > div:last-child {
            min-height: 350px !important;
          }
        }
        @media (max-width: 500px) {
          .close-btn {
            width: 32px !important;
            height: 32px !important;
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
