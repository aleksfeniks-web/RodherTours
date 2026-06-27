import React, { useState } from 'react';
import { updateBookingStatus } from '../../firebaseService';
import { StatusBadge } from './DashboardTab';

// WhatsApp message builder
const getWhatsAppLink = (phone, name, destination, folio) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const message = `Hola ${name}, te escribo de la agencia de viajes RodherTours. Recibimos tu pago de apartado para el viaje de *${destination}* con Folio *${folio}*. ¡Nos da mucho gusto saludarte! ¿Tienes unos minutos para definir los detalles de tu itinerario?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

const thStyle = {
  padding: '14px 18px',
  fontWeight: 700,
  borderBottom: '1.5px solid #e2e8f0',
  color: '#64748b',
  textAlign: 'left',
  whiteSpace: 'nowrap',
};

const tdStyle = { padding: '14px 18px', verticalAlign: 'middle' };

export default function ReservationsTab({ bookings, onBookingsChange }) {
  const [searchTerm, setSearchTerm]   = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading]         = useState(false);

  const handleStatusChange = async (bookingId, newStatus, docId) => {
    setLoading(true);
    const success = await updateBookingStatus(bookingId, newStatus, docId);
    if (success) {
      onBookingsChange(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      );
    } else {
      alert('No se pudo actualizar el estado.');
    }
    setLoading(false);
  };

  const filtered = bookings.filter(b => {
    const matchesSearch =
      (b.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.destinationName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Counts for filter badges
  const counts = {
    all:       bookings.length,
    new:       bookings.filter(b => b.status === 'new').length,
    contacted: bookings.filter(b => b.status === 'contacted').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por cliente, folio o destino..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1',
            fontSize: '0.9rem', flexGrow: 1, outline: 'none', background: 'white',
          }}
        />

        {/* Status filter chips */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { key: 'all',       label: 'Todos',       color: '#64748b' },
            { key: 'new',       label: 'Nuevos',      color: '#f59e0b' },
            { key: 'contacted', label: 'Contactados', color: '#10b981' },
            { key: 'cancelled', label: 'Cancelados',  color: '#ef4444' },
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => setStatusFilter(opt.key)}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                border: `1.5px solid ${statusFilter === opt.key ? opt.color : '#e2e8f0'}`,
                background: statusFilter === opt.key ? `${opt.color}15` : 'white',
                color: statusFilter === opt.key ? opt.color : '#64748b',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px'
              }}
            >
              {opt.label}
              <span style={{
                background: statusFilter === opt.key ? opt.color : '#e2e8f0',
                color: statusFilter === opt.key ? 'white' : '#64748b',
                borderRadius: '99px', padding: '0 6px', fontSize: '0.7rem', fontWeight: 800
              }}>
                {counts[opt.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflowX: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>
            No se encontraron reservas registradas.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={thStyle}>Folio</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Destino</th>
                <th style={thStyle}>Fecha / Pasajeros</th>
                <th style={thStyle}>Apartado</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <strong style={{ fontFamily: 'monospace', letterSpacing: '0.5px', fontSize: '0.82rem', color: '#0f172a' }}>
                      {b.id}
                    </strong>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.clientName}</div>
                    <div style={{ fontSize: '0.73rem', color: '#64748b' }}>{b.clientEmail}</div>
                    <div style={{ fontSize: '0.73rem', color: '#64748b' }}>{b.clientPhone}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500, color: '#334155' }}>{b.destinationName?.split('(')[0]}</div>
                  </td>
                  <td style={tdStyle}>
                    <div>📅 {b.travelDate}</div>
                    <div style={{ fontSize: '0.73rem', color: '#64748b' }}>
                      👥 {b.passengers} {b.passengers === 1 ? 'Persona' : 'Personas'}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>${b.amountPaid} USD</strong>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>{b.paymentMethod || 'Tarjeta'}</span>
                      {b.couponUsed && <span style={{ color: '#0ea5e9', fontWeight: 700 }}>🎟️ Cupón: {b.couponUsed}</span>}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={b.status}
                      disabled={loading}
                      onChange={e => handleStatusChange(b.id, e.target.value, b.docId)}
                      style={{
                        padding: '5px 10px', borderRadius: '6px',
                        border: '1px solid #cbd5e1', fontSize: '0.78rem', fontWeight: 600,
                        background: b.status === 'new' ? '#eff6ff' : b.status === 'contacted' ? '#ecfdf5' : '#fff1f2',
                        color: b.status === 'new' ? '#1d4ed8' : b.status === 'contacted' ? '#047857' : '#be123c',
                        cursor: 'pointer', outline: 'none',
                      }}
                    >
                      <option value="new">Nuevo (Sin contactar)</option>
                      <option value="contacted">Contactado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    {b.clientPhone ? (
                      <a
                        href={getWhatsAppLink(b.clientPhone, b.clientName, b.destinationName, b.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#25D366', color: 'white', padding: '6px 12px',
                          borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700,
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.849-4.417 9.851-9.85.002-5.43-4.415-9.849-9.851-9.849-5.431 0-9.85 4.417-9.852 9.85-.001 1.954.512 3.86 1.488 5.567l-.999 3.647 3.747-.981zm12.006-7.531c-.328-.164-1.942-.959-2.242-1.069-.3-.11-.518-.165-.736.164-.219.328-.847 1.069-1.037 1.288-.19.219-.38.246-.708.082-.328-.164-1.386-.511-2.64-1.629-.976-.87-1.635-1.946-1.826-2.274-.19-.328-.02-.505.144-.668.148-.147.328-.383.493-.574.164-.191.219-.328.328-.546.11-.219.055-.41-.027-.574-.082-.164-.736-1.777-1.009-2.433-.267-.641-.539-.553-.736-.563-.19-.01-.409-.012-.628-.012-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.732 0 1.612 1.174 3.17 1.338 3.389.164.218 2.312 3.53 5.599 4.95 1.666.721 2.502.936 3.424.811.895-.121 2.766-1.131 3.153-2.227.387-1.096.387-2.031.272-2.227-.113-.195-.411-.304-.739-.469z"/>
                        </svg>
                        WhatsApp
                      </a>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
