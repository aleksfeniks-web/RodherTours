import { initializeApp, getApps } from "firebase/app";
import { 
  getFirestore, collection, addDoc, getDocs, doc, 
  updateDoc, deleteDoc, query, orderBy, setDoc 
} from "firebase/firestore";

// Local storage keys
const MOCK_STORAGE_KEY = "rodher_tours_bookings_mock";
const CONFIG_STORAGE_KEY = "rodher_tours_firebase_config";

// Inventory storage keys
const INVENTORY_KEYS = {
  packages: "rodher_tours_packages_mock",
  flights: "rodher_tours_flights_mock",
  hotels: "rodher_tours_hotels_mock",
  tours: "rodher_tours_tours_mock",
  promotions: "rodher_tours_promotions_mock",
};

// Default static data for populating local storage initially
const DEFAULT_PACKAGES = [
  {
    id: 'tokyo',
    name: 'Tokio y Kioto Mágico',
    country: 'Japón 🇯🇵',
    image: '/images/tokyo.png',
    tag: 'Top Rated',
    duration: '10 Días / 9 Noches',
    highlights: 'Monte Fuji • Shibuya Crossing • Templos de Asakusa • Tren Bala',
    price: 1599,
    downPayment: 100,
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

const DEFAULT_FLIGHTS = [
  { id: 'F1', origin: 'CDMX (MEX)', destination: 'Tokio (NRT)', airline: 'Aeroméxico', price: 950, availability: 12 },
  { id: 'F2', origin: 'CDMX (MEX)', destination: 'Pekín (PEK)', airline: 'Air China', price: 1100, availability: 8 },
  { id: 'F3', origin: 'CDMX (MEX)', destination: 'Bali (DPS)', airline: 'ANA', price: 1250, availability: 15 },
  { id: 'F4', origin: 'CDMX (MEX)', destination: 'Dubai (DXB)', airline: 'Emirates', price: 1400, availability: 10 },
];

const DEFAULT_HOTELS = [
  { id: 'H1', name: 'Shibuya Grand Hotel', destination: 'Tokio, Japón', stars: 5, rate: 180 },
  { id: 'H2', name: 'Beijing Palace Resort', destination: 'Pekín, China', stars: 4, rate: 120 },
  { id: 'H3', name: 'Ubud Forest Villas', destination: 'Ubud, Bali', stars: 5, rate: 95 },
  { id: 'H4', name: 'Burj Al Arab Luxury Suite', destination: 'Dubai, EAU', stars: 5, rate: 450 },
];

const DEFAULT_TOURS = [
  { id: 'T1', name: 'Mt. Fuji Day Tour & Hakone', destination: 'Tokio, Japón', duration: '1 Día', price: 110 },
  { id: 'T2', name: 'Great Wall Hiking Expedition', destination: 'Pekín, China', duration: '1 Día', price: 85 },
  { id: 'T3', name: 'Sacred Monkey Forest & Waterfall Tour', destination: 'Bali, Indonesia', duration: '1 Día', price: 45 },
  { id: 'T4', name: 'Desert Safari & Premium BBQ Dinner', destination: 'Dubai, EAU', duration: '1 Día', price: 75 },
];

const DEFAULT_PROMOTIONS = [
  { id: 'P1', code: 'RODHER2026', type: 'percent', value: 10, label: '10% de descuento en reserva', active: true },
  { id: 'P2', code: 'BIENVENIDO50', type: 'fixed', value: 50, label: '$50 USD de descuento directo', active: true },
];

// Helper to get item from local storage or pre-populate defaults
const getMockData = (type) => {
  try {
    const data = localStorage.getItem(INVENTORY_KEYS[type]);
    if (data) return JSON.parse(data);

    // Populate defaults
    let defaults = [];
    if (type === 'packages') defaults = DEFAULT_PACKAGES;
    else if (type === 'flights') defaults = DEFAULT_FLIGHTS;
    else if (type === 'hotels') defaults = DEFAULT_HOTELS;
    else if (type === 'tours') defaults = DEFAULT_TOURS;
    else if (type === 'promotions') defaults = DEFAULT_PROMOTIONS;

    localStorage.setItem(INVENTORY_KEYS[type], JSON.stringify(defaults));
    return defaults;
  } catch (e) {
    console.error(`Error reading ${type} from localStorage:`, e);
    return [];
  }
};

// Get saved Firebase configuration from LocalStorage (allows configuration at runtime)
export const getSavedFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Error reading Firebase config from localStorage:", e);
    return null;
  }
};

// Save Firebase configuration to LocalStorage
export const saveFirebaseConfig = (config) => {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  window.location.reload(); // Reload to apply the configuration
};

// Clear Firebase configuration
export const clearFirebaseConfig = () => {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  window.location.reload();
};

// Initialize Firebase dynamically
let db = null;
let firebaseInitialized = false;

const config = getSavedFirebaseConfig();

