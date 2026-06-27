import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('tours');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Navbar with handler to open Admin panel */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main content elements */}
      <main style={{ flexGrow: 1 }}>
        <Hero activeTab={activeCategory} setActiveTab={setActiveCategory} />
        <Destinations 
          activeTab={activeCategory} 
          setActiveTab={setActiveCategory} 
          onSelectDestination={(pkg) => setSelectedDestination(pkg)} 
        />
        <Features />
      </main>

      {/* Footer with handler to open Admin panel */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* MODALS */}
      
      {/* Booking and payment modal */}
      {selectedDestination && (
        <BookingModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}

      {/* Admin dashboard and WhatsApp linker */}
      {isAdminOpen && (
        <AdminDashboard 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
}
