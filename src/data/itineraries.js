// Static daily itineraries mapping for preloaded packages
const STATIC_ITINERARIES = {
  tokyo: {
    title: 'Itinerario: Tokio y Kioto Mágico',
    days: [
      {
        day: 1,
        date: 'Día 1: Llegada y Registro',
        mapQuery: 'Shibuya Grand Hotel, Tokyo, Japan',
        events: [
          { time: '08:30 AM', title: 'Vuelo de Llegada', desc: 'Arribo al Aeropuerto de Haneda (HND). Traslado privado al hotel en vehículo premium.', icon: 'flight', color: '#f97316' },
          { time: '11:00 AM', title: 'Check-in Shibuya Grand Hotel', desc: 'Registro prioritario en tu hotel 5 estrellas en el corazón de Shibuya. Tiempo libre para descansar del vuelo.', icon: 'hotel', color: '#0ea5e9' },
          { time: '07:30 PM', title: 'Cena de Sushi Tradicional', desc: 'Cena de bienvenida en un restaurante exclusivo de sushi tradicional en el distrito de Roppongi.', icon: 'food', color: '#8b5cf6' }
        ]
      },
      {
        day: 2,
        date: 'Día 2: Tokio Moderno',
        mapQuery: 'Shibuya Crossing, Tokyo, Japan',
        events: [
          { time: '09:00 AM', title: 'Mirador Shibuya Sky', desc: 'Sube al mirador abierto más espectacular de la ciudad con vistas de 360 grados y sesión de fotos.', icon: 'sightseeing', color: '#10b981' },
          { time: '01:30 PM', title: 'Comida en Harajuku', desc: 'Almuerzo libre en la vibrante calle Takeshita, famosa por sus crepas gigantes y boutiques vanguardistas.', icon: 'food', color: '#ec4899' },
          { time: '03:30 PM', title: 'Santuario Meiji Jingu', desc: 'Caminata pacífica a través del bosque sagrado hasta uno de los templos sintoístas más emblemáticos.', icon: 'sightseeing', color: '#10b981' },
          { time: '06:00 PM', title: 'Compras en Akihabara', desc: 'Recorrido por las tiendas de tecnología, manga y cultura otaku en la ciudad eléctrica.', icon: 'shopping', color: '#f59e0b' }
        ]
      },
      {
        day: 3,
        date: 'Día 3: Monte Fuji y Hakone',
        mapQuery: 'Mount Fuji, Japan',
        events: [
          { time: '08:00 AM', title: 'Salida hacia Monte Fuji', desc: 'Traslado en autocar privado de lujo hacia la quinta estación del Monte Fuji para vistas panorámicas.', icon: 'transport', color: '#14b8a6' },
          { time: '12:00 PM', title: 'Crucero por el Lago Ashi', desc: 'Paseo en barco pirata con vistas espectaculares del torii flotante del santuario de Hakone.', icon: 'sightseeing', color: '#10b981' },
          { time: '02:00 PM', title: 'Comida Tradicional Katsu', desc: 'Almuerzo gourmet de especialidad local Tonkatsu incluido con vista al lago.', icon: 'food', color: '#8b5cf6' },
          { time: '06:30 PM', title: 'Regreso y Tarde Libre', desc: 'Arribo a Tokio. Tarde de descanso o exploración por tu cuenta.', icon: 'hotel', color: '#0ea5e9' }
        ]
      }
    ]
  },
  china: {
    title: 'Itinerario: Maravillas de China',
    days: [
      {
        day: 1,
        date: 'Día 1: Llegada a Pekín',
        mapQuery: 'Beijing Palace Resort, Beijing, China',
        events: [
          { time: '10:00 AM', title: 'Vuelo de Llegada', desc: 'Arribo al Aeropuerto de Pekín Capital. Recibimiento por tu guía y traslado al hotel.', icon: 'flight', color: '#f97316' },
          { time: '01:00 PM', title: 'Check-in Beijing Palace Resort', desc: 'Registro y descanso en tu habitación suite de diseño tradicional chino moderno.', icon: 'hotel', color: '#0ea5e9' },
          { time: '08:00 PM', title: 'Cena de Pato Laqueado', desc: 'Cena de degustación del mundialmente famoso Pato Laqueado de Pekín en restaurante galardonado.', icon: 'food', color: '#8b5cf6' }
        ]
      },
      {
        day: 2,
        date: 'Día 2: La Gran Muralla',
        mapQuery: 'Mutianyu Great Wall, Beijing, China',
        events: [
          { time: '08:00 AM', title: 'Senderismo en Mutianyu', desc: 'Excursión guiada por la sección de Mutianyu de la Gran Muralla. Incluye boleto de teleférico de subida y tobogán de bajada.', icon: 'sightseeing', color: '#10b981' },
          { time: '01:00 PM', title: 'Almuerzo Rústico Local', desc: 'Almuerzo campestre con ingredientes frescos cultivados al pie de la muralla.', icon: 'food', color: '#ec4899' },
          { time: '04:00 PM', title: 'Nido de Pájaro Olímpico', desc: 'Parada fotográfica en las icónicas estructuras del Estadio Olímpico de Pekín.', icon: 'sightseeing', color: '#10b981' }
        ]
      },
      {
        day: 3,
        date: 'Día 3: Ciudad Prohibida',
        mapQuery: 'Forbidden City, Beijing, China',
        events: [
          { time: '09:00 AM', title: 'Palacio Imperial', desc: 'Recorrido histórico por los patios y pabellones de la Ciudad Prohibida y la Plaza Tiananmen.', icon: 'sightseeing', color: '#10b981' },
          { time: '02:30 PM', title: 'Ceremonia del Té', desc: 'Experiencia cultural de cata e introducción a la dinastía del té en el mercado histórico de Qianmen.', icon: 'shopping', color: '#f59e0b' },
          { time: '05:00 PM', title: 'Tarde Libre de Compras', desc: 'Tiempo para recorrer mercados locales guiado por sugerencias de tu asesor personal.', icon: 'shopping', color: '#f59e0b' }
        ]
      }
    ]
  },
  bali: {
    title: 'Itinerario: Bali Paraíso Tropical',
    days: [
      {
        day: 1,
        date: 'Día 1: Llegada al Paraíso',
        mapQuery: 'Ubud Forest Villas, Bali, Indonesia',
        events: [
          { time: '11:30 AM', title: 'Llegada a Bali', desc: 'Arribo a Denpasar (DPS). Trámite express de visa y traslado privado en auto con aire acondicionado.', icon: 'flight', color: '#f97316' },
          { time: '02:00 PM', title: 'Check-in Ubud Forest Villas', desc: 'Instalación en tu villa privada rodeada de selva tropical y alberca infinity.', icon: 'hotel', color: '#0ea5e9' },
          { time: '07:30 PM', title: 'Cena de Bienvenida en Ubud', desc: 'Cena con velas frente a los hermosos campos de arroz de Ubud.', icon: 'food', color: '#8b5cf6' }
        ]
      },
      {
        day: 2,
        date: 'Día 2: Templos y Purificación',
        mapQuery: 'Tirta Empul Temple, Bali, Indonesia',
        events: [
          { time: '08:30 AM', title: 'Bosque Sagrado de los Monos', desc: 'Paseo guiado entre árboles centenarios y cientos de monos balineses juguetones en su hábitat.', icon: 'sightseeing', color: '#10b981' },
          { time: '11:00 AM', title: 'Ritual en Tirta Empul', desc: 'Visita al templo sagrado de agua. Posibilidad de participar en el ritual espiritual de purificación en sus manantiales.', icon: 'sightseeing', color: '#14b8a6' },
          { time: '01:30 PM', title: 'Almuerzo con Vista al Volcán', desc: 'Buffet tradicional en Kintamani con una panorámica asombrosa del volcán y lago Batur.', icon: 'food', color: '#ec4899' },
          { time: '04:00 PM', title: 'Terrazas de Arroz Tegalalang', desc: 'Paseo y fotos en las famosas terrazas verdes escalonadas. Opcional: Columpio gigante balinés.', icon: 'sightseeing', color: '#10b981' }
        ]
      },
      {
        day: 3,
        date: 'Día 3: Atardecer en la Playa',
        mapQuery: 'Seminyak Beach, Bali, Indonesia',
        events: [
          { time: '10:00 AM', title: 'Traslado a Seminyak', desc: 'Check-out de Ubud y traslado a la zona costera de Seminyak para disfrutar del mar.', icon: 'transport', color: '#14b8a6' },
          { time: '12:30 PM', title: 'Día de Club de Playa', desc: 'Acceso vip con camastro reservado en club de playa frente al mar.', icon: 'hotel', color: '#0ea5e9' },
          { time: '06:00 PM', title: 'Atardecer y Mariscos en Jimbaran', desc: 'Espectacular cena de mariscos asados a las brasas de coco directamente en la arena fina al ponerse el sol.', icon: 'food', color: '#8b5cf6' }
        ]
      }
    ]
  },
  dubai: {
    title: 'Itinerario: Dubai del Desierto al Lujo',
    days: [
      {
        day: 1,
        date: 'Día 1: Llegada y Luces del Burj',
        mapQuery: 'Burj Al Arab, Dubai, UAE',
        events: [
          { time: '02:00 PM', title: 'Llegada e Inmigración', desc: 'Arribo a Dubai (DXB). Traslado vip en vehículo de lujo al hotel.', icon: 'flight', color: '#f97316' },
          { time: '04:00 PM', title: 'Check-in Burj Al Arab Luxury Suite', desc: 'Registro en el hotel 7 estrellas más lujoso del mundo con servicio de mayordomo privado.', icon: 'hotel', color: '#0ea5e9' },
          { time: '07:00 PM', title: 'Mirador Burj Khalifa y Fuentes', desc: 'Acceso rápido "At The Top" en el piso 124 y cena ligera frente al espectáculo de fuentes danzantes del Dubai Mall.', icon: 'sightseeing', color: '#10b981' }
        ]
      },
      {
        day: 2,
        date: 'Día 2: Zocos y Safari en Desierto',
        mapQuery: 'Dubai Desert Conservation Reserve, Dubai, UAE',
        events: [
          { time: '10:00 AM', title: 'Zocos del Oro y Especias', desc: 'Paseo tradicional cruzando el canal en bote "Abra" hacia los mercados tradicionales de oro y condimentos.', icon: 'shopping', color: '#f59e0b' },
          { time: '03:00 PM', title: 'Safari 4x4 en Dunas Rojas', desc: 'Aventura extrema de dune bashing en camioneta todo terreno. Paseo en camello por el desierto.', icon: 'sightseeing', color: '#14b8a6' },
          { time: '07:30 PM', title: 'Cena Show Bedunia Premium', desc: 'Cena buffet de carnes al carbón en campamento privado de lujo con shows de danza del vientre y Tanoura.', icon: 'food', color: '#8b5cf6' }
        ]
      },
      {
        day: 3,
        date: 'Día 3: Mezquita de Abu Dhabi',
        mapQuery: 'Sheikh Zayed Grand Mosque, Abu Dhabi, UAE',
        events: [
          { time: '08:30 AM', title: 'Traslado a Abu Dhabi', desc: 'Viaje corto de 1.5 horas hacia la capital de los Emiratos Árabes Unidos.', icon: 'transport', color: '#14b8a6' },
          { time: '10:30 AM', title: 'Gran Mezquita Sheikh Zayed', desc: 'Visita guiada a la obra maestra arquitectónica islámica de mármol blanco puro y candelabros Swarovski.', icon: 'sightseeing', color: '#10b981' },
          { time: '02:30 PM', title: 'Museo Louvre Abu Dhabi', desc: 'Visita libre para contemplar las obras y el domo de luz flotante diseñado por Jean Nouvel.', icon: 'sightseeing', color: '#10b981' },
          { time: '06:00 PM', title: 'Regreso a Dubai', desc: 'Retorno para tu última noche de descanso u ocio personal.', icon: 'hotel', color: '#0ea5e9' }
        ]
      }
    ]
  }
};

