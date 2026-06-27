import React from 'react';

// Color map for destination badges
const DEST_COLORS = {
  tokyo: '#0ea5e9',
  china: '#f59e0b',
  bali: '#10b981',
  dubai: '#a855f7',
};

const DEST_NAMES = {
  tokyo: 'Tokio y Kioto',
  china: 'China',
  bali: 'Bali',
  dubai: 'Dubai',
};

export default function DashboardTab({ bookings }) {
  // ─── KPI Calculations ────────────────────────────────────────────
  const total       = bookings.length;
  const totalRev    = bookings.reduce((sum, b) => sum + (b.amountPaid || 0), 0);
  const newCount    = bookings.filter(b => b.status === 'new').length;
  const contacted   = bookings.filter(b => b.status === 'contacted').length;
  const cancelled   = bookings.filter(b => b.status === 'cancelled').length;

  // ─── Destination breakdown ────────────────────────────────────────
  const destMap = {};
  bookings.forEach(b => {
    const key = b.destinationId || 'other';
    if (!destMap[key]) destMap[key] = { count: 0, revenue: 0, name: b.destinationName || key };
    destMap[key].count++;
    destMap[key].revenue += b.amountPaid || 0;
  });
  const destEntries = Object.entries(destMap).sort((a, b) => b[1].count - a[1].count);
  const maxCount = Math.max(...destEntries.map(([, v]) => v.count), 1);

  // ─── Recent Bookings (last 5) ─────────────────────────────────────
  const recent = [...bookings].slice(0, 5);

  const kpis = [
    { label: 'Total Reservas',    value: total,             icon: 'fi fi-bs-book-alt', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
    { label: 'Ingresos Cobrados', value: `$${totalRev} USD`, icon: 'fi fi-rs-usd-circle', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { label: 'Sin Contactar',     value: newCount,           icon: 'fi fi-rr-bell', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    { label: 'Contactados',       value: contacted,          icon: 'fi fi-rr-check', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
    { label: 'Canceladas',        value: cancelled,          icon: 'fi fi-rr-cross-circle', color: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{
            padding: '20px',
            borderRadius: '14px',
            background: kpi.bg,
            border: `1.5px solid ${kpi.color}22`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
              <i className={kpi.icon} style={{ fontSize: '1.4rem', color: kpi.color, display: 'flex', alignItems: 'center' }}></i>
            </div>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{kpi.label}</span>
          </div>
        ))}
      </div>

      {/* Destination Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Bar chart */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '20px', color: '#0f172a' }}>
            📊 Reservas por Destino
          </h4>
          {total === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '24px 0' }}>
              Aún no hay reservas registradas.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {destEntries.map(([key, val]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      {DEST_NAMES[key] || val.name}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{val.count} res.</span>
                  </div>
                  <div style={{ height: '10px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      borderRadius: '99px',
                      background: DEST_COLORS[key] || '#6366f1',
                      width: `${(val.count / maxCount) * 100}%`,
                      transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Pie (SVG) */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#0f172a' }}>
            🧩 Estado de Reservas
          </h4>
          {total === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '24px 0' }}>
              Aún no hay reservas registradas.
            </p>
          ) : (
            <StatusDonut new_={newCount} contacted={contacted} cancelled={cancelled} total={total} />
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#0f172a' }}>
          🕐 Últimas Reservas
        </h4>
        {recent.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '12px 0' }}>
            Sin reservas aún.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recent.map(b => (
              <div key={b.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', background: 'white', borderRadius: '10px',
                border: '1px solid #e2e8f0', fontSize: '0.85rem'
              }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>{b.clientName}</strong>
                  <span style={{ color: '#64748b', marginLeft: '10px' }}>{b.destinationName?.split('(')[0]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong style={{ color: '#10b981' }}>${b.amountPaid} USD</strong>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Status Donut SVG ──────────────────────────────────────────────────────────
function StatusDonut({ new_, contacted, cancelled, total }) {
  const size = 160;
  const r = 58;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { value: new_,      color: '#f59e0b', label: 'Nuevas' },
    { value: contacted, color: '#10b981', label: 'Contactados' },
    { value: cancelled, color: '#ef4444', label: 'Canceladas' },
  ];

  let offset = 0;
  const arcs = segments.map(seg => {
    const dash = (seg.value / total) * circumference;
    const gap  = circumference - dash;
    const rotation = (offset / total) * 360 - 90;
    offset += seg.value;
    return { ...seg, dash, gap, rotation };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="20"
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={0}
            transform={`rotate(${arc.rotation} ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f172a">{total}</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="#64748b">reservas</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {arcs.map((arc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: arc.color, flexShrink: 0 }} />
            <span style={{ color: '#334155' }}>{arc.label}</span>
            <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto' }}>{arc.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    new:       { label: 'Nuevo',      bg: '#eff6ff', color: '#1d4ed8' },
    contacted: { label: 'Contactado', bg: '#ecfdf5', color: '#047857' },
    cancelled: { label: 'Cancelado',  bg: '#fff1f2', color: '#be123c' },
  };
  const s = map[status] || map.new;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '20px',
      fontSize: '0.72rem', fontWeight: 700,
      background: s.bg, color: s.color
    }}>
      {s.label}
    </span>
  );
}
