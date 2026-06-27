import React, { useState, useEffect } from 'react';
import { getItems, saveItem, deleteItem } from '../../firebaseService';

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem',
  outline: 'none',
  width: '100%',
  background: 'white'
};

const labelStyle = {
  fontSize: '0.78rem',
  fontWeight: 700,
  color: '#64748b'
};

export default function PromotionsTab() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPromo, setEditPromo] = useState(null);

  const loadPromos = async () => {
    setLoading(true);
    try {
      const data = await getItems('promotions');
      setPromos(data || []);
    } catch (err) {
      console.error(err);
      alert('Error al cargar cupones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromos();
  }, []);

  const handleAddNew = () => {
    setEditPromo({
      code: '',
      type: 'percent', // 'percent' | 'fixed'
      value: 10,
      label: 'Descuento especial',
      active: true
    });
    setIsEditing(true);
  };

  const handleEdit = (promo) => {
    setEditPromo({ ...promo });
    setIsEditing(true);
  };

  const handleDelete = async (promo) => {
    if (window.confirm(`¿Seguro que deseas eliminar el cupón "${promo.code}"?`)) {
      const success = await deleteItem('promotions', promo.id, promo.docId);
      if (success) {
        alert('Cupón eliminado.');
        loadPromos();
      } else {
        alert('Error al eliminar cupón.');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editPromo.code || !editPromo.value) {
      alert('Por favor llene todos los campos requeridos.');
      return;
    }
    
    // Auto-uppercase code
    editPromo.code = editPromo.code.toUpperCase().trim();

    try {
      const res = await saveItem('promotions', editPromo);
      if (res.success) {
        alert('Cupón guardado.');
        setIsEditing(false);
        setEditPromo(null);
        loadPromos();
      }
    } catch (err) {
      console.error(err);
      alert('Error al guardar cupón.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
          🏷️ Gestión de Cupones y Promociones
        </h4>
        {!isEditing && (
          <button onClick={handleAddNew} style={{
            padding: '8px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white',
            border: 'none', cursor: 'pointer'
          }}>
            ➕ Crear Cupón
          </button>
        )}
      </div>

      {isEditing && editPromo && (
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1.5px solid #cbd5e1' }}>
          <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px' }}>
            {editPromo.id ? '📝 Editar Cupón' : '✨ Nuevo Cupón'}
          </h4>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Código del Cupón *</label>
                <input
                  type="text"
                  placeholder="Ej. VERANO20"
                  value={editPromo.code}
                  onChange={e => setEditPromo({ ...editPromo, code: e.target.value.toUpperCase() })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Tipo de Descuento *</label>
                <select
                  value={editPromo.type}
                  onChange={e => setEditPromo({ ...editPromo, type: e.target.value })}
                  style={inputStyle}
                >
                  <option value="percent">Porcentaje (%)</option>
                  <option value="fixed">Monto Fijo ($ USD)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Valor del Descuento *</label>
                <input
                  type="number"
                  value={editPromo.value}
                  onChange={e => setEditPromo({ ...editPromo, value: parseInt(e.target.value) || 0 })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Estado</label>
                <select
                  value={editPromo.active ? 'yes' : 'no'}
                  onChange={e => setEditPromo({ ...editPromo, active: e.target.value === 'yes' })}
                  style={inputStyle}
                >
                  <option value="yes">Activo</option>
                  <option value="no">Inactivo / Pausado</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Descripción / Leyenda</label>
                <input
                  type="text"
                  placeholder="Ej. 10% de descuento en la reserva"
                  value={editPromo.label}
                  onChange={e => setEditPromo({ ...editPromo, label: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{
                padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem',
                background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
                border: 'none', cursor: 'pointer'
              }}>
                Guardar Cupón
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setEditPromo(null); }} style={{
                padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem',
                background: 'transparent', color: '#64748b',
                border: '1.5px solid #cbd5e1', cursor: 'pointer'
              }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table list */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Cargando cupones...</div>
        ) : promos.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>No hay cupones creados aún.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={{ padding: '14px 18px' }}>Código</th>
                <th style={{ padding: '14px 18px' }}>Descripción</th>
                <th style={{ padding: '14px 18px' }}>Descuento</th>
                <th style={{ padding: '14px 18px', textAlign: 'center' }}>Estado</th>
                <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p, idx) => (
                <tr key={p.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <strong style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#0ea5e9' }}>{p.code}</strong>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#64748b' }}>{p.label}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>
                    {p.type === 'percent' ? `${p.value}%` : `$${p.value} USD`}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                      background: p.active ? '#ecfdf5' : '#fee2e2',
                      color: p.active ? '#047857' : '#b91c1c'
                    }}>
                      {p.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(p)} style={{
                        border: 'none', background: 'rgba(14, 165, 233, 0.08)', color: 'rgb(14, 165, 233)',
                        padding: '4px 10px', borderRadius: '6px', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer'
                      }}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(p)} style={{
                        border: 'none', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444',
                        padding: '4px 10px', borderRadius: '6px', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer'
                      }}>
                        Eliminar
                      </button>
                    </div>
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