// Fallback dynamic generator for new/custom packages
export const getItineraryForPackage = (pkg) => {
  if (!pkg) return null;
  
  // Resolve static itinerary if ID matches
  const packageId = (pkg.id || '').toString().toLowerCase();
  if (STATIC_ITINERARIES[packageId]) {
    return STATIC_ITINERARIES[packageId];
  }
  
  // Dynamic generation fallback
  const name = pkg.name || 'Tour Especial';
  const country = pkg.country || 'Destino Mágico ✈️';
  const highlight = pkg.highlights ? pkg.highlights.split('•')[0].trim() : 'atractivos principales';
  
  return {
    title: `Itinerario: ${name}`,
    days: [
      {
        day: 1,
        date: 'Día 1: Vuelo e Instalación',
        mapQuery: `${pkg.name || 'Hotel'}, ${pkg.country || ''}`,
        events: [
          { time: '09:00 AM', title: 'Vuelo redondo incluido', desc: 'Salida en vuelo regular. Recibimiento en destino y traslado personalizado al hotel.', icon: 'flight', color: '#f97316' },
          { time: '02:00 PM', title: 'Hospedaje Seleccionado', desc: 'Check-in y acomodo en las habitaciones reservadas. Tarde de descanso para aclimatación.', icon: 'hotel', color: '#0ea5e9' },
          { time: '08:00 PM', title: 'Cena Gourmet de Bienvenida', desc: `Cena en el restaurante del hotel para repasar los detalles de tu estancia en ${country}.`, icon: 'food', color: '#8b5cf6' }
        ]
      },
      {
        day: 2,
        date: 'Día 2: Exploración Guiada',
        mapQuery: `${highlight}, ${pkg.country || ''}`,
        events: [
          { time: '09:00 AM', title: 'Visita guiada especial', desc: `Recorrido con guía experto en español visitando ${highlight} y los puntos de mayor interés histórico.`, icon: 'sightseeing', color: '#10b981' },
          { time: '01:30 PM', title: 'Almuerzo de Gastronomía Local', desc: 'Almuerzo incluido en restaurante de comida típica regional para degustar sabores locales.', icon: 'food', color: '#ec4899' },
          { time: '04:00 PM', title: 'Tiempo de Fotografía y Paseo', desc: 'Recorrido peatonal por zonas escénicas con paradas programadas para capturar los mejores momentos.', icon: 'sightseeing', color: '#10b981' }
        ]
      },
      {
        day: 3,
        date: 'Día 3: Actividades y Compras',
        mapQuery: `${pkg.country || ''}`,
        events: [
          { time: '10:00 AM', title: 'Mañana libre o tour de compras', desc: 'Tiempo libre para visitar mercadillos locales o realizar actividades opcionales recomendadas por el guía.', icon: 'shopping', color: '#f59e0b' },
          { time: '04:00 PM', title: 'Traslado y despedida', desc: 'Punto de reunión en lobby del hotel para traslado de salida hacia el aeropuerto o siguiente escala.', icon: 'transport', color: '#14b8a6' }
        ]
      }
    ]
  };
};
