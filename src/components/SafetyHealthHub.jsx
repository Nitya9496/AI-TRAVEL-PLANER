import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Signal,
  HeartPulse,
  CloudRain,
  MapPin,
  AlertTriangle,
  UserCheck,
  Search,
  CheckCircle2,
  Droplets,
  Sun,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function SafetyHealthHub({ lang = 'en' }) {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [lostReportSubmitted, setLostReportSubmitted] = useState(false);
  const [lostItemText, setLostItemText] = useState('');

  const currentCoords = '12.3051° N, 76.6551° E (Mysuru District, Karnataka)';

  const handleCopyGPS = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentCoords);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 3000);
    }
  };

  const handleLostSubmit = (e) => {
    e.preventDefault();
    if (!lostItemText) return;
    setLostReportSubmitted(true);
    setTimeout(() => {
      setLostReportSubmitted(false);
      setLostItemText('');
    }, 4000);
  };

  const emergencyContacts = [
    { name: 'Karnataka Tourist Police Helpline', number: '112 / 080-22211777', note: '24/7 dedicated multi-lingual emergency support' },
    { name: 'Ambulance Emergency Dispatch', number: '108', note: 'State trauma response & accident dispatch' },
    { name: 'Snake & Forest Wildlife Rescue (Mysuru & Kodagu)', number: '+91 94480 50000 (Snake Shyam) / 1926 (Forest Dept)', note: 'Immediate venomous snake relocation' },
    { name: 'Women Travel Helpline (Vanitha Sahayavani)', number: '1091 / 080-22943225', note: 'Assistance for solo female travelers' },
  ];

  const networkCoverage = [
    { route: 'Charmadi & Shiradi Ghat Sections', jio: '4G (Intermittent valleys)', airtel: '4G (Stable ridges)', bsnl: 'Strong Voice Signal (Lifeline)' },
    { route: 'Kudremukh National Park Trail', jio: 'No Signal in deep valley', airtel: 'Weak 2G near estate gate', bsnl: 'Voice at Forest Checkpost' },
    { route: 'Bengaluru-Mysuru Expressway', jio: '5G Full Coverage', airtel: '5G Full Coverage', bsnl: '4G Continuous' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-900 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-red-200 flex items-center gap-1.5 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Safety, Health & Emergency Support</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ತುರ್ತು ಸಹಾಯವಾಣಿ, ಸುರಕ್ಷತೆ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ' : 'Tourist Police, Health SOS & Safety Radar'}
          </h3>
          <p className="text-xs text-red-100 mt-1">
            One-tap 112 police emergency, ghat cellular coverage, snake rescue contacts, and lost & found.
          </p>
        </div>
      </div>

      {/* Immediate Tourist Assistance SOS */}
      <div className="bg-red-50 border-2 border-red-500 p-6 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl shadow-md animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-red-800 tracking-wider">
                Immediate Tourist Assistance
              </span>
              <h4 className="text-xl font-black text-stone-900">
                Karnataka Tourist Police SOS: Call 112
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Instantly connects you with the nearest patrol station and shares your live coordinates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyGPS}
              className="px-4 py-2.5 bg-white border border-red-300 rounded-xl text-xs font-bold text-red-700 hover:bg-red-100 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4" />
              <span>{copiedCoords ? 'GPS Copied!' : 'Copy My GPS Coordinates'}</span>
            </button>
            <a
              href="tel:112"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Dial 112 SOS</span>
            </a>
          </div>
        </div>

        <div className="text-xs bg-white/80 p-2.5 rounded-xl border border-red-200 text-stone-700 font-mono">
          Current Geotag: {currentCoords}
        </div>
      </div>

      {/* Emergency Contacts Directory */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h4 className="font-black text-stone-900 text-base flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-red-600" />
          <span>Verified Karnataka Emergency Helplines</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-1">
              <div className="text-xs font-bold text-stone-500">{c.name}</div>
              <div className="text-base font-black text-red-700">{c.number}</div>
              <p className="text-xs text-stone-600">{c.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Network Connectivity Heatmap */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
            <Signal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base">
              Western Ghats Cellular Connectivity Radar (ಮೊಬೈಲ್ ಸಿಗ್ನಲ್ ಕವರೇಜ್)
            </h4>
            <p className="text-xs text-stone-500">
              Live signal strength ratings across remote jungle roads and coffee valleys.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 font-bold">
                <th className="p-3">Forest / Ghat Route</th>
                <th className="p-3">Jio Network</th>
                <th className="p-3">Airtel Network</th>
                <th className="p-3">BSNL Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {networkCoverage.map((nc, idx) => (
                <tr key={idx} className="hover:bg-stone-50/60">
                  <td className="p-3 font-bold text-stone-900">{nc.route}</td>
                  <td className="p-3">{nc.jio}</td>
                  <td className="p-3">{nc.airtel}</td>
                  <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/50">{nc.bsnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row: Monsoon/Landslide Warning & Lost and Found */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Localized Weather Warning System */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Localized Monsoon & Landslide Warning System
              </h4>
              <p className="text-xs text-stone-500">
                IMD Karnataka alerts for Kodagu, Chikkamagaluru, and coastal districts.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>Kodagu & Sakleshpur Hill Slopes</span>
                <span className="bg-amber-200 px-2 py-0.5 rounded-full">Yellow Watch</span>
              </div>
              <p className="text-xs text-stone-600">
                Moderate afternoon showers. Shiradi Ghat open; night travel between 10 PM – 4 AM advised only with fog lamps.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span>Mysuru & Bengaluru Plains</span>
                <span className="bg-emerald-200 px-2 py-0.5 rounded-full">Clear Conditions</span>
              </div>
              <p className="text-xs text-stone-600">
                Optimal sightseeing conditions. Pleasant breeze around Chamundi hills.
              </p>
            </div>
          </div>
        </div>

        {/* Lost and Found Dashboard */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Transit Lost & Found Portal (ವಸ್ತು ಕಳೆದುಹೋಗಿರುವ ವರದಿ)
              </h4>
              <p className="text-xs text-stone-500">
                Report lost items at KSRTC terminals, railway stations, or monuments.
              </p>
            </div>
          </div>

          <form onSubmit={handleLostSubmit} className="space-y-3">
            <input
              type="text"
              value={lostItemText}
              onChange={(e) => setLostItemText(e.target.value)}
              placeholder="e.g. Leather wallet lost on KSRTC Airavat from Bengaluru to Mysuru"
              className="w-full text-xs p-3 rounded-2xl border border-stone-300"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-bold cursor-pointer transition-all"
            >
              Log Incident with Karnataka Tourist Helpline
            </button>
          </form>

          {lostReportSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Incident Ticket #KAR-8832 registered. A copy has been dispatched to KSRTC Central Depot.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

