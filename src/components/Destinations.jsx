import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { useStaggeredReveal } from '../hooks/useScrollReveal';
import { getItems } from '../firebaseService';

const STATIC_PACKAGES = [
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

export default function Destinations({ activeTab: propActiveTab, setActiveTab: propSetActiveTab, onSelectDestination }) {
  const [localActiveTab, setLocalActiveTab] = useState('tours');
  const tab = propActiveTab || localActiveTab;
  const setTab = propSetActiveTab || setLocalActiveTab;

  const [items, setItems] = useState(STATIC_PACKAGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const queryType = (tab === 'tours' || tab === 'packages') ? 'packages' : tab;
        const data = await getItems(queryType);
        if (data && data.length > 0) {
          setItems(data);
        } else if (tab === 'tours' || tab === 'packages') {
          setItems(STATIC_PACKAGES);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Error loading items in Destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    
    // Add custom event listener for local inventory updates
    const handleInventoryUpdate = () => loadData();
    window.addEventListener('inventoryUpdated', handleInventoryUpdate);
    return () => window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
  }, [tab]);

  const { containerRef, getItemStyle } = useStaggeredReveal(items.length, { staggerMs: 130, threshold: 0.06 });

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
            margin: '0 auto 40px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>

            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--dark-bg)',
              letterSpacing: '-1px'
            }}>
              {tab === 'flights' ? 'Vuelos Disponibles' : tab === 'hotels' ? 'Hoteles Exclusivos' : tab === 'cars' ? 'Autos en Renta' : 'Destinos Populares de Temporada'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {tab === 'flights' 
                ? 'Reserva boletos de avión a tus destinos preferidos de forma inmediata con nuestro apartado en línea.'
                : tab === 'hotels'
                ? 'Hospédate en las mejores cadenas hoteleras del mundo. Aparta tu habitación con tarifa preferencial.'
                : tab === 'cars'
                ? 'Renta el auto ideal para tus vacaciones. Kilometraje libre y seguros incluidos al reservar.'
                : 'Explora nuestros tours guiados de alta gama con itinerarios optimizados y el mejor soporte local. Asegura tu lugar hoy con un pequeño apartado.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Selector Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'tours', label: 'Tours / Paquetes', icon: 'fi fi-rs-map' },
            { id: 'flights', label: 'Vuelos', icon: 'fi fi-rr-plane-alt' },
            { id: 'hotels', label: 'Hoteles', icon: 'fi fi-rs-hotel' },
            { id: 'cars', label: 'Autos', icon: 'fi fi-rs-car-side' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setTab(cat.id)}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                border: tab === cat.id ? '2px solid rgb(var(--secondary-rgb))' : '2px solid rgba(0,0,0,0.06)',
                background: tab === cat.id ? 'rgba(14, 165, 233, 0.08)' : 'white',
                color: tab === cat.id ? 'rgb(var(--secondary-rgb))' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: tab === cat.id ? '0 4px 12px rgba(14, 165, 233, 0.15)' : 'var(--shadow-sm)',
                transition: 'all 0.25s ease'
              }}
            >
              <i className={cat.icon} style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}></i>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid or Loader - stagger-animated */}
        {loading ? (
          <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>⏳</span>
            Cargando inventario de {tab === 'flights' ? 'vuelos' : tab === 'hotels' ? 'hoteles' : tab === 'cars' ? 'autos' : 'tours'}...
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>🔍</span>
            No hay registros disponibles en esta categoría.
          </div>
        ) : (
          <div ref={containerRef} className="grid-2" style={{ gap: '32px' }}>
            {items.map((item, index) => {
              let displayPkg = {};

              if (tab === 'tours' || tab === 'packages') {
                displayPkg = {
                  ...item,
                  type: 'package'
                };
              } else if (tab === 'flights') {
                displayPkg = {
                  id: item.id,
                  name: `Vuelo ${item.origin} ➔ ${item.destination}`,
                  country: `${item.airline} ✈️`,
                  image: '/images/flight_card.png',
                  tag: 'Vuelo Directo',
                  duration: 'Vía Sencilla',
                  highlights: `Viaja por ${item.airline} • Disponibilidad: ${item.availability} asientos • Selección de asientos y equipaje de mano incluidos`,
                  price: item.price,
                  downPayment: Math.round(item.price * 0.1), // 10% down payment
                  rating: 4.8,
                  reviews: 73,
                  badgeColor: '#0ea5e9',
                  type: 'flight'
                };
              } else if (tab === 'hotels') {
                displayPkg = {
                  id: item.id,
                  name: item.name,
                  country: `${item.destination} 🏨`,
                  image: '/images/hotel_card.png',
                  tag: `${'★'.repeat(item.stars || 5)} Estrellas`,
                  duration: 'Estadía Estimada: 5 Noches',
                  highlights: `Hospedaje premium • Ubicado en zona exclusiva de ${item.destination.split(',')[0]} • Desayuno buffet continental y wifi de alta velocidad incluidos`,
                  price: item.rate * 5,
                  downPayment: item.rate, // 1 night deposit
                  rating: item.stars >= 5 ? 4.9 : 4.6,
                  reviews: 114,
                  badgeColor: '#10b981',
                  type: 'hotel'
                };
              } else if (tab === 'cars') {
                displayPkg = {
                  id: item.id,
                  name: item.name,
                  country: `${item.type} 🚗`,
                  image: '/images/car_card.png',
                  tag: item.transmission,
                  duration: 'Renta Estimada: 7 Días',
                  highlights: `Modelo: ${item.name} • Transmisión ${item.transmission} • Kilometraje libre y seguros de cobertura amplia incluidos en tarifa básica`,
                  price: item.price * 7,
                  downPayment: item.price * 2, // 2 days deposit
                  rating: 4.7,
                  reviews: 29,
                  badgeColor: '#f59e0b',
                  type: 'car'
                };
              }

              return (
                <div 
                  key={item.id || index} 
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
                      src={displayPkg.image} 
                      alt={displayPkg.name} 
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
                      background: displayPkg.badgeColor,
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}>
                      {displayPkg.tag}
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
                      <span>{displayPkg.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({displayPkg.reviews})</span>
                    </div>
                  </div>

                  {/* Card Info Area */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgb(var(--secondary-rgb))', fontWeight: 700 }}>
                        {displayPkg.country}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        ⏱️ {displayPkg.duration}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-bg)', fontWeight: 700 }}>
                      {displayPkg.name}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flexGrow: 1 }}>
                      {displayPkg.highlights}
                    </p>

                    <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                          {displayPkg.type === 'flight' ? 'Costo Vuelo' : displayPkg.type === 'hotel' ? 'Costo Estadía' : displayPkg.type === 'car' ? 'Costo Renta' : 'Costo Total'}
                        </span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-bg)' }}>
                          ${displayPkg.price.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>USD</span>
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Aparta con solo</span>
                        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'rgb(var(--accent-rgb))' }}>
                          ${displayPkg.downPayment} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>USD</span>
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onSelectDestination(displayPkg)}
                      className="btn btn-accent" 
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        marginTop: '8px',
                        fontSize: '0.95rem'
                      }}
                    >
                      {displayPkg.type === 'flight' ? 'Reservar y Apartar Vuelo' : displayPkg.type === 'hotel' ? 'Reservar y Apartar Habitación' : displayPkg.type === 'car' ? 'Reservar y Apartar Auto' : 'Reservar y Apartar Lugar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
export { STATIC_PACKAGES as packages };
