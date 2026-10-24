import React, { useState } from 'react';
import {
  Bus,
  Train,
  AlertTriangle,
  Zap,
  Navigation,
  Car,
  Bike,
  Clock,
  Compass,
  DollarSign,
  ShieldAlert,
  Footprints,
  Anchor,
  Search,
} from 'lucide-react';

export default function SmartTransitHub({ lang = 'en' }) {
  // 34. Auto Fare Calculator State
  const [autoDistance, setAutoDistance] = useState(5);
  const [isNightAuto, setIsNightAuto] = useState(false);

  // 33. Metro Station State
  const [metroFrom, setMetroFrom] = useState('Majestic (KSR Interchange)');
  const [metroTo, setMetroTo] = useState('Indiranagar');

  // 42. PNR Tracker State
  const [pnrInput, setPnrInput] = useState('4218903412');
  const [pnrResult, setPnrResult] = useState(null);

  // Auto Fare formula for Bengaluru
  const baseFare = 30; // first 2 km
  const perKmFare = 15;
  const calculatedAutoFare = Math.round(
    (autoDistance <= 2 ? baseFare : baseFare + (autoDistance - 2) * perKmFare) *
      (isNightAuto ? 1.5 : 1)
  );

  const handleCheckPNR = (e) => {
    e.preventDefault();
    setPnrResult({
      train: 'Tippu Express (12614) - KSR Bengaluru to Mysuru',
      status: 'CNF (Confirmed) • Coach C2, Seat 45 (Window)',
      departure: '15:00 HRS from Platform 6, KSR Bengaluru',
      arrival: '17:45 HRS at Mysuru Junction',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-200 flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4" />
            <span>Smart Transit & Navigation</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಸಾರಿಗೆ, ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಮತ್ತು ಸಂಚಾರ ಮಾರ್ಗದರ್ಶಿ' : 'Smart Transit, KSRTC & Highway Navigation'}
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Live KSRTC trackers, Ghat road hairpin assistants, Namma Metro fares, auto meters, and Bandipur night bans.
          </p>
        </div>
      </div>

      {/* Row: Ghat Road Assistant & Wildlife Corridor Night Ban */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Western Ghats Ghat Road Assistant */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Western Ghats Ghat Road Assistant (ಘಾಟಿ ರಸ್ತೆ ಸುರಕ್ಷತೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Hairpin curve count, blind turn warnings, and fog alerts across Karnataka's western mountain passes.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>Agumbe Ghat (NH 169A)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200">14 Steep Hairpins</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Heavy mist and dense rainforest fog between 4:30 PM - 8:00 AM. Shift to 2nd gear on descent; check brakes before hairpin 7.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex justify-between items-center text-xs font-bold text-blue-900">
                <span>Charmadi Ghat (Chikkamagaluru to Belthangady)</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-200">12 Hairpins</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Narrow scenic road with waterfalls. Heavy multi-axle trucks restricted during monsoon weekends.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span>Shiradi Ghat (Bengaluru to Mangaluru NH 75)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200">Concrete Four-Lane</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Open for all vehicular traffic. Smooth concrete highway; beware of sudden lane shifts near Sakleshpur bypass.
              </p>
            </div>
          </div>
        </div>

        {/* Wildlife Corridor Drive Alerts */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Wildlife Corridor Night Ban Radar (ವನ್ಯಜೀವಿ ಕಾರಿಡಾರ್ ರಾತ್ರಿ ಸಂಚಾರ ನಿಷೇಧ)
              </h4>
              <p className="text-xs text-stone-500">
                Mandatory forest highway gate closures to protect wild elephants and tigers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-900 text-sm">
                Bandipur Tiger Reserve (NH 766 & NH 67)
              </span>
              <span className="text-xs font-black bg-red-600 text-white px-2.5 py-1 rounded-full">
                GATE CLOSED 9:00 PM – 6:00 AM
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Karnataka High Court mandated night traffic closure. All vehicles travelling between Mysuru and Ooty/Wayanad must cross Gundlupet checkpost before 8:30 PM.
            </p>
            <div className="text-[11px] font-bold text-red-800 bg-red-100 p-2 rounded-lg">
              ⚠️ Violators face impounding and hefty wildlife protection act penalties.
            </div>
          </div>

          {/* Toll Calculator */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-stone-900">
                Fastag Toll Calculator: Bengaluru to Coastal Karnataka
              </span>
              <span className="text-xs font-black text-emerald-700">₹445 Total Fastag</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px] text-stone-600">
              <div className="bg-white p-1.5 rounded-lg border text-center">Nelmangala: ₹45</div>
              <div className="bg-white p-1.5 rounded-lg border text-center">Bellur Cross: ₹160</div>
              <div className="bg-white p-1.5 rounded-lg border text-center">Brahmarakootlu: ₹240</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Auto Fare Estimator & Namma Metro Route Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto-Rickshaw Fare Estimator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-100 text-yellow-900">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Auto-Rickshaw Meter Fare Estimator (ಆಟೋ ಮೀಟರ್ ದರ ಲೆಕ್ಕಾಚಾರ)
              </h4>
              <p className="text-xs text-stone-500">
                Protects travelers from arbitrary pricing using official Karnataka Transport Department meter rates.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Trip Distance: {autoDistance} KM</span>
                <span className="text-stone-400">(Base: ₹30 for first 2 km, ₹15/km after)</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={autoDistance}
                onChange={(e) => setAutoDistance(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNightAuto}
                  onChange={(e) => setIsNightAuto(e.target.checked)}
                  className="rounded text-yellow-600 focus:ring-yellow-500 w-4 h-4"
                />
                <span>Night Rate (10:00 PM – 5:00 AM) • 1.5x Surcharge</span>
              </label>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-stone-400">Official Fare</div>
                <div className="text-2xl font-black text-yellow-600">₹{calculatedAutoFare}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Namma Metro Route Planner */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Namma Metro Route & Fare Planner (ನಮ್ಮ ಮೆಟ್ರೋ ಮಾರ್ಗ & ದರ)
              </h4>
              <p className="text-xs text-stone-500">
                Optimized line interchange for hassle-free travel across Bengaluru.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-emerald-950 block mb-1">Origin Station</label>
                <select
                  value={metroFrom}
                  onChange={(e) => setMetroFrom(e.target.value)}
                  className="w-full bg-white p-2 rounded-xl border border-emerald-300 font-semibold"
                >
                  <option>Majestic (KSR Interchange)</option>
                  <option>Baiyappanahalli</option>
                  <option>Whitefield (Kadugodi)</option>
                  <option>Yelahanka / Nagasandra</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-emerald-950 block mb-1">Destination Station</label>
                <select
                  value={metroTo}
                  onChange={(e) => setMetroTo(e.target.value)}
                  className="w-full bg-white p-2 rounded-xl border border-emerald-300 font-semibold"
                >
                  <option>Indiranagar</option>
                  <option>MG Road</option>
                  <option>Lalbagh</option>
                  <option>Bengaluru Airport (Upcoming)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900">
                Purple Line Direct • 8 Stations • 18 Mins
              </span>
              <span className="font-black text-sm text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-300">
                Token: ₹30 | QR: ₹28.5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row: EV Charging, PNR Tracker, Ferry Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* EV Charging Stations */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h5 className="font-bold text-stone-900 text-sm">Highway EV Chargers</h5>
          </div>
          <p className="text-xs text-stone-600">
            High-speed CCS2 chargers along major tourist expressways.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-xl bg-stone-50 border">
              <span className="font-bold block text-stone-800">Tata Power 60kW Fast</span>
              <span className="text-stone-500">Maddur Tiffany's (Bangalore-Mysore)</span>
            </div>
            <div className="p-2 rounded-xl bg-stone-50 border">
              <span className="font-bold block text-stone-800">Zeon 50kW DC Fast</span>
              <span className="text-stone-500">Hassan Bypass (NH 75 to Belur)</span>
            </div>
          </div>
        </div>

        {/* Intra-State Train PNR Status */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-blue-600" />
            <h5 className="font-bold text-stone-900 text-sm">Karnataka Train PNR Tracker</h5>
          </div>
          <form onSubmit={handleCheckPNR} className="flex gap-2">
            <input
              type="text"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="10-digit PNR"
              className="w-full text-xs font-mono p-2 rounded-xl border border-stone-300"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Verify
            </button>
          </form>

          {pnrResult && (
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-stone-700 space-y-1">
              <div className="font-bold text-blue-900">{pnrResult.train}</div>
              <div className="text-emerald-700 font-bold">{pnrResult.status}</div>
              <div className="text-[11px] text-stone-500">{pnrResult.departure}</div>
            </div>
          )}
        </div>

        {/* Coastal Ferry & Boat Schedules */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-cyan-600" />
            <h5 className="font-bold text-stone-900 text-sm">Coastal Island Ferries</h5>
          </div>
          <p className="text-xs text-stone-600">
            Operating times for tourist boats across coastal Karnataka.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-xl bg-stone-50 border">
              <span className="font-bold block text-stone-800">St. Mary's Island (Malpe Beach)</span>
              <span className="text-stone-500">9:30 AM – 5:30 PM (Closed during monsoon June–Sept)</span>
            </div>
            <div className="p-2 rounded-xl bg-stone-50 border">
              <span className="font-bold block text-stone-800">Netrani Scuba Boat (Murudeshwar)</span>
              <span className="text-stone-500">Departs 8:00 AM daily from Murudeshwar Harbor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

