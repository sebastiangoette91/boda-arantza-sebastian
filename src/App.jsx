import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Menu, X, ChevronDown, Utensils, Sparkles, Plane, Heart, Music, Bus, Image as ImageIcon } from 'lucide-react';

const GH_PAGES = 'https://sebastiangoette91.github.io/boda-fotos2';
const PRIMARY_BASE  = GH_PAGES;
const FALLBACK_BASE = 'https://cdn.jsdelivr.net/gh/sebastiangoette91/boda-fotos2@main';

const FILES = {
  hero:      'PrimeraPlana.jpeg',
  intention: 'Intencion.png',
  oax1:      'OAX4.jpg',
  oax2:      'OAX2.jpg',
  oax3:      'OAX1.jpeg',
  pe1:       'PE5.jpg',
  pe2:       'PE3.jpg',
  pe3:       'PE2.jpg',
  g1:        'Viaje1.jpeg',
  g2:        'Viaje2.jpeg',
  g3:        'Viaje3.jpeg',
  g4:        'Viaje4.jpeg'
};

const IMAGES = Object.fromEntries(
  Object.entries(FILES).map(([k, f]) => [k, `${PRIMARY_BASE}/${f}`])
);

const FALLBACKS = Object.fromEntries(
  Object.entries(FILES).map(([k, f]) => [k, `${FALLBACK_BASE}/${f}`])
);

