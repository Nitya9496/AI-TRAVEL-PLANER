import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  X,
  User,
  LogOut,
  Languages,
  Compass,
  Landmark,
  Trees,
  Bus,
  ShieldCheck,
} from 'lucide-react';

export default function NammaYatraHero({
  onExecutePlan,
  isLoading,
  currentUser,
  onOpenAuth,
  onSignOut,
  lang = 'en',
  onToggleLang,
}) {
  const [promptText, setPromptText] = useState(
    'I want to spend 4 days in Mysuru & Coorg focusing on royal heritage, coffee estates, and waterfalls...'
  );

  // Modals for nav links
  const [activeModal, setActiveModal] = useState(null); // 'destinations' | 'howItWorks' | 'pricing' | null

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onExecutePlan(promptText.trim());
  };

  const handleSelectDestination = (destPrompt) => {
    setPromptText(destPrompt);
    setActiveModal(null);
    onExecutePlan(destPrompt);
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden">
      {/* Background Aerial Coastal & Mountain Landscape */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('/hero-coastal.jpg'), url('/karnataka-coastal.png'), linear-gradient(135deg, #0e3b43 0%, #1e3a8a 100%)`,
        }}
      >
        {/* Subtle cinematic gradient overlays for depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/65" />
      </div>

      {/* Floating Pill Navigation Bar (Identical Layout & Aesthetic) */}
      <header className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full px-5 sm:px-8 py-3 shadow-2xl border border-white/60 flex items-center justify-between gap-4">
          {/* Left Brand: Official Karnataka Emblem + NAMMA YATRA with Flag Accent */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-xs overflow-hidden p-0.5 border border-amber-300/80">
              <img
                src="/karnataka-emblem.png"
                alt="Government of Karnataka Emblem"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-widest text-lg sm:text-xl text-[#0c2e28] font-sans">
                  NAMMA YATRA
                </span>
                {/* Karnataka Flag Badge */}
                <div className="hidden sm:flex items-center text-[9px] font-black rounded overflow-hidden shadow-xs border border-amber-300">
                  <span className="bg-yellow-400 text-yellow-950 px-1 py-0.2">ಕರ್ನಾಟಕ</span>
                  <span className="bg-red-600 text-white px-1 py-0.2">KARNATAKA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveModal('destinations')}
              className="text-emerald-900 font-bold border-b-2 border-emerald-700 pb-0.5 cursor-pointer hover:text-emerald-950 transition-colors"
            >
              Destinations
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('howItWorks')}
              className="text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
            >
              How it Works
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('pricing')}
              className="text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
            >
              Travel Pass
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-all flex items-center gap-1 cursor-pointer"
              title="Toggle English / Kannada"
            >
              <Languages className="w-3.5 h-3.5 text-red-600" />
              <span>{lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-stone-100 py-1 px-2.5 rounded-full border border-stone-200">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-bold text-stone-800 hidden sm:inline-block max-w-[85px] truncate">
                  {currentUser.displayName || currentUser.email?.split('@')[0] || 'Yatri'}
                </span>
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Sign Out"
                  className="p-1 hover:text-red-600 text-stone-500 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="text-stone-700 hover:text-stone-950 font-bold text-xs sm:text-sm cursor-pointer transition-colors px-1"
              >
                Login
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('namma-prompt-input');
                if (el) {
                  el.focus();
                  el.select();
                }
              }}
              className="bg-[#0c2e28] hover:bg-[#071f1b] active:scale-95 text-white px-5 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Center Content (Exact Copy Structure with Karnataka Focus) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center max-w-4xl mx-auto w-full">
        {/* Subtle Translucent Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d3b45]/60 backdrop-blur-md border border-cyan-300/40 text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide shadow-lg mb-5 animate-fade-in">
          <span>The Future of Karnataka Travel is Here</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-white font-black text-2xl sm:text-4xl md:text-5xl lg:text-[50px] tracking-tight uppercase leading-[1.12] drop-shadow-lg max-w-4xl">
          YOUR AI THAT PLANS, BOOKS &amp; EXECUTES EVERYTHING
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-center max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-md font-normal mt-4 mb-8">
          Experience the first intelligent travel concierge that doesn't just suggest—it does. From
          royal Mysuru palaces to hidden Western Ghats waterfalls and coastal trails, let Namma Yatra
          handle the logistics while you live the adventure.
        </p>

        {/* Floating Action Input Box (Glassmorphic Prompt Pill) */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto bg-white/20 hover:bg-white/25 focus-within:bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-3 transition-all focus-within:ring-2 focus-within:ring-white/70"
        >
          {/* Left Prompt Icon */}
          <div className="hidden sm:flex w-9 h-9 rounded-xl bg-black/40 border border-white/20 items-center justify-center text-white/90 shrink-0 shadow-inner ml-1">
            <svg
              className="w-4 h-4 text-emerald-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <path d="M7 8l3 3-3 3" />
            </svg>
          </div>

          {/* Text Input */}
          <input
            id="namma-prompt-input"
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g. 4 days in Mysuru & Coorg focusing on royal heritage, coffee estates, and waterfalls..."
            className="w-full text-white placeholder-white/70 bg-transparent font-medium text-xs sm:text-sm md:text-base outline-none px-2"
          />

          {/* Right Execute Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-[#0c2e28] hover:bg-[#071f1b] active:scale-95 disabled:opacity-60 text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-all shadow-xl cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Executing Plan...</span>
              </>
            ) : (
              <>
                <span>Execute Plan</span>
                <Sparkles className="w-4 h-4 text-emerald-300 fill-emerald-300" />
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips (Strictly Karnataka Circuits) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-white/85">
          <span className="font-semibold text-white/60">Popular Karnataka Circuits:</span>
          <button
            type="button"
            onClick={() =>
              handleSelectDestination(
                'Plan a 4-day royal heritage & highlands safari covering Bengaluru, Mysuru Palace, Srirangapatna and Coorg coffee estates...'
              )
            }
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm cursor-pointer transition-all"
          >
            🏰 Mysuru &amp; Coorg Safari (4 Days)
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectDestination(
                '3-day coastal Karnataka beach trail covering Gokarna, Om Beach cliff walk, and Murudeshwar Shiva temple...'
              )
            }
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm cursor-pointer transition-all"
          >
            🏖️ Gokarna &amp; Coastal Cliffs (3 Days)
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectDestination(
                '3-day UNESCO archaeological expedition through the golden boulder ruins, stone chariot, and temples of Hampi...'
              )
            }
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm cursor-pointer transition-all"
          >
            🏛️ Hampi UNESCO Ruins (3 Days)
          </button>
          <button
            type="button"
            onClick={() =>
              handleSelectDestination(
                '3-day coffee plantation and mountain trek in Chikkamagaluru, Mullayanagiri peak, and Hebbe falls...'
              )
            }
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm cursor-pointer transition-all"
          >
            ☕ Chikkamagaluru Coffee Trail (3 Days)
          </button>
        </div>
      </main>

      {/* Subtle bottom fade */}
      <div className="h-6 w-full bg-gradient-to-b from-transparent to-stone-100" />

      {/* Karnataka Destinations Modal */}
      {activeModal === 'destinations' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-stone-200">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-black text-stone-900">Karnataka Tourist Circuits</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div
                onClick={() =>
                  handleSelectDestination(
                    'Plan a 4-day royal heritage & highlands safari covering Bengaluru, Mysuru Palace, Srirangapatna and Coorg coffee estates...'
                  )
                }
                className="p-4 rounded-2xl border border-stone-200 hover:border-amber-600 hover:bg-amber-50/50 cursor-pointer transition-all group"
              >
                <div className="text-xl mb-1">🏰</div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-800">
                  Royal Mysuru &amp; Coorg Highlands
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  4 Days • Ambavilas Palace illumination, Devaraja Market Mysore Pak, Abbey Falls, and Bylakuppe Golden Temple.
                </p>
                <span className="text-[10px] font-black text-amber-700 mt-2 inline-block">
                  Execute Circuit →
                </span>
              </div>

              <div
                onClick={() =>
                  handleSelectDestination(
                    '3-day coastal Karnataka beach trail covering Gokarna, Om Beach cliff walk, and Murudeshwar Shiva temple...'
                  )
                }
                className="p-4 rounded-2xl border border-stone-200 hover:border-blue-600 hover:bg-blue-50/50 cursor-pointer transition-all group"
              >
                <div className="text-xl mb-1">🏖️</div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-blue-800">
                  Gokarna &amp; Coastal Cliffs
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  3 Days • Om Beach cliff walk, Kudle Beach seafood cafes, and Murudeshwar 123-ft ocean-facing Shiva statue.
                </p>
                <span className="text-[10px] font-black text-blue-700 mt-2 inline-block">
                  Execute Circuit →
                </span>
              </div>

              <div
                onClick={() =>
                  handleSelectDestination(
                    '3-day UNESCO archaeological expedition through the golden boulder ruins, stone chariot, and temples of Hampi...'
                  )
                }
                className="p-4 rounded-2xl border border-stone-200 hover:border-purple-600 hover:bg-purple-50/50 cursor-pointer transition-all group"
              >
                <div className="text-xl mb-1">🏛️</div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-purple-800">
                  Hampi UNESCO Golden Ruins
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  3 Days • Vijaya Vittala Stone Chariot, musical acoustic pillars, Virupaksha temple, and Tungabhadra coracles.
                </p>
                <span className="text-[10px] font-black text-purple-700 mt-2 inline-block">
                  Execute Circuit →
                </span>
              </div>

              <div
                onClick={() =>
                  handleSelectDestination(
                    '3-day coffee plantation and mountain trek in Chikkamagaluru, Mullayanagiri peak, and Hebbe falls...'
                  )
                }
                className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 cursor-pointer transition-all group"
              >
                <div className="text-xl mb-1">☕</div>
                <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-800">
                  Chikkamagaluru &amp; Western Ghats
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  3 Days • Mullayanagiri highest peak summit, Baba Budangiri caves, and private Arabica coffee estate walks.
                </p>
                <span className="text-[10px] font-black text-emerald-700 mt-2 inline-block">
                  Execute Circuit →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it Works Modal */}
      {activeModal === 'howItWorks' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 text-left">
            <div className="flex items-center justify-between border-b pb-3 border-stone-200">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-black text-stone-900">How Namma Yatra Executes Your Trip</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Describe Your Desired Karnataka Safari</h4>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Type or speak any destination prompt—from Mysuru palaces to Gokarna beach walks and Kudremukh treks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Autonomous Logistics Coordination</h4>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Namma Yatra analyzes KSRTC routes, Ghat road hairpin counts, temple dress codes, and low-crowd visiting hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Live Turn-by-Turn Karnataka Execution</h4>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Follow the interactive Google Maps circuit, listen to historical audio stories, use Kannada survival phrases, and export your offline PDF pass.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#0c2e28] text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Start Exploring Karnataka
            </button>
          </div>
        </div>
      )}

      {/* Travel Pass / Pricing Modal */}
      {activeModal === 'pricing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-left">
            <div className="flex items-center justify-between border-b pb-3 border-stone-200">
              <h3 className="text-lg font-black text-stone-900">Namma Yatra Karnataka Travel Pass</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/30 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-md">
                  Active Free Pass
                </span>
                <h4 className="font-black text-base text-stone-900">Karnataka Explorer</h4>
                <div className="text-2xl font-black text-stone-900">₹0 / free</div>
                <ul className="space-y-1.5 text-stone-600 pt-1 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Unlimited Karnataka AI Itineraries</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real Google Maps &amp; GPS Routes</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Heritage Audio Lore Narration</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Offline Printable PDF Pass</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 bg-stone-200 px-2 py-0.5 rounded-md">
                  Autonomous Edition
                </span>
                <h4 className="font-black text-base text-stone-900">Yatri Concierge</h4>
                <div className="text-2xl font-black text-stone-900">₹499 <span className="text-xs font-normal text-stone-500">/ trip</span></div>
                <ul className="space-y-1.5 text-stone-600 pt-1 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>KSRTC Ticket Reservation Sync</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real-time Monsoon Landslide Alerts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Malnad Homestay Discounts</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#0c2e28] text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Continue with Karnataka Explorer Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
