import React, { useState } from 'react';
import { saveBooking } from '../firebaseService';

export default function BookingModal({ destination, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [folio, setFolio] = useState('');
  const [isFirebase, setIsFirebase] = useState(false);

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Form Validation
  const handleNextStep = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail || !travelDate) {
      alert("Por favor complete todos los datos obligatorios.");
      return;
    }
    // Simple phone check
    if (clientPhone.length < 10) {
      alert("Por favor ingrese un número de celular de al menos 10 dígitos (ej. +52 55 1234 5678).");
      return;
    }
    setStep(2);
  };

  // Payment Confirmation & Booking Save
  const handlePaymentConfirm = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        alert("Por favor complete los datos de la tarjeta.");
        return;
      }
    }

    setLoading(true);

    const bookingData = {
      clientName,
      clientPhone,
      clientEmail,
      travelDate,
      passengers: parseInt(passengers),
      destinationId: destination.id,
      destinationName: `${destination.name} (${destination.country})`,
      amountPaid: destination.downPayment,
      paymentMethod: paymentMethod === 'card' ? 'Tarjeta' : paymentMethod === 'spei' ? 'Transferencia SPEI' : 'OXXO Pay'
    };

    try {
      // Save using our Firebase/LocalStorage service
      const result = await saveBooking(bookingData);
      if (result.success) {
        setFolio(result.folio);
        setIsFirebase(result.firebase);
        setStep(3);
      }
    } catch (error) {
      alert(error.message || "Ocurrió un error al procesar su reserva.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("¡CLABE Copiada al portapapeles!");
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 25, 47, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      padding: '16px'
    }} className="animate-fade-in">
      
      {/* Modal Card */}
      <div className="glass" style={{
        width: '100%',
        maxWidth: '540px',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        color: 'var(--text-main)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(to right, rgb(var(--primary-rgb)), #1e293b)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Reserva de Viaje</h3>
            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{destination.name}</span>
          </div>
          {step !== 3 && (
            <button 
              onClick={onClose} 
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                lineHeight: 1
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Steps indicator */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: '#f8fafc',
          textAlign: 'center',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          {[
            { n: 1, label: '1. Datos del Viajero' },
            { n: 2, label: '2. Pago de Apartado' },
            { n: 3, label: '3. Confirmación' }
          ].map(s => (
            <div key={s.n} style={{
              padding: '12px 6px',
              borderBottom: step === s.n ? '3px solid rgb(var(--secondary-rgb))' : 'none',
              color: step === s.n ? 'rgb(var(--secondary-rgb))' : 'var(--text-muted)',
              background: step === s.n ? '#ffffff' : 'transparent'
            }}>
              {s.label}
            </div>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flexGrow: 1
        }}>

          {/* STEP 1: TRAVELER DETAILS */}
          {step === 1 && (
            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Nombre Completo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Juan Pérez García"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>WhatsApp / Celular (10+ dígitos) *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="ej. +52 55 1234 5678"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  style={inputStyle}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                  Asegúrate de incluir código de país (ej. +52 para México).
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Correo Electrónico *</label>
                <input 
                  type="email" 
                  required
                  placeholder="juan.perez@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fecha de Viaje *</label>
                  <input 
                    type="date" 
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Pasajeros *</label>
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Viajero' : 'Viajeros'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: 'rgba(249, 115, 22, 0.08)',
                border: '1.5px dashed rgba(249, 115, 22, 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Monto del Apartado</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Reserva garantizada</span>
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'rgb(var(--accent-rgb))' }}>
                  ${destination.downPayment} USD
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '14px', borderRadius: 'var(--radius-md)', marginTop: '8px' }}>
                Continuar al Pago
              </button>
            </form>
          )}

          {/* STEP 2: DOWN PAYMENT CHECKOUT */}
          {step === 2 && (
            <form onSubmit={handlePaymentConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Order summary */}
              <div style={{
                background: '#f8fafc',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Destino:</span>
                  <strong style={{ color: 'var(--dark-bg)' }}>{destination.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pasajeros:</span>
                  <strong>{passengers}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Fecha:</span>
                  <strong>{travelDate}</strong>
                </div>
                <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Pago de Apartado:</span>
                  <strong style={{ color: 'rgb(var(--accent-rgb))', fontSize: '1.2rem' }}>${destination.downPayment} USD</strong>
                </div>
              </div>

              {/* Payment selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Método de Pago</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  {[
                    { id: 'card', label: '💳 Tarjeta' },
                    { id: 'spei', label: '🏦 SPEI' },
                    { id: 'oxxo', label: '🏪 OXXO' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      style={{
                        padding: '10px 4px',
                        border: paymentMethod === method.id ? '2px solid rgb(var(--secondary-rgb))' : '1px solid #cbd5e1',
                        borderRadius: 'var(--radius-sm)',
                        background: paymentMethod === method.id ? 'rgba(14, 165, 233, 0.05)' : 'white',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        color: paymentMethod === method.id ? 'rgb(var(--secondary-rgb))' : 'var(--text-main)',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PAYMENT INTERFACE DETAILS */}
              {paymentMethod === 'card' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Credit Card UI Simulation */}
                  <div className="glass-dark" style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '160px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: '-40px',
                      bottom: '-40px',
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '50%'
                    }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600 }}>RODHERTOURS PAY</span>
                      <span style={{ fontSize: '1.2rem' }}>💳</span>
                    </div>
                    <div style={{ fontSize: '1.2rem', letterSpacing: '3px', fontFamily: 'monospace', margin: '12px 0' }}>
                      {cardNumber ? cardNumber.replace(/\d{4}(?=.)/g, '$& ') : '•••• •••• •••• ••••'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.6rem' }}>CARDHOLDER</div>
                        <div style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>{cardName || 'JUAN PEREZ'}</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.6rem' }}>EXPIRES</div>
                        <div>{cardExpiry || 'MM/AA'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input 
                      type="text" 
                      required
                      placeholder="Número de Tarjeta (16 dígitos)"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input 
                      type="text" 
                      required
                      placeholder="Nombre del Titular"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input 
                      type="text" 
                      required
                      placeholder="Vencimiento (MM/AA)"
                      maxLength="5"
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) {
                          val += '/';
                        }
                        setCardExpiry(val);
                      }}
                      style={inputStyle}
                    />
                    <input 
                      type="password" 
                      required
                      placeholder="CVV"
                      maxLength="3"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'spei' && (
                <div className="animate-fade-in" style={{
                  background: 'rgba(14, 165, 233, 0.04)',
                  border: '1px solid rgba(14, 165, 233, 0.15)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Realiza tu transferencia desde la app de tu banco con la siguiente Clave Interbancaria:
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}>
                    <div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-light)' }}>CLABE DE PAGO</div>
                      <strong style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>127180013579246801</strong>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => copyToClipboard('127180013579246801')}
                      style={{ background: 'rgb(var(--secondary-rgb))', border: 'none', color: 'white', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                    >
                      Copiar
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Banco Beneficiario:</span>
                    <strong>STP (Sistema de Transferencias y Pagos)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Beneficiario:</span>
                    <strong>RodherTours S.A. de C.V.</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Referencia:</span>
                    <strong>{destination.id.toUpperCase()}-APARTADO</strong>
                  </div>
                </div>
              )}

              {paymentMethod === 'oxxo' && (
                <div className="animate-fade-in" style={{
                  background: 'rgba(245, 158, 11, 0.04)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Presenta esta referencia en cualquier sucursal OXXO para pagar tu apartado en efectivo.
                  </span>
                  
                  {/* Mock Barcode */}
                  <div style={{
                    background: 'white',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    margin: '8px 0',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: '1.5rem', letterSpacing: '4px', fontFamily: 'monospace', color: '#1e293b' }}>
                      ||||| | |||| ||| || |||
                    </span>
                    <strong style={{ fontSize: '0.95rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
                      4829-1035-7281-9462
                    </strong>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    OXXO cobrará una comisión de $15 MXN al recibir el pago.
                  </span>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '12px',
                marginTop: '16px'
              }}>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  disabled={loading}
                  className="btn btn-secondary" 
                  style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                >
                  Atrás
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-accent" 
                  style={{ borderRadius: 'var(--radius-md)', padding: '12px', position: 'relative' }}
                >
                  {loading ? 'Procesando...' : 'Completar Apartado'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: BOOKING CONFIRMATION */}
          {step === 3 && (
            <div className="animate-fade-in" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px 0',
              gap: '16px'
            }}>
              {/* Success Checkmark Circle */}
              <div className="flex-center" style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '3px solid rgb(var(--success-rgb))',
                color: 'rgb(var(--success-rgb))',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                ✓
              </div>

              <h2 style={{ color: 'var(--dark-bg)', fontWeight: 800, fontSize: '1.6rem' }}>
                ¡Apartado Confirmado!
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
                Hemos registrado tus datos correctamente. El pago de apartado de <strong>${destination.downPayment} USD</strong> se ha procesado con éxito.
              </p>

              {/* Folio Block */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px dashed #cbd5e1',
                padding: '16px 24px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                margin: '8px 0'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
                  Folio de Reserva
                </span>
                <strong style={{ fontSize: '1.6rem', color: 'var(--dark-bg)', letterSpacing: '2px', fontFamily: 'monospace' }}>
                  {folio}
                </strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-light)' }}>
                  Almacenado vía {isFirebase ? 'Firebase Firestore' : 'LocalStorage Local'}
                </span>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '1.5rem' }}>💬</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0 }}>
                  <strong>Próximo Paso:</strong> Un ejecutivo de RodherTours se pondrá en contacto contigo a tu número <strong>{clientPhone}</strong> vía WhatsApp para coordinar los detalles finales de tu viaje.
                </p>
              </div>

              <button 
                onClick={onClose} 
                className="btn btn-primary" 
                style={{ width: '100%', borderRadius: 'var(--radius-md)', padding: '14px', marginTop: '16px' }}
              >
                Cerrar Ventana
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Reuseable input style
const inputStyle = {
  padding: '11px 14px',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid #cbd5e1',
  background: 'white',
  fontSize: '0.92rem',
  fontWeight: 500,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s ease'
};