function SafeImage({ src, fallbackSrc, alt, className, style, onStatus }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
    setFailed(false);
  }, [src]);

  const handleError = () => {
    console.warn('[SafeImage] failed to load:', currentSrc);
    if (onStatus) onStatus(alt, 'error', currentSrc);
    if (!triedFallback && fallbackSrc) {
      console.warn('[SafeImage] trying fallback:', fallbackSrc);
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setFailed(true);
    }
  };

  const handleLoad = () => {
    if (onStatus) onStatus(alt, 'ok', currentSrc);
  };

  if (failed || !currentSrc) {
    return (
      <div className={className} style={Object.assign({
        background: 'linear-gradient(135deg, #E8B07A 0%, #A0522D 60%, #7a3d1f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F5EFE4'
      }, style || {})}>
        <div style={{ opacity: 0.55, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ImageIcon size={28} strokeWidth={1.2} />
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', fontFamily: 'Inter, sans-serif' }}>FOTO</div>
        </div>
      </div>
    );
  }
  return (
    <img
      src={currentSrc}
      alt={alt || ''}
      className={className}
      style={style}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

export default function WeddingSite() {
  const [lang, setLang] = useState('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [faqIdx, setFaqIdx] = useState(null);
  const [activePlace, setActivePlace] = useState('oaxaca');
  const [debugLog, setDebugLog] = useState([]);
  const [showDebug, setShowDebug] = useState(true);

  const logStatus = (alt, status, url) => {
    setDebugLog(prev => {
      const filtered = prev.filter(e => e.alt !== alt);
      return [...filtered, { alt, status, url, t: Date.now() }];
    });
  };

  useEffect(() => {
    const wedding = new Date('2027-02-13T14:00:00-06:00').getTime();
    const tick = () => {
      const diff = wedding - Date.now();
      if (diff > 0) {
        setT({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000)
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const c = {
    es: {
      nav: { home: 'Inicio', story: 'Intención', event: 'El Evento', oaxaca: 'Conoce Oaxaca', stay: 'Hospedaje', gallery: 'Galería', rsvp: 'Confirmar', faq: 'Preguntas' },
      hero: { eyebrow: 'NOS CASAMOS', dateFull: 'Sábado 13 de Febrero, 2027', place: 'Oaxaca de Juárez · México', countdown: 'Faltan', d: 'Días', h: 'Horas', m: 'Min', s: 'Seg', scroll: 'Descubre más' },
      story: {
        eyebrow: 'NUESTRA INTENCIÓN',
        title: 'La intención de nuestra boda',
        p1: 'La intención será compartir este momento con las personas que más queremos e impacto han tenido en nuestros caminos. Nuestra boda representa una oportunidad única para reunir a quienes han caminado con nosotros en distintas etapas de la vida dejando grandes huellas.',
        p2: 'Elegimos Oaxaca porque ahí comenzó nuestro amor. Fue nuestro primer viaje de novios, en ese primer mes en el que todo era descubrimiento y emoción. Nos enamoramos el uno del otro, pero también de la magia de Oaxaca. Sus calles, su comida, su historia, su cultura, su gente y su naturaleza se volvieron parte de ese recuerdo que queremos revivir con las personas más cercanas en nuestra boda.',
        p3: 'Soñamos con una boda íntima y auténtica. Por eso, cada persona invitada es alguien verdaderamente importante para nosotros. Queremos que se sienta como una celebración relajada, llena de amor, emociones y mucha energía; con comida tradicional deliciosa y, claro, que no falte mezcal.',
        p4: 'Nos llena de emoción y entusiasmo ver nuestra boda como una oportunidad única para que personas tan increíbles, que nos han acompañado a cada uno durante muchos años, al fin se conozcan.',
        cta: '— Arantza & Sebastian'
      },
      event: {
        eyebrow: 'EL EVENTO', title: 'El Gran Día', location: 'Ex Hacienda San José', address: 'Oaxaca de Juárez, Oaxaca, México', schedule: 'Itinerario',
        items: [
          { time: '4:00 PM', title: 'Ceremonia', desc: 'Nos damos el sí bajo los arcos de la hacienda', icon: 'heart' },
          { time: '', title: 'Cóctel', desc: 'Mezcal, botanas y música', icon: 'sparkles' },
          { time: '', title: 'Cena', desc: 'Un banquete oaxaqueño', icon: 'utensils' },
          { time: '', title: 'Fiesta', desc: 'A bailar hasta el final', icon: 'music' }
        ],
        dress: 'Código de vestimenta', dressCode: 'Formal · Garden Party', dressNote: 'Colores tierra bienvenidos. Evita el blanco y tacones muy finos (la hacienda tiene empedrado).',
        mapBtn: 'Ver ubicación',
        transportTitle: 'Transporte incluido',
        transportNote: 'Habrá transporte incluido para ir y volver desde la ciudad. Compartiremos los puntos de encuentro y horarios más cerca de la fecha.'
      },
      oaxaca: {
        eyebrow: 'DESCUBRE', title: 'Conoce Oaxaca',
        sub: 'Nuestros invitados vienen de distintos rincones del mundo. Queremos que esta boda también sea una excusa para enamorarse de este país.',
        tab1: 'Oaxaca de Juárez', tab2: 'Puerto Escondido',
        oax: { title: 'La ciudad de los siete moles', desc: 'Declarada Patrimonio de la Humanidad, Oaxaca es una fiesta para todos los sentidos. Sus calles empedradas, sus mercados que huelen a tortilla recién hecha, sus templos barrocos bañados de oro y el mezcal que se sirve con sal de gusano — todo aquí cuenta una historia.', highlights: [
          { t: 'Templo de Santo Domingo', d: 'El alma barroca de la ciudad.' },
          { t: 'Monte Albán', d: 'La antigua capital zapoteca entre las nubes.' },
          { t: 'Mercado 20 de Noviembre', d: 'Mole, tlayudas y chocolate de agua.' },
          { t: 'Hierve el Agua', d: 'Cascadas petrificadas al amanecer.' },
          { t: 'Mitla', d: 'Las grecas zapotecas más bellas de México.' },
          { t: 'Barrio de Jalatlaco', d: 'Murales, cafés y tardes eternas.' }
        ]},
        pe: { title: 'Donde el Pacífico respira', desc: 'A tres horas de la ciudad, Puerto Escondido es la otra cara de Oaxaca — salada, descalza, libre. Atardeceres que detienen el tiempo, tortugas que vuelven al mar y una calma que solo se encuentra cuando uno se olvida del reloj.', highlights: [
          { t: 'Playa Zicatela', d: 'La ola más famosa del Pacífico.' },
          { t: 'Punta Zicatela', d: 'Bohemia, surf y cenas al atardecer.' },
          { t: 'Bahía de Puerto Angelito', d: 'Agua turquesa para nadar.' },
          { t: 'Laguna de Manialtepec', d: 'Bioluminiscencia en noches sin luna.' },
          { t: 'Mazunte', d: 'El pueblo mágico de las tortugas.' },
          { t: 'Playa Carrizalillo', d: 'Atardeceres de postal.' }
        ]},
        tip: 'Te recomendamos llegar 2–3 días antes y tomarte unos días en Puerto después de la boda. Valdrá la pena.'
      },
      stay: {
        eyebrow: 'HOSPEDAJE', title: '¿Dónde quedarte?', sub: 'Te dejamos algunas recomendaciones cerca del venue. Te sugerimos reservar con anticipación.',
        hotels: [
          { name: 'Quinta Real Oaxaca', cat: 'Lujo', desc: 'Ex convento del siglo XVI en pleno centro histórico.', dist: '15 min del venue' },
          { name: 'Casa Oaxaca', cat: 'Boutique', desc: 'Elegancia oaxaqueña con rooftop y vista a Santo Domingo.', dist: '18 min del venue' },
          { name: 'Hotel Los Amantes', cat: 'Boutique', desc: 'Intimidad y diseño en el corazón de la ciudad.', dist: '17 min del venue' },
          { name: 'City Express Oaxaca', cat: 'Confort', desc: 'Opción práctica y moderna para descansar.', dist: '20 min del venue' }
        ],
        flights: 'Vuelos', flightsDesc: 'Aeropuerto Internacional Xoxocotlán (OAX) recibe vuelos directos desde CDMX, Monterrey, Tijuana, Houston, Dallas y Los Ángeles. Desde Buenos Aires o Europa, la ruta más cómoda es vía CDMX.'
      },
      gallery: { eyebrow: 'NOSOTROS', title: 'Nuestro primer viaje de novios', subtitle: 'por Oaxaca y Puerto Escondido' },
      rsvp: { eyebrow: 'CONFIRMACIÓN', title: '¿Nos acompañas?', sub: 'Para confirmar tu lugar o resolver cualquier duda sobre tu visita a Oaxaca, ponte en contacto con nuestra wedding planner, Mariana Vez, a través de WhatsApp.', plannerName: 'Mariana Vez', plannerRole: 'Wedding Planner', whatsappLabel: 'Escribir por WhatsApp', whatsappNumber: '+52 951 656 1349', closing: 'Te esperamos' },
      faq: { eyebrow: 'PREGUNTAS', title: 'Lo que probablemente te preguntas', items: [
        { q: '¿Puedo llevar acompañante?', a: 'Por favor consulta tu invitación — ahí especificamos si tu pase incluye acompañante.' },
        { q: '¿Habrá transporte desde el centro?', a: 'Sí. Organizaremos shuttles desde puntos clave del centro histórico hacia la hacienda y de regreso al final de la noche. Los detalles los compartiremos más cerca de la fecha.' },
        { q: '¿Los niños son bienvenidos?', a: 'Adoramos a los pequeños, pero hemos decidido que sea una celebración solo para adultos. Gracias por comprender.' },
        { q: '¿Qué clima hace en febrero?', a: 'Días soleados (22–26°C) y noches frescas (8–12°C). Trae una chaqueta ligera para después del atardecer.' },
        { q: '¿Habrá opciones vegetarianas/veganas?', a: 'Sí. Indícanos tus restricciones en el formulario de confirmación y nuestro chef preparará algo especial.' },
        { q: '¿Necesito visa para entrar a México?', a: 'Argentinos y la mayoría de europeos no requieren visa para estancias turísticas. Verifica los requisitos vigentes de tu país antes de viajar.' }
      ]},
      footer: { thanks: 'Gracias por ser parte de esta historia', names: 'Arantza & Sebastian', date: '13.02.2027 · Oaxaca' }
    },
    en: {
      nav: { home: 'Home', story: 'Intention', event: 'The Event', oaxaca: 'Discover Oaxaca', stay: 'Stay', gallery: 'Gallery', rsvp: 'RSVP', faq: 'FAQ' },
      hero: { eyebrow: "WE'RE GETTING MARRIED", dateFull: 'Saturday February 13th, 2027', place: 'Oaxaca de Juárez · Mexico', countdown: 'Countdown', d: 'Days', h: 'Hours', m: 'Min', s: 'Sec', scroll: 'Discover more' },
      story: {
        eyebrow: 'OUR INTENTION',
        title: 'The intention of our wedding',
        p1: 'Our intention is to share this moment with the people we love most and who have had the greatest impact on our paths. Our wedding is a unique opportunity to gather those who have walked alongside us through different chapters of life, leaving deep imprints along the way.',
        p2: "We chose Oaxaca because that's where our love began. It was our first trip together as a couple, during that first month when everything was discovery and excitement. We fell in love with each other — but also with the magic of Oaxaca. Its streets, its food, its history, its culture, its people and its nature became part of a memory we want to relive with those closest to us on our wedding day.",
        p3: "We dream of an intimate and authentic wedding. That's why every invited person is truly meaningful to us. We want it to feel like a relaxed celebration, full of love, emotion and energy — with delicious traditional food and, of course, plenty of mezcal.",
        p4: 'It fills us with joy to see our wedding as a unique chance for such incredible people, who have accompanied each of us for so many years, to finally meet.',
        cta: '— Arantza & Sebastian'
      },
      event: {
        eyebrow: 'THE EVENT', title: 'The Big Day', location: 'Ex Hacienda San José', address: 'Oaxaca de Juárez, Oaxaca, Mexico', schedule: 'Schedule',
        items: [
          { time: '4:00 PM', title: 'Ceremony', desc: 'We say "I do" beneath the hacienda arches', icon: 'heart' },
          { time: '', title: 'Cocktail', desc: 'Mezcal, bites and music', icon: 'sparkles' },
          { time: '', title: 'Dinner', desc: 'An Oaxacan feast', icon: 'utensils' },
          { time: '', title: 'Party', desc: 'Dancing until the end', icon: 'music' }
        ],
        dress: 'Dress code', dressCode: 'Formal · Garden Party', dressNote: 'Earth tones welcome. Avoid white and very thin heels (the hacienda has cobblestone).',
        mapBtn: 'View location',
        transportTitle: 'Transportation included',
        transportNote: "Round-trip transportation from the city will be provided. We'll share pick-up points and times closer to the date."
      },
      oaxaca: {
        eyebrow: 'DISCOVER', title: 'Meet Oaxaca',
        sub: 'Our guests are coming from all over the world. We want this wedding to also be an excuse to fall in love with this country.',
        tab1: 'Oaxaca City', tab2: 'Puerto Escondido',
        oax: { title: 'The city of seven moles', desc: 'A UNESCO World Heritage site, Oaxaca is a feast for every sense. Its cobblestone streets, markets that smell of freshly pressed tortillas, baroque temples bathed in gold, and mezcal served with worm salt — everything here tells a story.', highlights: [
          { t: 'Santo Domingo Temple', d: 'The baroque soul of the city.' },
          { t: 'Monte Albán', d: 'Ancient Zapotec capital among the clouds.' },
          { t: '20 de Noviembre Market', d: 'Mole, tlayudas and water chocolate.' },
          { t: 'Hierve el Agua', d: 'Petrified waterfalls at sunrise.' },
          { t: 'Mitla', d: "Mexico's finest Zapotec stonework." },
          { t: 'Jalatlaco', d: 'Murals, cafés and endless afternoons.' }
        ]},
        pe: { title: 'Where the Pacific breathes', desc: 'Three hours from the city, Puerto Escondido is the other face of Oaxaca — salty, barefoot, free. Sunsets that stop time, turtles returning to the sea and a calm you only find when you forget the clock.', highlights: [
          { t: 'Zicatela Beach', d: 'The most famous wave on the Pacific.' },
          { t: 'Punta Zicatela', d: 'Bohemia, surf and sunset dinners.' },
          { t: 'Puerto Angelito Bay', d: 'Turquoise water for swimming.' },
          { t: 'Manialtepec Lagoon', d: 'Bioluminescence on moonless nights.' },
          { t: 'Mazunte', d: 'The magical village of turtles.' },
          { t: 'Carrizalillo Beach', d: 'Postcard sunsets.' }
        ]},
        tip: "We recommend arriving 2–3 days early and staying in Puerto a few days after the wedding. It'll be worth it."
      },
      stay: {
        eyebrow: 'STAY', title: 'Where to stay?', sub: 'Here are some recommendations near the venue. We suggest booking well in advance.',
        hotels: [
          { name: 'Quinta Real Oaxaca', cat: 'Luxury', desc: '16th century former convent in the historic center.', dist: '15 min from venue' },
          { name: 'Casa Oaxaca', cat: 'Boutique', desc: 'Oaxacan elegance with rooftop and Santo Domingo views.', dist: '18 min from venue' },
          { name: 'Hotel Los Amantes', cat: 'Boutique', desc: 'Intimacy and design in the heart of the city.', dist: '17 min from venue' },
          { name: 'City Express Oaxaca', cat: 'Comfort', desc: 'Practical and modern option to rest.', dist: '20 min from venue' }
        ],
        flights: 'Flights', flightsDesc: 'Xoxocotlán International Airport (OAX) receives direct flights from Mexico City, Monterrey, Tijuana, Houston, Dallas and Los Angeles. From Buenos Aires or Europe, the easiest route is via Mexico City.'
      },
      gallery: { eyebrow: 'US', title: 'Our first trip as a couple', subtitle: 'through Oaxaca and Puerto Escondido' },
      rsvp: { eyebrow: 'RSVP', title: 'Will you join us?', sub: 'To confirm your spot or for any questions about your visit to Oaxaca, please contact our wedding planner, Mariana Vez, via WhatsApp.', plannerName: 'Mariana Vez', plannerRole: 'Wedding Planner', whatsappLabel: 'Message on WhatsApp', whatsappNumber: '+52 951 656 1349', closing: 'We can\'t wait to see you' },
      faq: { eyebrow: 'FAQ', title: "What you're probably wondering", items: [
        { q: 'Can I bring a plus one?', a: 'Please check your invitation — it will specify whether your pass includes a plus one.' },
        { q: 'Will there be transportation from downtown?', a: "Yes. We'll organize shuttles from key points in the historic center to the hacienda and back at the end of the night. Details will be shared closer to the date." },
        { q: 'Are kids welcome?', a: "We love the little ones, but we've decided this will be an adults-only celebration. Thank you for understanding." },
        { q: "What's the weather like in February?", a: 'Sunny days (22–26°C / 72–79°F) and cool nights (8–12°C / 46–54°F). Bring a light jacket for after sunset.' },
        { q: 'Will there be vegetarian/vegan options?', a: 'Yes. Let us know your restrictions in the RSVP form and our chef will prepare something special.' },
        { q: 'Do I need a visa for Mexico?', a: "Argentinians and most Europeans don't require a visa for tourist stays. Check your country's current requirements before traveling." }
      ]},
      footer: { thanks: 'Thank you for being part of this story', names: 'Arantza & Sebastian', date: '02.13.2027 · Oaxaca' }
    }
  };

  const l = c[lang];

  const iconFor = (name) => {
    const p = { size: 22, strokeWidth: 1.3 };
    if (name === 'heart') return <Heart {...p} />;
    if (name === 'sparkles') return <Sparkles {...p} />;
    if (name === 'utensils') return <Utensils {...p} />;
    if (name === 'music') return <Music {...p} />;
    return null;
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mapsUrl = 'https://www.google.com/maps/place/Ex+Hacienda+San+Jos%C3%A9/@17.0823118,-96.8128386,17z';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: '#F5EFE4', color: '#2B2420' }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Italiana&family=Inter:wght@300;400;500;600&display=swap');
        .f-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .f-display { font-family: 'Italiana', 'Cormorant Garamond', serif; letter-spacing: 0.05em; }
        .f-sans { font-family: 'Inter', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        .fade-up { opacity: 0; transform: translateY(24px); animation: fadeUp 1.2s cubic-bezier(.22,1,.36,1) forwards; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.45s; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .divider-ornament::before, .divider-ornament::after {
          content: ''; flex: 1; height: 1px; background: currentColor; opacity: 0.3;
        }
        .divider-ornament { display: flex; align-items: center; gap: 1rem; }
        .tick { transition: all 0.4s cubic-bezier(.22,1,.36,1); }
        .hover-lift { transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease; }
        .hover-lift:hover { transform: translateY(-6px); }
        .img-kenburns { animation: kb 20s ease-in-out infinite alternate; }
        @keyframes kb { from { transform: scale(1); } to { transform: scale(1.08); } }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #A0522D; }
        .gallery-item { overflow: hidden; }
        .gallery-item img { transition: transform 1.2s cubic-bezier(.22,1,.36,1); }
        .gallery-item:hover img { transform: scale(1.06); }
        .scroll-indicator { animation: drop 2s ease-in-out infinite; }
        @keyframes drop { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(10px);opacity:1} }
        @media (max-width: 640px) { .countdown-num { font-size: 1.5rem !important; } }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 tick ${scrolled ? 'py-3' : 'py-5'}`} style={{ backgroundColor: scrolled ? 'rgba(245,239,228,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(43,36,32,0.08)' : '1px solid transparent' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="f-display text-xl tracking-widest" style={{ color: scrolled ? '#2B2420' : '#F5EFE4' }}>
            A <span style={{ color: '#A0522D' }}>&</span> S
          </button>
          <div className="hidden lg:flex items-center gap-8 f-sans text-xs tracking-widest uppercase" style={{ color: scrolled ? '#2B2420' : '#F5EFE4' }}>
            {Object.entries(l.nav).map(([key, val]) => (
              <button key={key} onClick={() => scrollTo(key)} className="hover:opacity-60 tick">{val}</button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 px-3 py-1.5 border rounded-full f-sans text-xs tracking-widest tick"
              style={{ borderColor: scrolled ? '#2B2420' : '#F5EFE4', color: scrolled ? '#2B2420' : '#F5EFE4' }}
            >
              <Globe size={12} strokeWidth={1.5} />
              <span>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ color: scrolled ? '#2B2420' : '#F5EFE4' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 shadow-xl" style={{ backgroundColor: '#F5EFE4' }}>
            <div className="flex flex-col p-6 gap-4 f-sans text-sm tracking-widest uppercase">
              {Object.entries(l.nav).map(([key, val]) => (
                <button key={key} onClick={() => scrollTo(key)} className="text-left py-2 border-b" style={{ borderColor: 'rgba(43,36,32,0.1)', color: '#2B2420' }}>{val}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 img-kenburns">
          <SafeImage src={IMAGES.hero} fallbackSrc={FALLBACKS.hero} alt="Arantza y Sebastian" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,36,32,0.45) 0%, rgba(43,36,32,0.6) 100%)' }} />
        <div className="relative z-10 text-center px-6 max-w-4xl" style={{ color: '#F5EFE4' }}>
          <div className="fade-up f-sans text-xs sm:text-sm tracking-[0.5em] mb-8 opacity-90">{l.hero.eyebrow}</div>
          <h1 className="fade-up fade-up-2 f-display text-6xl sm:text-8xl md:text-9xl leading-none mb-6">
            Arantza
            <div className="my-3 text-4xl sm:text-5xl md:text-6xl" style={{ color: '#E8B07A', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>&</div>
            Sebastian
          </h1>
          <div className="fade-up fade-up-3 divider-ornament f-sans text-[0.7rem] sm:text-xs tracking-[0.4em] uppercase mb-4 opacity-90">
            <span>{l.hero.dateFull}</span>
          </div>
          <div className="fade-up fade-up-3 flex items-center justify-center gap-2 f-sans text-xs tracking-[0.3em] uppercase mb-12 opacity-80">
            <MapPin size={14} strokeWidth={1.3} />
            <span>{l.hero.place}</span>
          </div>
          <div className="fade-up fade-up-4">
            <div className="f-sans text-[0.65rem] tracking-[0.4em] uppercase opacity-70 mb-4">{l.hero.countdown}</div>
            <div className="flex justify-center gap-4 sm:gap-8">
              {[
                { v: t.days, l: l.hero.d },
                { v: t.hours, l: l.hero.h },
                { v: t.minutes, l: l.hero.m },
                { v: t.seconds, l: l.hero.s }
              ].map((it, i) => (
                <div key={i} className="text-center">
                  <div className="countdown-num f-display text-3xl sm:text-4xl md:text-5xl">{String(it.v).padStart(2, '0')}</div>
                  <div className="f-sans text-[0.6rem] tracking-[0.3em] uppercase opacity-70 mt-1">{it.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo('story')} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-indicator" style={{ color: '#F5EFE4' }}>
          <span className="f-sans text-[0.6rem] tracking-[0.3em] uppercase">{l.hero.scroll}</span>
          <ChevronDown size={20} strokeWidth={1.3} />
        </button>
      </section>

      <section id="story" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.story.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl leading-tight mb-8">{l.story.title}</h2>
            <div className="f-serif text-lg md:text-xl leading-relaxed space-y-5" style={{ color: '#4A3F38' }}>
              <p>{l.story.p1}</p>
              <p>{l.story.p2}</p>
              <p>{l.story.p3}</p>
              <p>{l.story.p4}</p>
            </div>
            <div className="f-serif italic text-xl mt-8" style={{ color: '#A0522D' }}>{l.story.cta}</div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="aspect-[4/5] overflow-hidden" style={{ borderRadius: '2px' }}>
              <SafeImage src={IMAGES.intention} fallbackSrc={FALLBACKS.intention} alt="Arantza y Sebastian" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 hidden md:block" style={{ borderColor: '#A0522D' }} />
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 hidden md:block" style={{ borderColor: '#87A08A' }} />
          </div>
        </div>
      </section>

      <section id="event" className="py-24 md:py-32 px-6" style={{ backgroundColor: '#EBE2D2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.event.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl mb-6">{l.event.title}</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin size={16} strokeWidth={1.3} style={{ color: '#A0522D' }} />
              <span className="f-serif text-2xl">{l.event.location}</span>
            </div>
            <p className="f-sans text-sm tracking-wider opacity-70">{l.event.address}</p>
          </div>
          <div className="mb-16">
            <h3 className="f-display text-2xl text-center mb-10" style={{ color: '#A0522D' }}>{l.event.schedule}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {l.event.items.map((item, i) => (
                <div key={i} className="text-center p-8 hover-lift" style={{ backgroundColor: '#F5EFE4', borderRadius: '2px' }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(160,82,45,0.1)', color: '#A0522D' }}>
                    {iconFor(item.icon)}
                  </div>
                  {item.time && <div className="f-display text-2xl mb-1">{item.time}</div>}
                  <div className="f-serif text-lg mb-2" style={{ color: '#A0522D' }}>{item.title}</div>
                  <div className="f-sans text-xs leading-relaxed opacity-70">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch mb-8">
            <div className="aspect-video md:aspect-auto overflow-hidden" style={{ borderRadius: '2px', minHeight: '300px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3811.5!2d-96.8128386!3d17.0823118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c71f21dbd1a217%3A0xd9263f11ae6837bd!2sEx%20Hacienda%20San%20Jos%C3%A9!5e0!3m2!1sen!2smx!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                title="Ex Hacienda San José"
              />
            </div>
            <div className="flex flex-col justify-center p-10" style={{ backgroundColor: '#F5EFE4', borderRadius: '2px' }}>
              <div className="f-sans text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#A0522D' }}>{l.event.dress}</div>
              <h3 className="f-display text-3xl mb-4">{l.event.dressCode}</h3>
              <p className="f-serif text-lg leading-relaxed mb-8" style={{ color: '#4A3F38' }}>{l.event.dressNote}</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start px-6 py-3 border f-sans text-xs tracking-[0.3em] uppercase tick" style={{ borderColor: '#A0522D', color: '#A0522D' }}>
                <MapPin size={14} strokeWidth={1.3} />
                <span>{l.event.mapBtn}</span>
              </a>
            </div>
          </div>
          <div className="max-w-4xl mx-auto flex items-center gap-5 p-6 md:p-8" style={{ backgroundColor: 'rgba(135,160,138,0.15)', borderLeft: '3px solid #87A08A', borderRadius: '2px' }}>
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#87A08A', color: '#F5EFE4' }}>
              <Bus size={20} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="f-sans text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#556A58' }}>{l.event.transportTitle}</div>
              <p className="f-serif text-base md:text-lg leading-relaxed" style={{ color: '#2B2420' }}>{l.event.transportNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="oaxaca" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.oaxaca.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl mb-6">{l.oaxaca.title}</h2>
            <p className="f-serif text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A3F38' }}>{l.oaxaca.sub}</p>
          </div>
          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => setActivePlace('oaxaca')}
              className="px-6 py-3 f-sans text-xs tracking-[0.3em] uppercase tick"
              style={{
                backgroundColor: activePlace === 'oaxaca' ? '#A0522D' : 'transparent',
                color: activePlace === 'oaxaca' ? '#F5EFE4' : '#2B2420',
                border: '1px solid #A0522D'
              }}
            >
              {l.oaxaca.tab1}
            </button>
            <button
              onClick={() => setActivePlace('puerto')}
              className="px-6 py-3 f-sans text-xs tracking-[0.3em] uppercase tick"
              style={{
                backgroundColor: activePlace === 'puerto' ? '#87A08A' : 'transparent',
                color: activePlace === 'puerto' ? '#F5EFE4' : '#2B2420',
                border: '1px solid #87A08A'
              }}
            >
              {l.oaxaca.tab2}
            </button>
          </div>
          {activePlace === 'oaxaca' ? (
            <div key="oax" className="fade-up">
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div>
                  <h3 className="f-display text-3xl sm:text-4xl mb-6" style={{ color: '#A0522D' }}>{l.oaxaca.oax.title}</h3>
                  <p className="f-serif text-lg leading-relaxed" style={{ color: '#4A3F38' }}>{l.oaxaca.oax.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square overflow-hidden gallery-item col-span-2" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.oax1} fallbackSrc={FALLBACKS.oax1} alt="Oaxaca" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden gallery-item" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.oax2} fallbackSrc={FALLBACKS.oax2} alt="Oaxaca" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden gallery-item" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.oax3} fallbackSrc={FALLBACKS.oax3} alt="Oaxaca" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {l.oaxaca.oax.highlights.map((h, i) => (
                  <div key={i} className="p-5 border-l-2 hover-lift" style={{ borderColor: '#A0522D', backgroundColor: '#EBE2D2' }}>
                    <div className="f-serif text-lg mb-1">{h.t}</div>
                    <div className="f-sans text-sm opacity-70 leading-relaxed">{h.d}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div key="pe" className="fade-up">
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div className="grid grid-cols-2 gap-3 order-2 md:order-1">
                  <div className="aspect-square overflow-hidden gallery-item col-span-2" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.pe1} fallbackSrc={FALLBACKS.pe1} alt="Puerto Escondido" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden gallery-item" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.pe2} fallbackSrc={FALLBACKS.pe2} alt="Puerto Escondido" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden gallery-item" style={{ borderRadius: '2px' }}>
                    <SafeImage src={IMAGES.pe3} fallbackSrc={FALLBACKS.pe3} alt="Puerto Escondido" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="f-display text-3xl sm:text-4xl mb-6" style={{ color: '#87A08A' }}>{l.oaxaca.pe.title}</h3>
                  <p className="f-serif text-lg leading-relaxed" style={{ color: '#4A3F38' }}>{l.oaxaca.pe.desc}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {l.oaxaca.pe.highlights.map((h, i) => (
                  <div key={i} className="p-5 border-l-2 hover-lift" style={{ borderColor: '#87A08A', backgroundColor: '#EBE2D2' }}>
                    <div className="f-serif text-lg mb-1">{h.t}</div>
                    <div className="f-sans text-sm opacity-70 leading-relaxed">{h.d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-12 text-center max-w-2xl mx-auto p-6" style={{ backgroundColor: 'rgba(160,82,45,0.08)', borderLeft: '3px solid #A0522D' }}>
            <p className="f-serif italic text-lg" style={{ color: '#4A3F38' }}>{l.oaxaca.tip}</p>
          </div>
        </div>
      </section>

      <section id="stay" className="py-24 md:py-32 px-6" style={{ backgroundColor: '#EBE2D2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.stay.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl mb-6">{l.stay.title}</h2>
            <p className="f-serif text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A3F38' }}>{l.stay.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {l.stay.hotels.map((h, i) => (
              <div key={i} className="p-8 hover-lift" style={{ backgroundColor: '#F5EFE4', borderRadius: '2px' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="f-serif text-2xl">{h.name}</h3>
                  <span className="f-sans text-[0.65rem] tracking-[0.2em] uppercase px-2 py-1" style={{ backgroundColor: 'rgba(160,82,45,0.1)', color: '#A0522D' }}>{h.cat}</span>
                </div>
                <p className="f-sans text-sm leading-relaxed opacity-70 mb-3">{h.desc}</p>
                <div className="flex items-center gap-2 f-sans text-xs opacity-60">
                  <MapPin size={12} strokeWidth={1.3} />
                  <span>{h.dist}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center p-10" style={{ backgroundColor: '#F5EFE4' }}>
            <Plane size={28} strokeWidth={1.3} style={{ color: '#A0522D' }} className="mx-auto mb-4" />
            <h3 className="f-display text-2xl mb-4">{l.stay.flights}</h3>
            <p className="f-serif text-lg leading-relaxed" style={{ color: '#4A3F38' }}>{l.stay.flightsDesc}</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.gallery.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl mb-3">{l.gallery.title}</h2>
            <p className="f-serif italic text-xl md:text-2xl" style={{ color: '#A0522D' }}>{l.gallery.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {['g1', 'g2', 'g3', 'g4'].map((k, i) => (
              <div key={i} className="gallery-item overflow-hidden aspect-[3/4]" style={{ borderRadius: '2px' }}>
                <SafeImage src={IMAGES[k]} fallbackSrc={FALLBACKS[k]} alt={`Viaje ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rsvp" className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#2B2420', color: '#F5EFE4' }}>
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10" style={{ background: 'radial-gradient(circle, #E8B07A 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10" style={{ background: 'radial-gradient(circle, #87A08A 0%, transparent 70%)' }} />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#E8B07A' }}>{l.rsvp.eyebrow}</div>
          <h2 className="f-display text-4xl sm:text-5xl md:text-6xl mb-8">{l.rsvp.title}</h2>
          <p className="f-serif text-lg md:text-xl leading-relaxed opacity-90 mb-10 max-w-xl mx-auto">{l.rsvp.sub}</p>

          <div className="inline-block p-8 md:p-10 mb-8" style={{ backgroundColor: 'rgba(245,239,228,0.05)', border: '1px solid rgba(232,176,122,0.3)', borderRadius: '2px' }}>
            <div className="f-sans text-[0.65rem] tracking-[0.4em] uppercase opacity-70 mb-2" style={{ color: '#E8B07A' }}>{l.rsvp.plannerRole}</div>
            <div className="f-display text-2xl md:text-3xl mb-6">{l.rsvp.plannerName}</div>
            <a
              href={`https://wa.me/${l.rsvp.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 f-sans text-xs tracking-[0.3em] uppercase tick"
              style={{ backgroundColor: '#E8B07A', color: '#2B2420' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{l.rsvp.whatsappLabel}</span>
            </a>
            <div className="f-serif text-base md:text-lg mt-5 opacity-80" style={{ letterSpacing: '0.05em' }}>{l.rsvp.whatsappNumber}</div>
          </div>

          <div className="f-serif italic text-xl md:text-2xl mt-2" style={{ color: '#E8B07A' }}>{l.rsvp.closing}</div>
        </div>
      </section>

      <section id="faq" className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="f-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A0522D' }}>{l.faq.eyebrow}</div>
            <h2 className="f-display text-4xl sm:text-5xl md:text-6xl">{l.faq.title}</h2>
          </div>
          <div className="space-y-3">
            {l.faq.items.map((item, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'rgba(43,36,32,0.15)' }}>
                <button
                  onClick={() => setFaqIdx(faqIdx === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left tick"
                >
                  <span className="f-serif text-lg md:text-xl pr-4">{item.q}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className="tick flex-shrink-0"
                    style={{ transform: faqIdx === i ? 'rotate(180deg)' : 'rotate(0)', color: '#A0522D' }}
                  />
                </button>
                {faqIdx === i && (
                  <div className="pb-5 f-serif text-base leading-relaxed fade-up" style={{ color: '#4A3F38' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 text-center" style={{ backgroundColor: '#2B2420', color: '#F5EFE4' }}>
        <div className="max-w-2xl mx-auto">
          <Heart size={20} strokeWidth={1.3} style={{ color: '#E8B07A' }} className="mx-auto mb-6 opacity-80" />
          <p className="f-serif italic text-lg mb-6 opacity-80">{l.footer.thanks}</p>
          <div className="f-display text-3xl sm:text-4xl mb-2">{l.footer.names}</div>
          <div className="f-sans text-xs tracking-[0.4em] uppercase opacity-60">{l.footer.date}</div>
        </div>
      </footer>
    </div>
  );
}
