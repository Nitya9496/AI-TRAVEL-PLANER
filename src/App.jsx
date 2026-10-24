import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Compass,
  MapPin,
  Calendar,
  IndianRupee,
  Users,
  Sparkles,
  Download,
  Volume2,
  VolumeX,
  ExternalLink,
  Bus,
  Utensils,
  Languages,
  Clock,
  PieChart,
  AlertCircle,
  CheckCircle2,
  Landmark,
  Trees,
  Waves,
  Flame,
  Coffee,
  ShieldAlert,
  HeartPulse,
  Share2,
  RefreshCw,
  Sliders,
  CloudRain,
  Eye,
  ShieldCheck,
  Zap,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import NammaYatraHero from './components/NammaYatraHero';
import {
  generateItinerary,
  FALLBACK_KARNATAKA_ITINERARY,
} from './services/geminiService';
import TravelMap from './components/TravelMap';
import KannadaSurvivalKit from './components/KannadaSurvivalKit';
import CulturalHub from './components/CulturalHub';
import SmartTransitHub from './components/SmartTransitHub';
import EcoWildlifeHub from './components/EcoWildlifeHub';
import DiningStayHub from './components/DiningStayHub';
import SafetyHealthHub from './components/SafetyHealthHub';
import FinanceAnalyticsHub from './components/FinanceAnalyticsHub';
import AgentDrawer from './components/AgentDrawer';
import AuthModal from './components/AuthModal';
import { auth, signOut, onAuthStateChanged } from './firebase';
import { TRANSLATIONS } from './translations';

