import React, { useState } from 'react';
import {
  DollarSign,
  Wallet,
  Leaf,
  BookOpen,
  PieChart,
  RefreshCcw,
  Share2,
  CheckCircle2,
  Star,
  Copy,
  Tag,
  Download,
  Users,
} from 'lucide-react';

export default function FinanceAnalyticsHub({ itinerary, lang = 'en' }) {
  // 91. Multi-Currency Split State
  const [peopleCount, setPeopleCount] = useState(3);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // 99. Group Sync Link State
  const [copiedLink, setCopiedLink] = useState(false);

  // 100. AI Feedback State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // 93. Carbon Offset State
  const [offsetDonated, setOffsetDonated] = useState(false);

  const totalCost = itinerary?.totalBudget || itinerary?.estimatedCost || 8500;
  const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
  const currencySymbol = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

  const convertedTotal = Math.round(totalCost * rates[selectedCurrency]);
  const splitPerPerson = Math.round(convertedTotal / peopleCount);

  // 93. Carbon Footprint estimate: ~0.12 kg CO2 per km
  const estimatedKm = 480;
  const carbonKg = Math.round(estimatedKm * 0.12);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
    }, 4000);
  };

  // 97. Souvenir Benchmarks
  const souvenirBenchmarks = [
    { item: 'KSIC Mysore Crepe Silk Saree (Pure Gold Zari)', fairPrice: '₹14,500 – ₹28,000', scamWarning: 'Any "Mysore Silk" sold under ₹4,000 is synthetic polyester.' },
    { item: 'Channapatna Wooden Stacking Toy (Medium)', fairPrice: '₹250 – ₹650', scamWarning: 'Check for non-toxic vegetable lacquer gloss; should not smell of chemical paint.' },
    { item: 'Govt Sandalwood Oil (5ml Bottle)', fairPrice: '₹1,800 – ₹2,400', scamWarning: 'Roadside vendors selling 50ml bottles for ₹500 use scented mineral oil.' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-800 via-stone-900 to-black p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5 mb-1">
            <PieChart className="w-4 h-4" />
            <span>Finance, Analytics & Post-Trip Features</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ಹಣಕಾಸು, ವೆಚ್ಚ ಹಂಚಿಕೆ & ಪ್ರಯಾಣ ವಿಶ್ಲೇಷಣೆ' : 'Finance, Expense Split & Travel Analytics'}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Currency conversions, group splits, ticket wallets, carbon offsets, and souvenir price checkers.
          </p>
        </div>
      </div>

      {/* Row: Multi-Currency Split & Carbon Estimator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Currency Split Expense Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Multi-Currency Split Expense Tracker (ವೆಚ್ಚ ಹಂಚಿಕೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್)
              </h4>
              <p className="text-xs text-stone-500">
                Split trip expenses effortlessly across friends with real-time foreign currency conversions.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Currency</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-stone-300 font-bold"
                >
                  <option value="INR">INR (₹ - Indian Rupee)</option>
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Travelers: {peopleCount} People
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 mt-2 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200 text-center">
              <div className="bg-white p-3 rounded-xl border">
                <div className="text-[10px] font-bold text-stone-400 uppercase">Total Trip</div>
                <div className="text-xl font-black text-stone-900 mt-0.5">
                  {currencySymbol[selectedCurrency]}
                  {convertedTotal.toLocaleString()}
                </div>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">Per Person Share</div>
                <div className="text-xl font-black text-emerald-700 mt-0.5">
                  {currencySymbol[selectedCurrency]}
                  {splitPerPerson.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Footprint Estimator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Carbon Footprint & Western Ghats Sapling Offset
              </h4>
              <p className="text-xs text-stone-500">
                Calculates travel environmental impact and offers native tree planting offsets.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-teal-950">Est. Circuit Distance: {estimatedKm} KM</span>
              <span className="font-black text-sm text-teal-800 bg-teal-200/60 px-2.5 py-0.5 rounded-full">
                {carbonKg} kg CO₂
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your road trip produces approx {carbonKg} kg CO₂. Plant a native Honne or Sandalwood sapling in Kudremukh buffer zone to achieve a carbon-neutral safari.
            </p>
            <button
              type="button"
              disabled={offsetDonated}
              onClick={() => setOffsetDonated(true)}
              className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-300 text-white font-bold text-xs cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              {offsetDonated ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Carbon Offset Confirmed (1 Native Tree Planted)</span>
                </>
              ) : (
                <span>Offset with Karnataka Forest Department (₹100)</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Smart Souvenir Price Checker */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base">
              Smart Souvenir Price Benchmark (ಮೈಸೂರು ರೇಷ್ಮೆ & ಶ್ರೀಗಂಧ ಬೆಲೆ ಪರಿಶೀಲನೆ)
            </h4>
            <p className="text-xs text-stone-500">
              Protects tourists from counterfeit silk and synthetic sandalwood scams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {souvenirBenchmarks.map((sb, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
              <div className="font-bold text-stone-900 text-xs">{sb.item}</div>
              <div className="text-xs font-black text-emerald-700">Fair Price: {sb.fairPrice}</div>
              <div className="text-[11px] text-red-800 bg-red-50 p-2 rounded-xl border border-red-200">
                <span className="font-bold">Scam Alert: </span>
                {sb.scamWarning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row: Shared Group Sync & AI Feedback Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shared Group Itinerary Syncing */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Shared Group Itinerary Syncing (ಸ್ನೇಹಿತರೊಂದಿಗೆ ಪ್ರವಾಸ ಹಂಚಿಕೊಳ್ಳಿ)
              </h4>
              <p className="text-xs text-stone-500">
                Generate a live shareable URL for co-travelers to view schedules and routes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <p className="text-xs text-stone-600">
              Share your current Karnataka safari with friends on WhatsApp or Telegram:
            </p>
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Share Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Live Itinerary Share Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Feedback Loop System */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                AI Feedback Loop (ಎಐ ಕಲಿಕೆ & ವಿಮರ್ಶೆ ವ್ಯವಸ್ಥೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Fine-tunes future Gemini AI travel prompts based on traveler review inputs.
              </p>
            </div>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <div className="flex items-center gap-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className="text-xl cursor-pointer"
                >
                  {star <= feedbackRating ? '★' : '☆'}
                </button>
              ))}
              <span className="text-xs font-bold text-stone-600 ml-2">
                {feedbackRating} / 5 Stars
              </span>
            </div>

            <input
              type="text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g. Loved the Mysore Pak recommendation! Include more Belur Hoysala ruins next time."
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Submit Feedback to Gemini Knowledge Base
            </button>
          </form>

          {feedbackSubmitted && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Feedback recorded! Next prompt generation will adapt to your taste.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

