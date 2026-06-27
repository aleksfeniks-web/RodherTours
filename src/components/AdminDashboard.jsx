import React, { useState, useEffect } from 'react';
import {
  getBookings,
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  isFirebaseConnected
} from '../firebaseService';
import DashboardTab from './admin/DashboardTab';
import SalesTab     from './admin/SalesTab';
import UsersTab     from './admin/UsersTab';
import ReservationsTab from './admin/ReservationsTab';
import InventoryTab from './admin/InventoryTab';
import PromotionsTab from './admin/PromotionsTab';

// ─── Firebase Config Form ─────────────────────────────────────────────────────
function FirebaseConfigTab() {
  const [apiKey, setApiKey]                     = useState('');
  const [authDomain, setAuthDomain]             = useState('');
  const [projectId, setProjectId]               = useState('');
  const [storageBucket, setStorageBucket]       = useState('');
  const [messagingSenderId, setMessagingSenderId] = useState('');
  const [appId, setAppId]                       = useState('');

  useEffect(() => {
    const saved = getSavedFirebaseConfig();
    if (saved) {
      setApiKey(saved.apiKey || '');
      setAuthDomain(saved.authDomain || '');
      setProjectId(saved.projectId || '');
      setStorageBucket(saved.storageBucket || '');
      setMessagingSenderId(saved.messagingSenderId || '');
      setAppId(saved.appId || '');
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!apiKey || !projectId || !appId) {
      alert('API Key, Project ID y App ID son campos mínimos obligatorios.');
      return;
    }
    saveFirebaseConfig({ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId });
    alert('Configuración guardada. Recargando...');
  };

  const handleClear = () => {
    if (window.confirm('¿Eliminar la configuración de Firebase y volver a modo LocalStorage?')) {
      clearFirebaseConfig();
    }
  };

  return (
    <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Integrar Firebase Firestore</h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6 }}>
          Conecta la app a tu propia base de datos Firebase. Sin configuración, los datos se guardan en <strong>LocalStorage</strong> (solo en este dispositivo).
        </p>
      </div>

      {/* Status indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
        borderRadius: '10px',
        background: isFirebaseConnected() ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
        border: `1.5px solid ${isFirebaseConnected() ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
        fontSize: '0.85rem', fontWeight: 600,
        color: isFirebaseConnected() ? '#047857' : '#92400e',
      }}>
        <span style={{
          width: '9px', height: '9px', borderRadius: '50%',
          background: isFirebaseConnected() ? '#10b981' : '#f59e0b', flexShrink: 0
        }} />
        {isFirebaseConnected()
          ? '✓ Conectado a Firebase Firestore — los datos se sincronizan en la nube.'
          : '⚠️ Modo LocalStorage — configura Firebase para guardar datos en la nube.'}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'API Key *',    val: apiKey,    set: setApiKey },
            { label: 'Project ID *', val: projectId, set: setProjectId },
            { label: 'Auth Domain',  val: authDomain, set: setAuthDomain },
            { label: 'Storage Bucket', val: storageBucket, set: setStorageBucket },
            { label: 'Messaging Sender ID', val: messagingSenderId, set: setMessagingSenderId },
            { label: 'App ID *',     val: appId,     set: setAppId },
          ].map(({ label, val, set }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>{label}</label>
              <input
                type="text"
                value={val}
                onChange={e => set(e.target.value)}
                style={{
                  padding: '10px 14px', borderRadius: '8px',
                  border: '1.5px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', width: '100%'
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button type="submit" style={{
            padding: '11px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white',
            border: 'none', cursor: 'pointer'
          }}>
            Guardar y Conectar
          </button>
          {getSavedFirebaseConfig() && (
            <button type="button" onClick={handleClear} style={{
              padding: '11px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
              background: 'transparent', color: '#ef4444',
              border: '1.5px solid #ef4444', cursor: 'pointer'
            }}>
              Eliminar Conexión
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword]               = useState('');
  const [bookings, setBookings]               = useState([]);
  const [loading, setLoading]                 = useState(false);
  const [activeTab, setActiveTab]             = useState('dashboard');

  const ADMIN_PASSWORD = 'admin2026';

  // Load bookings when authenticated
  useEffect(() => {
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (e) {
      console.error(e);
      alert('Error al cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta. Usa 'admin2026' para la demo.");
    }
  };

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(10,25,47,0.7)',
        backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center',
        alignItems: 'center', zIndex: 2000
      }}>
        <div className="glass" style={{
          padding: '40px 36px', borderRadius: '20px', width: '100%', maxWidth: '400px',
          textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          color: '#0f172a', border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg,#0ea5e9,#0284c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <i className="fi fi-rs-lock" style={{ color: 'white', fontSize: '1.4rem', display: 'flex', alignItems: 'center' }}></i>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>Acceso Administrador</h3>
          <p style={{ color: '#64748b', fontSize: '0.84rem', marginBottom: '24px' }}>
            Ingresa la clave para acceder al panel de control de RodherTours.
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Contraseña Administrativa</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1',
                  fontSize: '1rem', outline: 'none', textAlign: 'center', letterSpacing: '4px'
                }}
              />
              <span style={{ fontSize: '0.73rem', color: '#94a3b8', textAlign: 'center' }}>
                💡 Demo: usa <strong style={{ color: '#0ea5e9' }}>admin2026</strong>
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <button type="button" onClick={onClose} style={{
                padding: '12px', borderRadius: '10px', fontWeight: 700,
                background: 'rgba(14,165,233,0.08)', color: '#0ea5e9',
                border: '1.5px solid rgba(14,165,233,0.2)', cursor: 'pointer', fontSize: '0.9rem'
              }}>
                Cancelar
              </button>
              <button type="submit" style={{
                padding: '12px', borderRadius: '10px', fontWeight: 700,
                background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: 'white',
                border: 'none', cursor: 'pointer', fontSize: '0.9rem'
              }}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── Tab definitions ────────────────────────────────────────────────────────
  const TABS = [
    { key: 'dashboard',    label: 'Dashboard',    icon: 'fi fi-rs-chart-pie' },
    { key: 'sales',        label: 'Ventas',       icon: 'fi fi-rs-usd-circle' },
    { key: 'users',        label: 'Usuarios',     icon: 'fi fi-rs-users' },
    { key: 'reservations', label: 'Reservas',     icon: 'fi fi-bs-book-alt' },
    { key: 'inventory',    label: 'Inventario',   icon: 'fi fi-rs-box' },
    { key: 'promotions',   label: 'Promociones',  icon: 'fi fi-rs-ticket' },
    { key: 'firebase',     label: 'Firebase',     icon: 'fi fi-rs-settings' },
  ];

  // ─── Dashboard Panel ────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(10,25,47,0.55)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 2000, padding: '20px'
    }}>
      <div style={{
        width: '100%', maxWidth: '1100px', height: '92vh',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', flexDirection: 'column',
        background: '#ffffff', color: '#0f172a'
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: '18px 28px',
          background: 'linear-gradient(135deg, #0a192f 0%, #1e293b 100%)',
          color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              🗺️ RodherTours — Panel de Control
            </h2>
            <span style={{ fontSize: '0.78rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: isFirebaseConnected() ? '#10b981' : '#f59e0b'
              }} />
              {isFirebaseConnected() ? 'Firebase Firestore conectado' : 'Modo LocalStorage'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={loadBookings} disabled={loading} style={{
              padding: '7px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem',
              background: 'rgba(255,255,255,0.1)', color: 'white',
              border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer'
            }}>
              {loading ? '⏳' : '🔄'} Actualizar
            </button>
            <button onClick={onClose} style={{
              padding: '7px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem',
              background: 'rgba(239,68,68,0.15)', color: '#fca5a5',
              border: '1px solid rgba(239,68,68,0.3)', cursor: 'pointer'
            }}>
              Salir ✕
            </button>
          </div>
        </div>

        {/* ── Tab Nav ── */}
        <div style={{
          display: 'flex', gap: '0', background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0', padding: '0 24px',
          flexShrink: 0, overflowX: 'auto'
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '14px 20px', border: 'none', background: 'transparent',
                borderBottom: activeTab === tab.key ? '3px solid #0ea5e9' : '3px solid transparent',
                color: activeTab === tab.key ? '#0ea5e9' : '#64748b',
                fontWeight: activeTab === tab.key ? 700 : 500,
                cursor: 'pointer', fontSize: '0.88rem', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'color 0.2s, border-color 0.2s'
              }}
            >
              <i className={tab.icon} style={{ fontSize: '0.92rem', display: 'flex', alignItems: 'center' }}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#64748b' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
                <p style={{ fontSize: '0.9rem' }}>Cargando información...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard'    && <DashboardTab bookings={bookings} />}
              {activeTab === 'sales'        && <SalesTab     bookings={bookings} />}
              {activeTab === 'users'        && <UsersTab     bookings={bookings} />}
              {activeTab === 'reservations' && (
                <ReservationsTab
                  bookings={bookings}
                  onBookingsChange={setBookings}
                />
              )}
              {activeTab === 'inventory'    && <InventoryTab />}
              {activeTab === 'promotions'   && <PromotionsTab />}
              {activeTab === 'firebase'     && <FirebaseConfigTab />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