export default function App() {
  // Language State: 'en' (English) | 'kn' (Kannada)
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

  // Firebase Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Listen to active Firebase auth session & local session
  useEffect(() => {
    const localUser = localStorage.getItem('namma_yatra_auth_user');
    if (localUser) {
      try {
        setCurrentUser(JSON.parse(localUser));
      } catch (e) {
        console.warn('Error reading saved auth session:', e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem(
          'namma_yatra_auth_user',
          JSON.stringify({
            uid: user.uid,
            displayName: user.displayName || user.phoneNumber || user.email?.split('@')[0],
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
          })
        );
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('namma_yatra_auth_user');
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      localStorage.removeItem('namma_yatra_auth_user');
      setCurrentUser(null);
    }
  };

  // Active Category Suite Tab (1 to 7)
  const [activeTab, setActiveTab] = useState('itinerary');

  // Form State (Features 1-15)
  const [startingCity, setStartingCity] = useState('Bengaluru');
  const [durationDays, setDurationDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [groupType, setGroupType] = useState('Friends');
  const [selectedVibes, setSelectedVibes] = useState([
    'Heritage & Architecture',
    'Western Ghats & Nature',
  ]);

  // Advanced Category 1 Controls
  const [pace, setPace] = useState('express'); // 'express' | 'relaxed'
  const [monsoonAlert, setMonsoonAlert] = useState(false);
  const [soloSafe, setSoloSafe] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [seniorAccess, setSeniorAccess] = useState(false);
  const [offbeat, setOffbeat] = useState(false);
  const [nightlifeSpiritual, setNightlifeSpiritual] = useState(50); // 0 = Spiritual, 100 = Nightlife

  // Async & UI State
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(FALLBACK_KARNATAKA_ITINERARY);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [rescheduledNotice, setRescheduledNotice] = useState(null);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  const cityOptions = [
    'Bengaluru',
    'Mysuru',
    'Hubballi',
    'Mangaluru',
    'Belagavi',
    'Kalaburagi',
  ];

  const groupOptions = ['Solo', 'Couple', 'Friends', 'Family'];

  const vibeOptions = [
    { key: 'Heritage & Architecture', icon: Landmark },
    { key: 'Western Ghats & Nature', icon: Trees },
    { key: 'Coastal & Beaches', icon: Waves },
    { key: 'Spiritual & Temples', icon: Flame },
    { key: 'Food & Culture', icon: Coffee },
  ];

  const budgetPresets = [5000, 15000, 35000];

  // Toggle Vibe Multi-select
  const toggleVibe = (vibeKey) => {
    if (selectedVibes.includes(vibeKey)) {
      if (selectedVibes.length > 1) {
        setSelectedVibes(selectedVibes.filter((v) => v !== vibeKey));
      }
    } else {
      setSelectedVibes([...selectedVibes, vibeKey]);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setRescheduledNotice(null);

    try {
      const generated = await generateItinerary({
        startingCity,
        durationDays,
        budget,
        groupType,
        travelVibe: selectedVibes,
        pace,
        monsoonAlert,
        soloSafe,
        familyFriendly,
        seniorAccess,
        offbeat,
      });
      setItinerary(generated || FALLBACK_KARNATAKA_ITINERARY);
    } catch (err) {
      console.warn('Using authentic fallback circuit:', err);
      setItinerary(FALLBACK_KARNATAKA_ITINERARY);
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById('itinerary-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  // Namma Yatra Karnataka Prompt Execution
  const handleNammaYatraExecutePlan = async (promptText) => {
    setLoading(true);
    setRescheduledNotice(null);

    const lower = (promptText || '').toLowerCase();

    // Check specific Karnataka circuits for instant rich response
    if (lower.includes('gokarna') || lower.includes('beach') || lower.includes('murudeshwar')) {
      setTimeout(() => {
        setItinerary({
          ...FALLBACK_KARNATAKA_ITINERARY,
          title: 'Coastal Karnataka: Gokarna Beach Trail & Murudeshwar',
          totalBudget: 12000,
          overview:
            'A breathtaking coastal journey exploring the sacred cliffs of Gokarna, the pristine shores of Om Beach & Kudle Beach, and the colossal Arabian Sea Shiva statue in Murudeshwar.',
          festivalAlert: {
            active: true,
            name: 'Mahashivaratri at Mahabaleshwar Temple, Gokarna',
            tip: 'Witness grand sea-facing temple chariot processions at Car Street, Gokarna.',
          },
          days: [
            {
              day: 1,
              theme: 'Sacred Shores & Sunset Cliffs of Gokarna',
              activities: [
                {
                  time: 'Morning',
                  place: 'Mahabaleshwar Temple & Kotitirtha',
                  lat: 14.5428,
                  lng: 74.3184,
                  cost: 0,
                  desc: '4th-century sacred granite shrine housing the revered Atmalinga on the Arabian Sea coast.',
                  audioStory:
                    'Legend says Ravana was tricked into placing the holy Atmalinga here by Ganesha disguised as a young cowherd, rooting it eternally into the sands.',
                  crowdPrediction: 'Early morning 7:00 AM – 9:00 AM has shortest queue',
                  accessibilityNote: 'Paved corridors; modest temple attire required',
                },
                {
                  time: 'Afternoon',
                  place: 'Kudle Beach Seafood Trail',
                  lat: 14.5323,
                  lng: 74.3168,
                  cost: 150,
                  desc: 'Leisurely beach walk and coastal seafood dining under coconut palms overlooking turquoise waves.',
                  audioStory:
                    'Kudle Beach forms a crescent valley between two rugged cliffs, offering an idyllic escape praised by coastal travelers worldwide.',
                  crowdPrediction: 'Shaded beach shacks serve fresh fish fry and tender coconut',
                  accessibilityNote: 'Hill track descent requires comfortable walking shoes',
                },
                {
                  time: 'Evening',
                  place: 'Om Beach Cliffside Walk & Sunset',
                  lat: 14.5199,
                  lng: 74.3157,
                  cost: 50,
                  desc: 'Climb the rocky promontory where two semi-circular coves naturally join to form the sacred Hindu "ॐ" (Om) symbol.',
                  audioStory:
                    'Om Beach is world-famous for its natural geological shape mirroring the sacred syllable, surrounded by black laterite rock formations.',
                  crowdPrediction: 'Peak golden hour 5:30 PM; lifeguard patrols on duty',
                  accessibilityNote: 'Paved steps leading from parking to beach level',
                },
              ],
            },
            {
              day: 2,
              theme: 'Coastal Grandeur & Murudeshwar Ocean Shiva',
              activities: [
                {
                  time: 'Morning',
                  place: 'Murudeshwar Shiva Temple & 20-Story Raja Gopura',
                  lat: 14.0942,
                  lng: 74.4899,
                  cost: 50,
                  desc: 'Take the high-speed lift to the 18th floor of the Raja Gopura for a panoramic view of the 123-foot ocean-facing Shiva statue.',
                  audioStory:
                    'Built atop the Kanduka Giri cliff, Murudeshwar is surrounded on three sides by the waters of the Arabian Sea.',
                  crowdPrediction: 'Lift line shortest before 9:30 AM',
                  accessibilityNote: 'Full elevator access inside the Raja Gopura',
                },
                {
                  time: 'Afternoon',
                  place: 'Maravanthe Beach Coastal Highway (NH 66)',
                  lat: 13.7058,
                  lng: 74.6467,
                  cost: 0,
                  desc: 'One of India\'s most scenic drives where the Arabian Sea rolls on your right and the Souparnika River flows on your left.',
                  audioStory:
                    'Immortalized in classic Kannada movies, Maravanthe is a unique geological wonder where fresh river water runs parallel to sea surf.',
                  crowdPrediction: 'Constant gentle sea breezes; roadside viewpoints open',
                  accessibilityNote: 'Wide roadside parking promenade with ramp',
                },
                {
                  time: 'Evening',
                  place: 'Malpe Beach & Sea Walk Way',
                  lat: 13.3525,
                  lng: 74.7042,
                  cost: 40,
                  desc: 'Stroll along the 500-meter paved sea walk into the Arabian Sea with views of St. Mary\'s basaltic islands.',
                  audioStory:
                    'St. Mary\'s Island was declared a National Geological Monument for its columnar rhyolitic lava formed over 88 million years ago.',
                  crowdPrediction: 'Sunset is social and festive; local food shacks active',
                  accessibilityNote: 'Paved sea walk is fully wheelchair accessible',
                },
              ],
            },
            {
              day: 3,
              theme: 'Udupi Heritage & Temple Cuisine',
              activities: [
                {
                  time: 'Morning',
                  place: 'Udupi Sri Krishna Temple & Kanakana Kindi',
                  lat: 13.3409,
                  lng: 74.7515,
                  cost: 0,
                  desc: '13th-century shrine founded by saint Madhvacharya where Lord Krishna is viewed through a silver-plated 9-hole window.',
                  audioStory:
                    'Legend says the idol turned around on its own to face the outer wall so the devout saint Kanakadasa, who was barred entry, could receive darshana.',
                  crowdPrediction: 'Maha Pooja at 9:00 AM; free temple Prasadam lunch served at noon',
                  accessibilityNote: 'Level temple quadrangle; wheelchairs available',
                },
                {
                  time: 'Afternoon',
                  place: 'Mitra Samaj & Wood-Fired Masala Dosa',
                  lat: 13.3415,
                  lng: 74.752,
                  cost: 120,
                  desc: 'Sample the world\'s original Udupi Masala Dosa served with coconut chutney and authentic filter coffee.',
                  audioStory:
                    'Mitra Samaj, operating since 1949 beside Krishna Mutt, pioneered the globally beloved Udupi vegetarian restaurant tradition.',
                  crowdPrediction: 'Busy around lunch hours; fast table turnaround',
                  accessibilityNote: 'Ground-floor heritage restaurant',
                },
                {
                  time: 'Evening',
                  place: 'Kaup (Kapu) Lighthouse & Beach Sunset',
                  lat: 13.2241,
                  lng: 74.7366,
                  cost: 50,
                  desc: 'Historic 1901 stone lighthouse built atop a monolithic granite rock overlooking the roaring coastline.',
                  audioStory:
                    'Standing 89 feet tall, the Kaup lighthouse lantern was cast in Birmingham, England, and still guides Arabian Sea fishing trawlers.',
                  crowdPrediction: 'Lighthouse opens 4:00 PM – 6:00 PM for viewing gallery',
                  accessibilityNote: 'Beach has wooden ramp; stairs to lighthouse tower',
                },
              ],
            },
          ],
        });
        setLoading(false);
        setTimeout(() => {
          document.getElementById('itinerary-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }, 700);
      return;
    }

    // Default or dynamic tailored Karnataka circuit via Gemini
    try {
      const generated = await generateItinerary({
        startingCity: lower.includes('mysuru')
          ? 'Mysuru'
          : lower.includes('coorg')
          ? 'Madikeri'
          : lower.includes('hubballi')
          ? 'Hubballi'
          : lower.includes('mangaluru')
          ? 'Mangaluru'
          : startingCity,
        durationDays: promptText.match(/\b([1-7])\s*day/i)
          ? parseInt(promptText.match(/\b([1-7])\s*day/i)[1], 10)
          : durationDays,
        budget,
        groupType,
        travelVibe: selectedVibes,
        pace,
        monsoonAlert,
        soloSafe,
        familyFriendly,
        seniorAccess,
        offbeat,
      });
      setItinerary(generated || FALLBACK_KARNATAKA_ITINERARY);
    } catch (err) {
      console.warn('Karnataka itinerary fallback:', err);
      setItinerary(FALLBACK_KARNATAKA_ITINERARY);
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById('itinerary-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  // 4. Dynamic Rescheduling Trigger
  const handleDynamicReschedule = () => {
    setLoading(true);
    setTimeout(() => {
      setItinerary((prev) => ({
        ...prev,
        title: `Rescheduled Weather-Safe Safari: ${startingCity} Circuit`,
        overview: `Updated for monsoon shower buffers and low-crowd visiting slots. Outdoor viewpoint visits shifted to morning; covered heritage corridors prioritized during afternoon showers.`,
      }));
      setRescheduledNotice('Plan dynamically adapted: Afternoon Western Ghats trails replaced with sheltered heritage corridors and covered palace visits.');
      setLoading(false);
      setTimeout(() => setRescheduledNotice(null), 6000);
    }, 800);
  };

  // Audio Lore Playback for each activity
  const handlePlayLore = (storyText, uniqueId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (activeAudioIndex === uniqueId) {
      window.speechSynthesis.cancel();
      setActiveAudioIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(storyText);
    utterance.rate = 0.92;
    utterance.onend = () => setActiveAudioIndex(null);
    utterance.onerror = () => setActiveAudioIndex(null);

    setActiveAudioIndex(uniqueId);
    window.speechSynthesis.speak(utterance);
  };

  // PDF Export
  const handleExportPDF = async () => {
    const element = document.getElementById('travel-pass-export');
    if (!element) return;

    setIsExportingPdf(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 1.8,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Namma_Yatra_${startingCity}_100_Features_Pass.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Flatten itinerary activities for the Map component
  const placesForMap = itinerary?.days
    ? itinerary.days.flatMap((day) =>
        (day.activities || day.schedule || []).map((item) => ({
          ...item,
          place: `${item.place} (Day ${day.day})`,
        }))
      )
    : [];

  // Calculate Budget Split amounts in ₹
  const totalCost = itinerary?.totalBudget || itinerary?.estimatedCost || budget;
  const currSymbol = itinerary?.currencySymbol || '₹';
  const split = itinerary?.budgetSplit || { travel: 35, stay: 35, food: 20, activities: 10 };
  const travelAmt = Math.round((totalCost * split.travel) / 100);
  const stayAmt = Math.round((totalCost * split.stay) / 100);
  const foodAmt = Math.round((totalCost * split.food) / 100);
  const activitiesAmt = Math.round((totalCost * split.activities) / 100);

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans antialiased selection:bg-emerald-300 selection:text-emerald-950">
      {/* Namma Yatra AI Travel Concierge Hero Section (Exact Design & Karnataka Focus) */}
      <NammaYatraHero
        onExecutePlan={handleNammaYatraExecutePlan}
        isLoading={loading}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'kn' : 'en')}
      />

      {/* Main Features & Dashboard Container */}
      <main id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Feature Suite Tabs & Global Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="bg-white p-2 rounded-3xl border border-stone-200 shadow-xs flex overflow-x-auto gap-1 scrollbar-none flex-1">
            {[
              { id: 'itinerary', label: lang === 'kn' ? 'ಪ್ರವಾಸ & ನಕ್ಷೆ' : 'Itinerary & Maps', icon: Compass },
              { id: 'culture', label: lang === 'kn' ? 'ಸಂಸ್ಕೃತಿ & ಪರಂಪರೆ' : 'Cultural Immersion', icon: Landmark },
              { id: 'transit', label: lang === 'kn' ? 'ಸಾರಿಗೆ & ಘಾಟಿ' : 'Smart Transit', icon: Bus },
              { id: 'wildlife', label: lang === 'kn' ? 'ವನ್ಯಜೀವಿ & ಸಫಾರಿ' : 'Wildlife & Nature', icon: Trees },
              { id: 'dining', label: lang === 'kn' ? 'ದರ್ಶಿನಿ & ಖಾನಾವಳಿ' : 'Dining & Stays', icon: Utensils },
              { id: 'safety', label: lang === 'kn' ? 'ಪೊಲೀಸ್ SOS & ಸುರಕ್ಷತೆ' : 'Safety & SOS', icon: ShieldAlert },
              { id: 'finance', label: lang === 'kn' ? 'ವೆಚ್ಚ & ವಿಶ್ಲೇಷಣೆ' : 'Finance & Analytics', icon: PieChart },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0c2e28] to-emerald-700 text-white shadow-md'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bilingual Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
            title="Toggle English / Kannada"
          >
            <Languages className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'en' ? 'English ⇋ ಕನ್ನಡ' : 'ಕನ್ನಡ ⇋ English'}</span>
          </button>
        </div>

        {/* Tab 1: Itinerary & Map Controls */}
        {activeTab === 'itinerary' && (
          <section className="space-y-8">
            {/* Toggleable Advanced Logistics & Tuning Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/90 overflow-hidden">
              <div
                onClick={() => setShowAdvancedControls(!showAdvancedControls)}
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                      <span>Custom Logistics &amp; Filter Tuning</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Optional
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Fine-tune source city, budget presets, group persona, vibes, and weather modes.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 flex items-center gap-1.5 bg-stone-50"
                >
                  <span>{showAdvancedControls ? 'Hide Controls' : 'Tune Filters'}</span>
                  {showAdvancedControls ? (
                    <ChevronUp className="w-4 h-4 text-stone-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-600" />
                  )}
                </button>
              </div>

              {showAdvancedControls && (
                <div className="p-6 sm:p-8 pt-0 border-t border-stone-100 space-y-6">
              <div className="max-w-3xl mb-6 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-widest mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Personalized Itinerary Generation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {t.formHeading}
                </h2>
                <p className="text-sm text-stone-600 mt-1">{t.formSubheading}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 1. Source City */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span>{t.sourceCity}</span>
                    </label>
                    <select
                      value={startingCity}
                      onChange={(e) => setStartingCity(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-2xl px-3.5 py-3 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer shadow-xs"
                    >
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {t.cities[city] || city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Duration Slider (1 to 7 Days) */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t.duration}</span>
                      </label>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        {durationDays} {durationDays === 1 ? t.dayUnit : t.daysUnit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600 mt-2"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-bold">
                      <span>1 {t.dayUnit}</span>
                      <span>4 {t.daysUnit}</span>
                      <span>7 {t.daysUnit}</span>
                    </div>
                  </div>

                  {/* 3. Budget with Quick Presets */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.budget}</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 text-sm font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="3000"
                        step="1000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full bg-stone-50 border border-stone-300 rounded-2xl pl-8 pr-3 py-2.5 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-xs"
                        required
                      />
                    </div>
                    {/* Presets */}
                    <div className="flex items-center gap-1.5 mt-2 text-[10px]">
                      <span className="text-stone-400 font-bold">{t.budgetPresets}</span>
                      {budgetPresets.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setBudget(amt)}
                          className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                            budget === amt
                              ? 'bg-red-600 text-white'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Group Persona */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.groupPersona}</span>
                    </label>
                    <select
                      value={groupType}
                      onChange={(e) => setGroupType(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-2xl px-3.5 py-3 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer shadow-xs"
                    >
                      {groupOptions.map((grp) => (
                        <option key={grp} value={grp}>
                          {t.personas[grp] || grp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Vibe Multi-select Pills */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t.travelVibe}</span>
                    </span>
                    <span className="text-[11px] text-stone-400 font-normal">
                      {lang === 'kn' ? 'ಆಯ್ಕೆಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to select multiple'}
                    </span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {vibeOptions.map(({ key, icon: IconComponent }) => {
                      const isSelected = selectedVibes.includes(key);
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => toggleVibe(key)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-br from-red-600 to-amber-600 text-white border-red-600 shadow-md scale-[1.02]'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{t.vibes[key] || key}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced Itinerary Controls */}
                <div className="pt-4 border-t border-stone-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-stone-700 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-red-600" />
                      <span>Advanced Itinerary Tuning</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    {/* Pace Customization */}
                    <button
                      type="button"
                      onClick={() => setPace(pace === 'express' ? 'relaxed' : 'express')}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                        pace === 'relaxed'
                          ? 'bg-amber-100 border-amber-300 text-amber-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      Pace: {pace === 'relaxed' ? 'Slow Travel' : 'Express'}
                    </button>

                    {/* Monsoon Travel Planner */}
                    <button
                      type="button"
                      onClick={() => setMonsoonAlert(!monsoonAlert)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        monsoonAlert
                          ? 'bg-blue-100 border-blue-400 text-blue-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <CloudRain className="w-3.5 h-3.5" />
                      <span>Monsoon Mode</span>
                    </button>

                    {/* Solo Safe Routes */}
                    <button
                      type="button"
                      onClick={() => setSoloSafe(!soloSafe)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        soloSafe
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Solo Safe</span>
                    </button>

                    {/* Family Friendly */}
                    <button
                      type="button"
                      onClick={() => setFamilyFriendly(!familyFriendly)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                        familyFriendly
                          ? 'bg-purple-100 border-purple-400 text-purple-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      Kid & Family
                    </button>

                    {/* Senior Accessibility */}
                    <button
                      type="button"
                      onClick={() => setSeniorAccess(!seniorAccess)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                        seniorAccess
                          ? 'bg-teal-100 border-teal-400 text-teal-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      Wheelchair Access
                    </button>

                    {/* Offbeat Finder */}
                    <button
                      type="button"
                      onClick={() => setOffbeat(!offbeat)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                        offbeat
                          ? 'bg-yellow-100 border-yellow-400 text-yellow-950'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      Offbeat Gems
                    </button>
                  </div>

                  {/* Nightlife vs Spiritual Toggle */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-stone-800">
                      Bengaluru Pub Culture ⇋ Serene Temple Vibe Balance:
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-64">
                      <span className="font-bold text-amber-700">🛕 Temples</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={nightlifeSpiritual}
                        onChange={(e) => setNightlifeSpiritual(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                      <span className="font-bold text-indigo-700">🍻 Nightlife</span>
                    </div>
                  </div>
                </div>

                {/* CTA & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:from-red-700 hover:to-amber-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        <span>{t.generatingCTA}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.generateCTA}</span>
                        <span className="text-xl">➔</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    {/* 4. Dynamic Reschedule Button */}
                    <button
                      type="button"
                      onClick={handleDynamicReschedule}
                      className="px-4 py-2.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                      <span>Reschedule for Rain / Flight Delay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItinerary(FALLBACK_KARNATAKA_ITINERARY);
                        setTimeout(() => {
                          document.getElementById('itinerary-results')?.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      }}
                      className="text-xs font-bold text-stone-500 hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer underline decoration-dotted"
                    >
                      <span>{t.sampleDataBtn}</span>
                    </button>
                  </div>
                </div>
              </form>
                </div>
              )}
            </div>

            {/* Dynamic Reschedule Notification */}
            {rescheduledNotice && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-300 text-blue-950 text-xs font-bold flex items-center gap-2 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{rescheduledNotice}</span>
              </div>
            )}

            {/* Results Dashboard Section */}
            {itinerary && (
              <div id="itinerary-results" className="space-y-8">
                {/* Top Pass Banner with Download PDF Button */}
                <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-5 rounded-3xl text-stone-900 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/90 flex items-center justify-center text-2xl shadow-sm shrink-0">
                      📜
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-stone-900 leading-tight">
                        {t.offlinePassBannerTitle}
                      </h3>
                      <p className="text-xs text-stone-800 font-medium mt-0.5">
                        {t.offlinePassBannerSub}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportPDF}
                    disabled={isExportingPdf}
                    className="w-full md:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    <Download className="w-4 h-4 text-yellow-400" />
                    <span>{isExportingPdf ? t.downloadingPdfBtn : t.downloadPdfBtn}</span>
                  </button>
                </div>

                {/* Printable & Exportable Travel Pass Container */}
                <div
                  id="travel-pass-export"
                  className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm"
                >
                  {/* Trip Overview & Budget Breakdown Card */}
                  <div className="bg-gradient-to-br from-amber-50/70 via-stone-50 to-red-50/50 p-6 sm:p-8 rounded-3xl border border-amber-200/80">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/60">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-xs">
                            {itinerary.days?.length || durationDays} {t.daysUnit}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-400 text-yellow-950 shadow-xs">
                            {t.personas[groupType] || groupType}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-stone-700 border border-stone-200">
                            {pace === 'relaxed' ? 'Slow Travel Pace' : 'Express Sightseeing'}
                          </span>
                          {selectedVibes.map((v) => (
                            <span
                              key={v}
                              className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-stone-700 border border-stone-200"
                            >
                              {t.vibes[v] || v}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                          {itinerary.title}
                        </h2>
                      </div>

                      {/* Total Cost Badge */}
                      <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm shrink-0 text-left lg:text-right">
                        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                          {t.estimatedCost}
                        </div>
                        <div className="text-3xl font-black text-emerald-700 mt-0.5">
                          {currSymbol}{totalCost.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-stone-400 font-medium">
                          {lang === 'kn' ? 'ಸಾರಿಗೆ, ವಸತಿ ಮತ್ತು ಪ್ರವೇಶ ಸಹಿತ' : 'Includes transit & stay estimates'}
                        </div>
                      </div>
                    </div>

                    {/* Itinerary Overview Narrative */}
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-5 font-normal">
                      {itinerary.overview}
                    </p>

                    {/* Transit Mode Selector Comparison Table */}
                    <div className="mt-6 pt-5 border-t border-amber-200/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Bus className="w-4 h-4 text-emerald-700" />
                          <span>Transit Mode Comparison (High-Speed Train vs Bus vs Private Cab)</span>
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {(itinerary.transitComparison || FALLBACK_KARNATAKA_ITINERARY.transitComparison).map((tc, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-stone-900">{tc.mode}</span>
                              <span className="font-black text-emerald-700">{currSymbol}{tc.cost}</span>
                            </div>
                            <div className="text-stone-500 font-medium">Duration: {tc.duration}</div>
                            <div className="text-[11px] text-stone-600 leading-tight">{tc.comfort}</div>
                            <a
                              href={tc.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 pt-1"
                            >
                              <span>Official Booking Portal</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget Split Visualizer */}
                    <div className="mt-6 pt-5 border-t border-amber-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <PieChart className="w-4 h-4 text-amber-600" />
                          <span>{t.budgetBreakdown}</span>
                        </h4>
                        <span className="text-xs font-bold text-stone-500 font-mono">
                          100% Calculated
                        </span>
                      </div>

                      <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-200 shadow-inner">
                        <div style={{ width: `${split.travel}%` }} className="bg-red-500" title={`Transit: ${split.travel}%`} />
                        <div style={{ width: `${split.stay}%` }} className="bg-amber-400" title={`Stay: ${split.stay}%`} />
                        <div style={{ width: `${split.food}%` }} className="bg-emerald-500" title={`Food: ${split.food}%`} />
                        <div style={{ width: `${split.activities}%` }} className="bg-indigo-500" title={`Activities: ${split.activities}%`} />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                          <div className="text-stone-500 flex items-center gap-1.5 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span>{t.budgetTravel} ({split.travel}%)</span>
                          </div>
                          <div className="font-black text-stone-900 mt-1">{currSymbol}{travelAmt.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                          <div className="text-stone-500 flex items-center gap-1.5 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span>{t.budgetStay} ({split.stay}%)</span>
                          </div>
                          <div className="font-black text-stone-900 mt-1">{currSymbol}{stayAmt.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                          <div className="text-stone-500 flex items-center gap-1.5 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>{t.budgetFood} ({split.food}%)</span>
                          </div>
                          <div className="font-black text-stone-900 mt-1">{currSymbol}{foodAmt.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                          <div className="text-stone-500 flex items-center gap-1.5 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                            <span>{t.budgetActivities} ({split.activities}%)</span>
                          </div>
                          <div className="font-black text-stone-900 mt-1">{currSymbol}{activitiesAmt.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Festival Alert Banner */}
                    {itinerary.festivalAlert?.active && (
                      <div className="mt-5 p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 flex items-start gap-3.5">
                        <div className="p-2 rounded-xl bg-amber-400 text-yellow-950 text-xl font-bold shrink-0">
                          🎉
                        </div>
                        <div>
                          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                            {t.festivalAlertTitle}
                          </div>
                          <div className="font-black text-sm sm:text-base text-stone-900 mt-0.5">
                            {itinerary.festivalAlert.name}
                          </div>
                          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                            {itinerary.festivalAlert.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Route Map */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-red-600" />
                        <span>{t.routeMapTitle}</span>
                      </h3>
                      <span className="text-xs text-stone-500 font-semibold">
                        {placesForMap.length} {t.routeMapSub}
                      </span>
                    </div>
                    <TravelMap places={placesForMap} />
                  </div>

                  {/* Day-by-Day Timeline Schedule with Features 7 (Crowd) & 11 (Accessibility) */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-600" />
                      <span>{t.dayPlanTitle}</span>
                    </h3>

                    <div className="space-y-6">
                      {itinerary.days?.map((dayObj) => {
                        const activities = dayObj.activities || dayObj.schedule || [];
                        return (
                          <div
                            key={`day-${dayObj.day}`}
                            className="border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-xs"
                          >
                            <div className="bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 px-6 py-4 text-white flex items-center justify-between flex-wrap gap-2">
                              <div className="font-extrabold text-base sm:text-lg flex items-center gap-2.5">
                                <span className="bg-white text-red-700 px-2.5 py-0.5 rounded-lg text-xs font-black shadow-xs">
                                  {t.dayLabel} {dayObj.day}
                                </span>
                                <span>{dayObj.theme}</span>
                              </div>
                              <span className="text-xs font-bold text-yellow-100">
                                {activities.length} Stops
                              </span>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                              {activities.map((act, actIdx) => {
                                const uniqueId = `day-${dayObj.day}-act-${actIdx}`;
                                const isPlaying = activeAudioIndex === uniqueId;

                                return (
                                  <div
                                    key={actIdx}
                                    className="p-5 rounded-2xl border border-stone-100 bg-stone-50/80 hover:bg-white hover:border-amber-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                                  >
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span
                                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                                            act.time?.toLowerCase().includes('morning')
                                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                              : act.time?.toLowerCase().includes('afternoon')
                                              ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                              : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                                          }`}
                                        >
                                          {act.time}
                                        </span>
                                        <span className="text-xs font-black text-stone-700 flex items-center gap-0.5">
                                          {act.cost ? `${currSymbol}${act.cost}` : t.freeLabel}
                                        </span>
                                      </div>

                                      <h4 className="font-bold text-stone-900 text-sm leading-snug">
                                        {act.place}
                                      </h4>

                                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                                        {act.desc}
                                      </p>

                                      {/* Real-Time Crowd Prediction */}
                                      {act.crowdPrediction && (
                                        <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center gap-1.5 font-medium">
                                          <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                          <span>{act.crowdPrediction}</span>
                                        </div>
                                      )}

                                      {/* Senior & Wheelchair Accessibility Note */}
                                      {act.accessibilityNote && (
                                        <div className="text-[11px] text-teal-900 bg-teal-50 p-2 rounded-xl border border-teal-200 flex items-center gap-1.5 font-medium">
                                          <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                                          <span>{act.accessibilityNote}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Historical Lore Audio Player */}
                                    {act.audioStory && (
                                      <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/70 space-y-2">
                                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
                                          <span className="flex items-center gap-1">
                                            <Sparkles className="w-3 h-3 text-red-600" />
                                            <span>{t.audioStoryLabel}</span>
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => handlePlayLore(act.audioStory, uniqueId)}
                                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer ${
                                              isPlaying
                                                ? 'bg-red-600 text-white animate-pulse'
                                                : 'bg-amber-200 hover:bg-amber-300 text-amber-950'
                                            }`}
                                          >
                                            {isPlaying ? (
                                              <>
                                                <VolumeX className="w-3 h-3" />
                                                <span>{t.stopBtn}</span>
                                              </>
                                            ) : (
                                              <>
                                                <Volume2 className="w-3 h-3" />
                                                <span>{t.listenBtn}</span>
                                              </>
                                            )}
                                          </button>
                                        </div>
                                        <p className="text-[11px] text-stone-600 italic leading-snug">
                                          "{act.audioStory}"
                                        </p>
                                      </div>
                                    )}

                                    <div className="text-[10px] text-stone-400 font-mono pt-1 border-t border-stone-200/50">
                                      GPS: {act.lat?.toFixed(3)}, {act.lng?.toFixed(3)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 17. Kannada Survival Kit Component */}
                  <div className="pt-6 border-t border-stone-200">
                    <KannadaSurvivalKit
                      phrases={itinerary.kannadaSurvivalKit || itinerary.kannadaHelper}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Cultural & Heritage Hub (Features 16-30) */}
        {activeTab === 'culture' && <CulturalHub lang={lang} />}

        {/* Tab 3: Smart Transit & Roads (Features 31-45) */}
        {activeTab === 'transit' && <SmartTransitHub lang={lang} />}

        {/* Tab 4: Wildlife & Eco-Tourism (Features 46-60) */}
        {activeTab === 'wildlife' && <EcoWildlifeHub lang={lang} />}

        {/* Tab 5: Dining & Stays (Features 61-75) */}
        {activeTab === 'dining' && <DiningStayHub lang={lang} />}

        {/* Tab 6: Safety, Health & SOS (Features 76-90) */}
        {activeTab === 'safety' && <SafetyHealthHub lang={lang} />}

        {/* Tab 7: Finance & Analytics (Features 91-100) */}
        {activeTab === 'finance' && <FinanceAnalyticsHub itinerary={itinerary} lang={lang} />}
      </main>

      {/* Global App Footer */}
      <footer className="mt-12 bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        <p>{t.footerText}</p>
        <p className="mt-1 text-[11px] text-stone-400">
          Smart AI Tourism Platform • NIE Mysuru Hackathon 2026
        </p>
      </footer>

      {/* Autonomous Real-Time AI Agent Drawer ("Namma Sanchari") */}
      <AgentDrawer
        currentItinerary={itinerary}
        onItineraryUpdate={setItinerary}
      />

      {/* Firebase Real-Time Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