if (config && config.apiKey && config.projectId) {
  try {
    // Only initialize if not already initialized
    const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
    db = getFirestore(app);
    firebaseInitialized = true;
    console.log("Firebase initialized successfully with runtime config.");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

export const isFirebaseConnected = () => firebaseInitialized;

// Generate a random unique booking folio
export const generateFolio = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let folio = "RDH-";
  for (let i = 0; i < 6; i++) {
    folio += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return folio;
};

// Save a booking
export const saveBooking = async (bookingData) => {
  const folio = generateFolio();
  const newBooking = {
    ...bookingData,
    id: folio,
    createdAt: new Date().toISOString(),
    status: "new", // 'new' | 'contacted' | 'cancelled'
    paymentStatus: "paid", // Booking represents a completed down payment
  };

  if (firebaseInitialized && db) {
    try {
      const colRef = collection(db, "bookings");
      await addDoc(colRef, newBooking);
      return { success: true, folio, firebase: true };
    } catch (error) {
      console.error("Error saving booking to Firestore, falling back to LocalStorage:", error);
    }
  }

  // LocalStorage Mock fallback
  try {
    const existingBookings = getMockBookings();
    existingBookings.unshift(newBooking);
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(existingBookings));
    return { success: true, folio, firebase: false };
  } catch (e) {
    console.error("Error saving booking to LocalStorage:", e);
    throw new Error("No se pudo guardar la reserva. Intente de nuevo.");
  }
};

// Get all bookings
export const getBookings = async () => {
  if (firebaseInitialized && db) {
    try {
      const colRef = collection(db, "bookings");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const bookingsList = [];
      snapshot.forEach((doc) => {
        bookingsList.push({ docId: doc.id, ...doc.data() });
      });
      return bookingsList;
    } catch (error) {
      console.error("Error fetching bookings from Firestore, reading from LocalStorage fallback:", error);
    }
  }

  // LocalStorage Mock fallback
  return getMockBookings();
};

// Helper for local bookings retrieval
const getMockBookings = () => {
  try {
    const data = localStorage.getItem(MOCK_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading bookings from localStorage:", e);
    return [];
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, newStatus, docId = null) => {
  if (firebaseInitialized && db && docId) {
    try {
      const docRef = doc(db, "bookings", docId);
      await updateDoc(docRef, { status: newStatus });
      return true;
    } catch (error) {
      console.error("Error updating booking status in Firestore:", error);
    }
  }

  // LocalStorage Mock fallback
  try {
    const bookings = getMockBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      bookings[index].status = newStatus;
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(bookings));
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error updating booking in LocalStorage:", e);
    return false;
  }
};

// ─── Inventory CRUD APIs ──────────────────────────────────────────
export const getItems = async (type) => {
  if (firebaseInitialized && db) {
    try {
      const colRef = collection(db, type);
      const snapshot = await getDocs(colRef);
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ docId: doc.id, ...doc.data() });
      });
      if (items.length > 0) return items;
    } catch (error) {
      console.error(`Error fetching ${type} from Firestore:`, error);
    }
  }
  return getMockData(type);
};

export const saveItem = async (type, itemData) => {
  const itemWithId = {
    ...itemData,
    id: itemData.id || `ITEM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    updatedAt: new Date().toISOString()
  };

  if (firebaseInitialized && db) {
    try {
      const colRef = collection(db, type);
      if (itemData.docId) {
        const docRef = doc(db, type, itemData.docId);
        const { docId, ...dataToSave } = itemWithId;
        await setDoc(docRef, dataToSave, { merge: true });
        return { success: true, firebase: true, item: itemWithId };
      } else {
        const docRef = await addDoc(colRef, itemWithId);
        return { success: true, firebase: true, item: { ...itemWithId, docId: docRef.id } };
      }
    } catch (error) {
      console.error(`Error saving ${type} to Firestore, saving locally:`, error);
    }
  }

  // LocalStorage Mock fallback
  try {
    const items = getMockData(type);
    if (itemData.id) {
      const idx = items.findIndex(i => i.id === itemData.id);
      if (idx !== -1) {
        items[idx] = itemWithId;
      } else {
        items.unshift(itemWithId);
      }
    } else {
      items.unshift(itemWithId);
    }
    localStorage.setItem(INVENTORY_KEYS[type], JSON.stringify(items));
    return { success: true, firebase: false, item: itemWithId };
  } catch (e) {
    console.error(`Error saving ${type} to LocalStorage:`, e);
    throw new Error("No se pudo guardar el ítem.");
  }
};

export const deleteItem = async (type, itemId, docId = null) => {
  if (firebaseInitialized && db && docId) {
    try {
      const docRef = doc(db, type, docId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${type} from Firestore:`, error);
    }
  }

  // LocalStorage Mock fallback
  try {
    const items = getMockData(type);
    const filtered = items.filter(i => i.id !== itemId);
    localStorage.setItem(INVENTORY_KEYS[type], JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error(`Error deleting ${type} from LocalStorage:`, e);
    return false;
  }
};
