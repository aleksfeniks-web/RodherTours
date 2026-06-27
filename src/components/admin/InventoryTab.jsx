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

export default function InventoryTab() {
  const [activeSubTab, setActiveSubTab] = useState('packages'); // 'packages' | 'flights' | 'hotels' | 'tours' | 'cars'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Load items based on active sub tab
  const loadInventory = async () => {
    setLoading(true);
    try {
      const data = await getItems(activeSubTab);
      setItems(data || []);
    } catch (err) {
      console.error(err);
      alert('Error al cargar inventario.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [activeSubTab]);

  const handleAddNew = () => {
    let initialItem = {};
    if (activeSubTab === 'packages') {
      initialItem = { name: '', country: '', image: '/images/tokyo.png', tag: 'Nuevo', duration: '5 Días', highlights: '', price: 1000, downPayment: 100, rating: 5, reviews: 1, badgeColor: '#0ea5e9' };
    } else if (activeSubTab === 'flights') {
      initialItem = { origin: '', destination: '', airline: '', price: 500, availability: 10 };
    } else if (activeSubTab === 'hotels') {
      initialItem = { name: '', destination: '', stars: 5, rate: 100 };
    } else if (activeSubTab === 'tours') {
      initialItem = { name: '', destination: '', duration: '1 Día', price: 50 };
    } else if (activeSubTab === 'cars') {
      initialItem = { name: '', type: 'Sedán', transmission: 'Automático', price: 45, image: '/images/car_card.png', availability: 5 };
    }
    setEditItem(initialItem);
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setEditItem({ ...item });
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('¿Está seguro de que desea eliminar este ítem del inventario?')) {
      const success = await deleteItem(activeSubTab, item.id, item.docId);
      if (success) {
        alert('Ítem eliminado correctamente.');
        loadInventory();
        // Dispatch custom event to notify Destinations catalog to reload
        window.dispatchEvent(new Event('inventoryUpdated'));
      } else {
        alert('Error al eliminar ítem.');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Basic validations
      if (activeSubTab === 'packages' && (!editItem.name || !editItem.country || !editItem.image)) {
        alert('Por favor complete todos los datos.');
        return;
      }
      
      const res = await saveItem(activeSubTab, editItem);
      if (res.success) {
        alert('Ítem guardado con éxito.');
        setIsEditing(false);
        setEditItem(null);
        loadInventory();
        // Dispatch custom event to notify Destinations catalog to reload
        window.dispatchEvent(new Event('inventoryUpdated'));
      }
    } catch (err) {
      console.error(err);
      alert('Error al guardar ítem.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Sub Tabs Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          {[
            { id: 'packages', label: '🏖️ Paquetes / Destinos' },
            { id: 'flights', label: '✈️ Vuelos' },
            { id: 'hotels', label: '🏨 Hoteles' },
            { id: 'tours', label: '🗺️ Tours' },
            { id: 'cars', label: '🚗 Autos' },
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => { setActiveSubTab(sub.id); setIsEditing(false); }}
              style={{
                padding: '6px 14px',
                border: 'none',
                background: activeSubTab === sub.id ? 'white' : 'transparent',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                color: activeSubTab === sub.id ? 'rgb(14, 165, 233)' : '#64748b',
                boxShadow: activeSubTab === sub.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {!isEditing && (
          <button onClick={handleAddNew} style={{
            padding: '8px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            ➕ Agregar Nuevo
          </button>
        )}
      </div>

      {/* Editing / Creation Form panel */}
      {isEditing && editItem && (
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '14px', border: '1.5px solid #cbd5e1' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '16px', color: '#0f172a' }}>
            {editItem.id ? '📝 Editar Item' : '✨ Crear Nuevo Item'} ({activeSubTab})
          </h4>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Packages Specific Fields */}
            {activeSubTab === 'packages' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Nombre del Destino *</label>
                  <input type="text" value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>País y Bandera *</label>
                  <input type="text" placeholder="Ej. Japón 🇯🇵" value={editItem.country} onChange={e => setEditItem({...editItem, country: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Ruta de Imagen *</label>
                  <input type="text" placeholder="Ej. /images/tokyo.png" value={editItem.image} onChange={e => setEditItem({...editItem, image: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Duración</label>
                  <input type="text" placeholder="Ej. 10 Días / 9 Noches" value={editItem.duration} onChange={e => setEditItem({...editItem, duration: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Costo Total (USD) *</label>
                  <input type="number" value={editItem.price} onChange={e => setEditItem({...editItem, price: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Monto de Apartado (USD) *</label>
                  <input type="number" value={editItem.downPayment} onChange={e => setEditItem({...editItem, downPayment: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Etiqueta / Tag</label>
                  <input type="text" placeholder="Ej. Best Seller, Top Rated" value={editItem.tag} onChange={e => setEditItem({...editItem, tag: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Color de Etiqueta (Hex)</label>
                  <input type="text" placeholder="Ej. #0ea5e9" value={editItem.badgeColor} onChange={e => setEditItem({...editItem, badgeColor: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Puntos Clave / Destacados (Separados por •)</label>
                  <input type="text" placeholder="Ej. Monte Fuji • Shibuya Crossing • Tren Bala" value={editItem.highlights} onChange={e => setEditItem({...editItem, highlights: e.target.value})} style={inputStyle} />
                </div>
              </div>
            )}

            {/* Flights Specific Fields */}
            {activeSubTab === 'flights' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Origen *</label>
                  <input type="text" placeholder="Ej. CDMX (MEX)" value={editItem.origin} onChange={e => setEditItem({...editItem, origin: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Destino *</label>
                  <input type="text" placeholder="Ej. Tokio (NRT)" value={editItem.destination} onChange={e => setEditItem({...editItem, destination: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Aerolínea *</label>
                  <input type="text" value={editItem.airline} onChange={e => setEditItem({...editItem, airline: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Precio (USD) *</label>
                  <input type="number" value={editItem.price} onChange={e => setEditItem({...editItem, price: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Disponibilidad (Lugares) *</label>
                  <input type="number" value={editItem.availability} onChange={e => setEditItem({...editItem, availability: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
              </div>
            )}

            {/* Hotels Specific Fields */}
            {activeSubTab === 'hotels' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Nombre del Hotel *</label>
                  <input type="text" value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Destino / Ciudad *</label>
                  <input type="text" value={editItem.destination} onChange={e => setEditItem({...editItem, destination: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Estrellas *</label>
                  <input type="number" min="1" max="5" value={editItem.stars} onChange={e => setEditItem({...editItem, stars: parseInt(e.target.value) || 5})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Tarifa por Noche (USD) *</label>
                  <input type="number" value={editItem.rate} onChange={e => setEditItem({...editItem, rate: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
              </div>
            )}

            {/* Tours Specific Fields */}
            {activeSubTab === 'tours' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Nombre de la Actividad *</label>
                  <input type="text" value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Destino / Ciudad *</label>
                  <input type="text" value={editItem.destination} onChange={e => setEditItem({...editItem, destination: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Duración</label>
                  <input type="text" placeholder="Ej. 1 Día, 4 Horas" value={editItem.duration} onChange={e => setEditItem({...editItem, duration: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Costo por Persona (USD) *</label>
                  <input type="number" value={editItem.price} onChange={e => setEditItem({...editItem, price: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
              </div>
            )}

            {/* Cars Specific Fields */}
            {activeSubTab === 'cars' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Modelo / Nombre *</label>
                  <input type="text" value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Tipo de Auto *</label>
                  <input type="text" placeholder="Ej. Sedán, SUV, Eléctrico" value={editItem.type} onChange={e => setEditItem({...editItem, type: e.target.value})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Transmisión *</label>
                  <select value={editItem.transmission} onChange={e => setEditItem({...editItem, transmission: e.target.value})} style={inputStyle} required>
                    <option value="Automático">Automático</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Tarifa por Día (USD) *</label>
                  <input type="number" value={editItem.price} onChange={e => setEditItem({...editItem, price: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Disponibilidad (Autos) *</label>
                  <input type="number" value={editItem.availability} onChange={e => setEditItem({...editItem, availability: parseInt(e.target.value) || 0})} style={inputStyle} required />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="submit" style={{
                padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem',
                background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
                border: 'none', cursor: 'pointer'
              }}>
                Guardar Item
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setEditItem(null); }} style={{
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

      {/* Inventory list table */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Cargando inventario...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>No hay registros en esta categoría.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                {activeSubTab === 'packages' && (
                  <>
                    <th style={{ padding: '14px 18px' }}>Paquete</th>
                    <th style={{ padding: '14px 18px' }}>País</th>
                    <th style={{ padding: '14px 18px' }}>Duración</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Total</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Apartado</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
                  </>
                )}
                {activeSubTab === 'flights' && (
                  <>
                    <th style={{ padding: '14px 18px' }}>Origen</th>
                    <th style={{ padding: '14px 18px' }}>Destino</th>
                    <th style={{ padding: '14px 18px' }}>Aerolínea</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Precio</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Dispo.</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
                  </>
                )}
                {activeSubTab === 'hotels' && (
                  <>
                    <th style={{ padding: '14px 18px' }}>Nombre</th>
                    <th style={{ padding: '14px 18px' }}>Destino</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Estrellas</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Tarifa/Noche</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
                  </>
                )}
                {activeSubTab === 'tours' && (
                  <>
                    <th style={{ padding: '14px 18px' }}>Nombre</th>
                    <th style={{ padding: '14px 18px' }}>Destino</th>
                    <th style={{ padding: '14px 18px' }}>Duración</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Precio</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
                  </>
                )}
                {activeSubTab === 'cars' && (
                  <>
                    <th style={{ padding: '14px 18px' }}>Nombre / Modelo</th>
                    <th style={{ padding: '14px 18px' }}>Tipo</th>
                    <th style={{ padding: '14px 18px' }}>Transmisión</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Tarifa/Día</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Dispo.</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Acciones</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {activeSubTab === 'packages' && (
                    <>
                      <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.country}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.duration}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700 }}>${item.price} USD</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>${item.downPayment} USD</td>
                    </>
                  )}
                  {activeSubTab === 'flights' && (
                    <>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{item.origin}</td>
                      <td style={{ padding: '14px 18px' }}>{item.destination}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.airline}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700 }}>${item.price} USD</td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>{item.availability}</td>
                    </>
                  )}
                  {activeSubTab === 'hotels' && (
                    <>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.destination}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>{'★'.repeat(item.stars)}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700 }}>${item.rate} USD</td>
                    </>
                  )}
                  {activeSubTab === 'tours' && (
                    <>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.destination}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.duration}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700 }}>${item.price} USD</td>
                    </>
                  )}
                  {activeSubTab === 'cars' && (
                    <>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.type}</td>
                      <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.transmission}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700 }}>${item.price} USD</td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>{item.availability}</td>
                    </>
                  )}
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleEdit(item)} style={{
                        border: 'none', background: 'rgba(14, 165, 233, 0.08)', color: 'rgb(14, 165, 233)',
                        padding: '4px 10px', borderRadius: '6px', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer'
                      }}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(item)} style={{
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
