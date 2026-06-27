import React, { useState } from 'react';

export default function UsersTab({ bookings }) {
  const [search, setSearch] = useState('');

  // ─── Deduplicate by email ──────────────────────────────────────────
  const usersMap = {};
  bookings.forEach(b => {
    const key = (b.clientEmail || '').toLowerCase().trim() || b.clientPhone;
    if (!usersMap[key]) {
      usersMap[key] = {
        name:         b.clientName,
        email:        b.clientEmail,
        phone:        b.clientPhone,
        bookings:     [],
        firstBooking: b.createdAt,
      };
    }
    usersMap[key].bookings.push(b);
    // Keep earliest booking date
    if (b.createdAt && b.createdAt < usersMap[key].firstBooking) {
      usersMap[key].firstBooking = b.createdAt;
    }
  });

  const users = Object.values(usersMap);

  // ─── Search filter ──────────────────────────────────────────────────
  const term = search.toLowerCase();
  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(term) ||
    u.email?.toLowerCase().includes(term) ||
    u.phone?.toLowerCase().includes(term)
  );

  const totalSpent = (user) =>
    user.bookings.reduce((s, b) => s + (b.amountPaid || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Clientes Únicos',      value: users.length,  icon: '👥', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Reservas en Total',    value: bookings.length, icon: '📋', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
          { label: 'Clientes Recurrentes', value: users.filter(u => u.bookings.length > 1).length, icon: '🔄', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '18px 20px', borderRadius: '14px', background: item.bg,
            border: `1.5px solid ${item.color}22`, display: 'flex', gap: '14px', alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '3px' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, email o teléfono..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1.5px solid #cbd5e1',
            fontSize: '0.9rem',
            flexGrow: 1,
            outline: 'none',
            background: 'white',
          }}
        />
        <span style={{ fontSize: '0.82rem', color: '#64748b', whiteSpace: 'nowrap' }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Users Table */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            {search ? 'No se encontraron clientes.' : 'No hay clientes registrados aún.'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#64748b', fontWeight: 700, textAlign: 'left' }}>
                <th style={{ padding: '14px 18px' }}>Cliente</th>
                <th style={{ padding: '14px 18px' }}>Teléfono / WhatsApp</th>
                <th style={{ padding: '14px 18px' }}>Destinos</th>
                <th style={{ padding: '14px 18px', textAlign: 'center' }}>Reservas</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Invertido</th>
                <th style={{ padding: '14px 18px' }}>Contacto Directo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const cleanPhone = (user.phone || '').replace(/\D/g, '');
                const spent = totalSpent(user);
                const destNames = [...new Set(user.bookings.map(b => b.destinationName?.split('(')[0]?.trim()))].join(', ');
                const isRecurring = user.bookings.length > 1;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Avatar */}
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: `hsl(${(user.name?.charCodeAt(0) || 65) * 7 % 360}, 65%, 55%)`,
                          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                        }}>
                          {user.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>
                            {user.name}
                            {isRecurring && (
                              <span style={{
                                marginLeft: '6px', fontSize: '0.65rem', fontWeight: 700,
                                background: 'rgba(16,185,129,0.1)', color: '#047857',
                                padding: '1px 6px', borderRadius: '20px'
                              }}>Recurrente</span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#334155' }}>
                      {user.phone || '—'}
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {destNames || '—'}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                      <span style={{
                        background: 'rgba(14,165,233,0.1)', color: 'rgb(14,165,233)',
                        padding: '2px 10px', borderRadius: '20px', fontWeight: 700
                      }}>{user.bookings.length}</span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>
                      ${spent} USD
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      {cleanPhone ? (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${user.name}, te contactamos de RodherTours. ¿En qué podemos ayudarte? 😊`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            background: '#25D366', color: 'white', padding: '5px 12px',
                            borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700,
                            textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.849-4.417 9.851-9.85.002-5.43-4.415-9.849-9.851-9.849-5.431 0-9.85 4.417-9.852 9.85-.001 1.954.512 3.86 1.488 5.567l-.999 3.647 3.747-.981zm12.006-7.531c-.328-.164-1.942-.959-2.242-1.069-.3-.11-.518-.165-.736.164-.219.328-.847 1.069-1.037 1.288-.19.219-.38.246-.708.082-.328-.164-1.386-.511-2.64-1.629-.976-.87-1.635-1.946-1.826-2.274-.19-.328-.02-.505.144-.668.148-.147.328-.383.493-.574.164-.191.219-.328.328-.546.11-.219.055-.41-.027-.574-.082-.164-.736-1.777-1.009-2.433-.267-.641-.539-.553-.736-.563-.19-.01-.409-.012-.628-.012-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.732 0 1.612 1.174 3.17 1.338 3.389.164.218 2.312 3.53 5.599 4.95 1.666.721 2.502.936 3.424.811.895-.121 2.766-1.131 3.153-2.227.387-1.096.387-2.031.272-2.227-.113-.195-.411-.304-.739-.469z"/>
                          </svg>
                          WhatsApp
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
