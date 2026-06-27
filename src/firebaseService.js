import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

// Local storage keys
const MOCK_STORAGE_KEY = "rodher_tours_bookings_mock";
const CONFIG_STORAGE_KEY = "rodher_tours_firebase_config";

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
      // Fallback on error
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
      // Fallback on error
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
