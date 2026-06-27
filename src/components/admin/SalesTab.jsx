import React, { useState } from 'react';

// Payment method display mapping
const METHOD_LABELS = {
  'Tarjeta':             { icon: '💳', color: '#6366f1' },
  'Transferencia SPEI':  { icon: '🏦', color: '#0ea5e9' },
  'OXXO Pay':            { icon: '🏪', color: '#f59e0b' },
};

export default function SalesTab({ bookings }) {
  const [sortField, setSortField] = useState('revenue');

  // ─── Per-destination aggregation ───────────────────────────────────
  const destMap = {};
  bookings.forEach(b => {
    const key = b.destinationId || 'other';
    if (!destMap[key]) {
      destMap[key] = {
        name: b.destinationName?.split('(')[0]?.trim() || key,
        count: 0,
        revenue: 0,
        byMethod: {},
      };
    }
    destMap[key].count++;
    destMap[key].revenue += b.amountPaid || 0;

    const method = b.paymentMethod || 'Tarjeta';
    destMap[key].byMethod[method] = (destMap[key].byMethod[method] || 0) + 1;
  });

  const destRows = Object.entries(destMap).map(([key, val]) => ({ key, ...val }));

  // Sort
  const sorted = [...destRows].sort((a, b) =>
    sortField === 'revenue' ? b.revenue - a.revenue : b.count - a.count
  );

  // ─── Totals ─────────────────────────────────────────────────────────
  const totalRev   = bookings.reduce((s, b) => s + (b.amountPaid || 0), 0);
  const totalCount = bookings.length;

  // ─── Payment method breakdown ───────────────────────────────────────
  const methodMap = {};
  bookings.forEach(b => {
    const m = b.paymentMethod || 'Tarjeta';
    methodMap[m] = (methodMap[m] || 0) + 1;
  });
  const methodEntries = Object.entries(methodMap).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Summary Banners */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {[
          { label: 'Total Ingresos',   value: `$${totalRev} USD`,  icon: '💰', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Reservas Pagadas', value: totalCount,           icon: '📋', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
          { label: 'Ticket Promedio',  value: totalCount > 0 ? `$${Math.round(totalRev / totalCount)} USD` : '—', icon: '📈', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '20px', borderRadius: '14px', background: item.bg,
            border: `1.5px solid ${item.color}22`, display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

        {/* Revenue Table by Destination */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
              💹 Ingresos por Destino
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['revenue', 'count'].map(f => (
                <button key={f} onClick={() => setSortField(f)} style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                  border: '1.5px solid',
                  borderColor: sortField === f ? 'rgb(14,165,233)' : '#e2e8f0',
                  background: sortField === f ? 'rgba(14,165,233,0.08)' : 'white',
                  color: sortField === f ? 'rgb(14,165,233)' : '#64748b',
                  cursor: 'pointer'
                }}>
                  {f === 'revenue' ? '$ Ingresos' : '# Reservas'}
                </button>
              ))}
            </div>
          </div>

          {sorted.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '24px 0' }}>
              Sin ventas registradas aún.
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0', color: '#64748b', fontWeight: 700, textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Destino</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Reservas</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ingresos</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Promedio</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr key={row.key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: '#0f172a' }}>{row.name}</strong>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        background: 'rgba(14,165,233,0.1)', color: 'rgb(14,165,233)',
                        padding: '2px 10px', borderRadius: '20px', fontWeight: 700
                      }}>{row.count}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>
                      ${row.revenue} USD
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>
                      ${row.count > 0 ? Math.round(row.revenue / row.count) : 0} USD
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #e2e8f0', fontWeight: 800 }}>
                  <td style={{ padding: '12px', color: '#0f172a' }}>TOTAL</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#0ea5e9' }}>{totalCount}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981' }}>${totalRev} USD</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>
                    ${totalCount > 0 ? Math.round(totalRev / totalCount) : 0} USD
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Payment Method Breakdown */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#0f172a' }}>
            💳 Método de Pago
          </h4>
          {methodEntries.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sin datos aún.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {methodEntries.map(([method, count], i) => {
                const meta = METHOD_LABELS[method] || { icon: '💲', color: '#64748b' };
                const pct = Math.round((count / totalCount) * 100);
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                        {meta.icon} {method}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: '8px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '99px',
                        background: meta.color,
                        width: `${pct}%`,
                        transition: 'width 0.7s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Revenue per method */}
          {totalRev > 0 && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <h5 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Ingreso por Método
              </h5>
              {methodEntries.map(([method, count], i) => {
                const rev = bookings
                  .filter(b => (b.paymentMethod || 'Tarjeta') === method)
                  .reduce((s, b) => s + (b.amountPaid || 0), 0);
                const meta = METHOD_LABELS[method] || { icon: '💲', color: '#64748b' };
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.82rem', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#334155' }}>{meta.icon} {method}</span>
                    <strong style={{ color: meta.color }}>${rev} USD</strong>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
