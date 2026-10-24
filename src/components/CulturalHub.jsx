import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Calendar,
  AlertTriangle,
  BookOpen,
  Camera,
  UserCheck,
  Home,
  Users,
  Coffee,
  History,
  Palette,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function CulturalHub({ lang = 'en' }) {
  const [playingStory, setPlayingStory] = useState(null);
  const [selectedEra, setSelectedEra] = useState('hoysala');
  const [activeArchStyle, setActiveArchStyle] = useState('hoysala');

  const playTTS = (text, key) => {
    if (!('speechSynthesis' in window)) return;
    if (playingStory === key) {
      window.speechSynthesis.cancel();
      setPlayingStory(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.9;
    utt.onend = () => setPlayingStory(null);
    utt.onerror = () => setPlayingStory(null);
    setPlayingStory(key);
    window.speechSynthesis.speak(utt);
  };

  // 18. Heritage Storytelling Audio Clips
  const stories = [
    {
      id: 'hampi',
      title: lang === 'kn' ? 'ಹಂಪಿ ವಿಜಯ ವಿಠ್ಠಲ ಕಲ್ಲಿನ ರಥ' : 'Hampi: The Musical Pillars of Vijaya Vittala',
      place: 'Hampi, Bellary',
      lore: 'The 56 musical pillars produce sapthaswara notes when tapped gently. The iconic monolithic stone chariot honors Garuda and its wheels once rotated freely on stone axles.',
    },
    {
      id: 'mysore',
      title: lang === 'kn' ? 'ಮೈಸೂರು ಅರಮನೆಯ ಇತಿಹಾಸ' : 'Mysore Palace: The Golden Throne & Illuminations',
      place: 'Mysuru',
      lore: 'Built after the original wooden palace burnt in 1897, Ambavilas Palace features Belgian stained glass, Glasgow cast-iron, and is illuminated by exactly 100,000 golden bulbs during Dasara.',
    },
    {
      id: 'belur',
      title: lang === 'kn' ? 'ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ಶಿಲಾಬಾಲಿಕೆಯರು' : 'Belur: The Celestial Dancers of Chennakeshava',
      place: 'Belur, Hassan',
      lore: 'Commissioned by King Vishnuvardhana in 1117 CE, master sculptor Jakanachari carved 42 bracket figurines of dancers with stone jewelry so delicately perforated that pins pass through them.',
    },
  ];

  // 19. Handicrafts & Shopping Guide
  const handicrafts = [
    {
      craft: 'Channapatna Wooden Toys',
      district: 'Ramanagara (Bangalore-Mysore Highway)',
      giTag: 'GI Tagged Since 2006',
      desc: 'Ivory wood toys colored with organic vegetable dyes and lacquer. Introduced under Tipu Sultan with Persian artisans.',
      recommended: 'Bharat Art & Crafts, Channapatna Craft Park',
    },
    {
      craft: 'KSIC Mysore Crepe Silk',
      district: 'Mysuru / Bengaluru',
      giTag: 'GI Tagged Pure Zari',
      desc: 'Woven with 100% pure gold zari and natural mulberry silk from Karnataka sericulture farmers.',
      recommended: 'Government Silk Weaving Factory, Mananthody Road, Mysuru',
    },
    {
      craft: 'Karnataka Sandalwood Artifacts & Oil',
      district: 'Mysuru & Shimoga',
      giTag: 'State Forest Monopoly',
      desc: 'Genuine Santalum album carvings and pure distilled sandalwood oil with unique calming aroma.',
      recommended: 'Cauvery Handicrafts Emporium (Govt of Karnataka)',
    },
  ];

  // 20. Local Festival Tracker
  const festivals = [
    {
      name: 'Kambala (Coastal Buffalo Racing)',
      season: 'November to March',
      locations: 'Moodabidri, Udupi, Mangaluru',
      type: 'Folk Sport & Agrarian Ritual',
      tip: 'Arrive at early dusk to watch slush track sprint trials. Bring ear protection for the drumbeats.',
    },
    {
      name: 'Yakshagana Night Shows',
      season: 'Year-Round (Winter Open Air)',
      locations: 'Udupi, Dharmasthala, Kundapura',
      type: 'Traditional Theater Dance',
      tip: 'All-night performances narrating epics like Mahabharata with flamboyant headgear and vigorous dance.',
    },
    {
      name: 'Mysuru Dasara & Jumbo Savari',
      season: 'Ashwin Month (Sept / Oct)',
      locations: 'Mysuru Palace & Banni Mantapa',
      type: 'State Festival (Nada Habba)',
      tip: 'Watch the caparisoned elephant carrying the 750 kg golden howdah of Goddess Chamundeshwari.',
    },
  ];

  // 21. Temple Dress Code Alerts
  const dressCodes = [
    {
      temple: 'Kukke Subrahmanya & Dharmasthala',
      code: 'Strict Mandatory Traditional Attire',
      rules: 'Men: Dhoti / Mundu (shirts must be removed before entering sanctum). Women: Saree or Churidar with Dupatta. No jeans, shorts, or western casuals.',
      tag: 'Mandatory',
    },
    {
      temple: 'Kollur Mookambika Temple',
      code: 'Traditional Indian Attire',
      rules: 'Men: Dhoti and Angavastram. Women: Traditional Indian dress. Footwear & leather belts prohibited inside main courtyard.',
      tag: 'Strictly Enforced',
    },
    {
      temple: 'Chamundeshwari Temple (Chamundi Hill)',
      code: 'Modest Clothing',
      rules: 'Covered shoulders and knees. Photography strictly prohibited inside sanctum sanctorum.',
      tag: 'Modest Attire',
    },
  ];

  // 23. Architectural Style Decoder
  const archStyles = {
    hoysala: {
      name: 'Hoysala Architecture (11th-14th Century)',
      signature: 'Stellate (Star-shaped) plans, chloritic schist (soapstone), horizontal friezes of carved elephants, lions, and epics.',
      examples: 'Belur Chennakeshava, Halebidu Hoysaleshwara, Somanathapura Keshava Temple.',
      hallmark: 'Intricate micro-filigree stone lace work and sculpted signatures of master architects like Jakanachari and Ruvari Mallitamma.',
    },
    vijayanagara: {
      name: 'Vijayanagara Imperial Style (14th-16th Century)',
      signature: 'Massive granite monoliths, stepped Kalyana Mandapas, Yali (mythical lion) pillared corridors, towering Raya Gopuras.',
      examples: 'Hampi Virupaksha, Vijaya Vittala, Lepakshi border temples.',
      hallmark: 'Musical acoustic stone pillars, monolithic sculptures like Narasimha and Kadalekalu Ganesha.',
    },
    chalukya: {
      name: 'Badami Chalukya & Rashtrakuta (6th-10th Century)',
      signature: 'Rock-cut cave temples chiseled into red sandstone cliffs, transitional Dravida & Nagara vimanas.',
      examples: 'Badami Cave Temples, Aihole Lad Khan, Pattadakal UNESCO complex.',
      hallmark: 'Cradle of South Indian temple architecture with 16-armed Nataraja and reclining Vishnu carved into cliff-face caves.',
    },
  };

  // 28. Historical Timeline
  const timelineEras = {
    kadamba: {
      title: 'Kadamba Dynasty (345 – 540 CE)',
      capital: 'Banavasi',
      heritage: 'Earliest indigenous Karnataka empire; pioneers of Kadamba script and stone temples.',
    },
    chalukya: {
      title: 'Badami Chalukyas (543 – 753 CE)',
      capital: 'Vatapi (Badami)',
      heritage: 'Created rock-cut marvels and the fusion architectural school at Aihole and Pattadakal.',
    },
    hoysala: {
      title: 'Hoysala Empire (1026 – 1343 CE)',
      capital: 'Dwarasamudra (Halebidu)',
      heritage: 'Pinnacle of soapstone filigree architecture; built over 1,500 temples across southern Karnataka.',
    },
    vijayanagara: {
      title: 'Vijayanagara Empire (1336 – 1646 CE)',
      capital: 'Hampi (Vijayanagara)',
      heritage: 'One of the wealthiest global empires in the 15th century, described by Persian and Portuguese travelers.',
    },
    wadiyar: {
      title: 'Wadiyars of Mysore (1399 – 1950 CE)',
      capital: 'Mysuru',
      heritage: 'Patrons of Carnatic music, Mysore painting, irrigation under Sir MV, and public universities.',
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-200 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Cultural & Local Experience Enrichment</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ಮತ್ತು ಅನುಭವಗಳು' : 'Karnataka Heritage & Cultural Immersion'}
          </h3>
          <p className="text-xs text-amber-100 mt-1">
            Heritage audio lore, dress codes, Yakshagana, artisanal crafts, and architectural decoders.
          </p>
        </div>
      </div>

      {/* Heritage Storytelling Audio Guides */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-700">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Heritage Storytelling Audio Guide (ಹಂಪಿ & ಮೈಸೂರು ಆಡಿಯೋ ಗೈಡ್)
              </h4>
              <p className="text-xs text-stone-500">
                Location-aware historical audio guides narrated with browser-native Web Speech synthesis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stories.map((st) => (
            <div
              key={st.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                playingStory === st.id
                  ? 'border-red-500 bg-red-50/30 ring-2 ring-red-100 shadow-md'
                  : 'border-stone-200 bg-stone-50/70 hover:border-amber-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {st.place}
                </span>
                <h5 className="font-bold text-stone-900 text-sm mt-2">{st.title}</h5>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{st.lore}</p>
              </div>

              <button
                type="button"
                onClick={() => playTTS(st.lore, st.id)}
                className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  playingStory === st.id
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-stone-900 hover:bg-black text-white'
                }`}
              >
                {playingStory === st.id ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Stop Story Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio Guide</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Temple Dress Code Alerts & Festival Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temple Dress Code Alerts */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Temple Dress Code Alerts (ದೇವಾಲಯ ವಸ್ತ್ರ ಸಂಹಿತೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Mandatory attire notifications before visiting sacred Karnataka shrines.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {dressCodes.map((dc, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">{dc.temple}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    {dc.tag}
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-900">{dc.code}</div>
                <p className="text-xs text-stone-600 leading-snug">{dc.rules}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Festival Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-100 text-yellow-900">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Local Festival Tracker (ಕಂಬಳ, ಯಕ್ಷಗಾನ, ದಸರಾ)
              </h4>
              <p className="text-xs text-stone-500">
                Live seasonal calendar for regional cultural shows and folk festivals.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {festivals.map((fest, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">{fest.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                    {fest.season}
                  </span>
                </div>
                <div className="text-xs text-amber-800 font-medium">📍 {fest.locations}</div>
                <p className="text-xs text-stone-600">{fest.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architectural Style Decoder */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Architectural Style Decoder (ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿ ವಿಶ್ಲೇಷಣೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Understand the architectural DNA of Karnataka's UNESCO and ASI temples.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {Object.keys(archStyles).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setActiveArchStyle(k)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeArchStyle === k
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
          <h5 className="font-extrabold text-stone-900 text-base">{archStyles[activeArchStyle].name}</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block mb-1">Key Characteristics:</span>
              <p className="text-stone-700 leading-relaxed">{archStyles[activeArchStyle].signature}</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block mb-1">Signature Hallmark:</span>
              <p className="text-stone-700 leading-relaxed">{archStyles[activeArchStyle].hallmark}</p>
            </div>
          </div>
          <div className="text-xs text-stone-600 pt-1">
            <span className="font-bold text-purple-900">Prime Locations: </span>
            {archStyles[activeArchStyle].examples}
          </div>
        </div>
      </div>

      {/* Historical Timeline Visualizer */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base">
              Historical Timeline Visualizer (ಕರ್ನಾಟಕ ರಾಜವಂಶಗಳ ಇತಿಹಾಸ)
            </h4>
            <p className="text-xs text-stone-500">
              Evolution of Karnataka's rulers from the ancient Kadambas to the Kingdom of Mysore.
            </p>
          </div>
        </div>

        {/* Timeline Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
          {Object.keys(timelineEras).map((eraKey) => (
            <button
              key={eraKey}
              type="button"
              onClick={() => setSelectedEra(eraKey)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedEra === eraKey
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {timelineEras[eraKey].title.split('(')[0].trim()}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800">
          <h5 className="font-black text-lg text-amber-950">{timelineEras[selectedEra].title}</h5>
          <div className="text-xs font-bold text-amber-800 mb-2">
            Ancient Capital: {timelineEras[selectedEra].capital}
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {timelineEras[selectedEra].heritage}
          </p>
        </div>
      </div>

      {/* Handicrafts & Shopping Guide */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base">
              Handicraft & Authentic Shopping Guide (ಕರಕುಶಲ ಮತ್ತು ರೇಷ್ಮೆ ಮಳಿಗೆಗಳು)
            </h4>
            <p className="text-xs text-stone-500">
              Verified state emporiums for GI-tagged Channapatna wooden lacquer toys, Mysore Silk, and Sandalwood.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {handicrafts.map((hc, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900">{hc.craft}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {hc.giTag}
                </span>
              </div>
              <div className="text-[11px] text-stone-500 font-semibold">📍 {hc.district}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{hc.desc}</p>
              <div className="pt-2 border-t border-stone-200 text-[11px] text-emerald-900 font-medium">
                <span className="font-bold">Verified: </span>
                {hc.recommended}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Experiences Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Homestays */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Home className="w-4 h-4 text-amber-600" />
            <span>Malnad Homestay Filter</span>
          </div>
          <p className="text-xs text-stone-600">
            Authentic Kodava & Malnad family stays with home-cooked Akki Rotti and filter kaapi.
          </p>
          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md inline-block">
            Verified Homestays Active
          </span>
        </div>

        {/* Plantation Walk */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Coffee className="w-4 h-4 text-amber-700" />
            <span>Coffee & Tea Tours</span>
          </div>
          <p className="text-xs text-stone-600">
            Walk through Arabica plantations, cup tastings in Chikkamagaluru & Madikeri.
          </p>
          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md inline-block">
            Tasting Slots Available
          </span>
        </div>

        {/* Traditional Art */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Palette className="w-4 h-4 text-purple-600" />
            <span>Chittara Painting</span>
          </div>
          <p className="text-xs text-stone-600">
            Workshops for Deewaru tribal wall murals made from rice paste & red clay in Shimoga.
          </p>
          <span className="text-[10px] text-purple-800 font-bold bg-purple-100 px-2 py-0.5 rounded-md inline-block">
            Artisanal Guild
          </span>
        </div>

        {/* Local Markets */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Clock className="w-4 h-4 text-red-600" />
            <span>Devaraja Market Hours</span>
          </div>
          <p className="text-xs text-stone-600">
            Best visiting window: 7:30 AM to 9:30 AM for fresh jasmine and flower auction photography.
          </p>
          <span className="text-[10px] text-red-800 font-bold bg-red-100 px-2 py-0.5 rounded-md inline-block">
            Golden Hour Alert
          </span>
        </div>
      </div>
    </div>
  );
}

