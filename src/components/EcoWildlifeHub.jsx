import React, { useState } from 'react';
import {
  Trees,
  Compass,
  Camera,
  Award,
  AlertTriangle,
  Waves,
  Sun,
  Flame,
  Droplets,
  Binoculars,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function EcoWildlifeHub({ lang = 'en' }) {
  // 55. Leave No Trace Counter
  const [ecoPoints, setEcoPoints] = useState(120);
  const [pledged, setPledged] = useState(false);

  // 56. AI Flora & Fauna Scanner Simulation
  const [scannedSpecies, setScannedSpecies] = useState(null);

  const wildlifeProbabilities = [
    { animal: 'Asian Elephant (ಆನೆ)', probability: '94%', zone: 'Kabini Riverbank Zone B', bestTime: '4:00 PM – 6:30 PM' },
    { animal: 'Royal Bengal Tiger (ಹುಲಿ)', probability: '68%', zone: 'Nagarhole Kakanakote Range', bestTime: '6:15 AM Morning Safari' },
    { animal: 'Black Panther / Leopard (ಚಿರತೆ)', probability: '28%', zone: 'Kabini Core Backwaters', bestTime: 'Dusk canopy branches' },
    { animal: 'Indian Gaur / Bison (ಕಾಡುಕೋಣ)', probability: '88%', zone: 'Bandipur Moolehole', bestTime: 'Late morning waterholes' },
  ];

  const waterfallStatus = [
    { name: 'Jog Falls (Gersoppa)', river: 'Sharavathi River', flow: 'High Flow (82% Peak)', alert: 'Spectacular misty plunge of Raja, Rani, Roarer & Rocket' },
    { name: 'Shivanasamudra (Gaganachukki & Bharachukki)', river: 'Cauvery River', flow: 'Full Hydroelectric Discharge', alert: 'Raging twin waterfalls; viewpoint spray covers boardwalks' },
    { name: 'Abbey Falls (Madikeri)', river: 'Cauvery Tributary', flow: 'Steady Flow', alert: 'Lush hanging bridge viewing among coffee estates' },
  ];

  const beaches = [
    { name: 'Om Beach, Gokarna', flag: 'Green Flag (Safe)', cleanIndex: '9.4/10', sports: 'Banana ride & speed boating open' },
    { name: 'Kudle Beach, Gokarna', flag: 'Yellow Flag (Moderate Swell)', cleanIndex: '9.1/10', sports: 'Swimming restricted near southern rocks' },
    { name: 'Panambur Beach, Mangaluru', flag: 'Green Flag (Patrolled)', cleanIndex: '8.8/10', sports: 'Lifeguards on duty; jet ski operational' },
  ];

  const triggerScan = (speciesType) => {
    if (speciesType === 'tree') {
      setScannedSpecies({
        name: 'Santalum album (Indian Sandalwood / ಶ್ರೀಗಂಧ)',
        status: 'Karnataka State Tree • Vulnerable Wild Species',
        info: 'Famous for aromatic essential oils in its heartwood. The Kingdom of Mysore once held an absolute royal monopoly over its trade.',
      });
    } else if (speciesType === 'bird') {
      setScannedSpecies({
        name: 'Coracias benghalensis (Indian Roller / ನೀಲಕಂಠ)',
        status: 'Karnataka State Bird • Protected Native Aviary',
        info: 'Known for brilliant iridescent blue wings displayed during aerial courtship acrobatics across agricultural fields.',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-200 flex items-center gap-1.5 mb-1">
            <Trees className="w-4 h-4" />
            <span>Nature, Wildlife & Eco-Tourism</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ವನ್ಯಜೀವಿ, ಪರಿಸರ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಜಲಪಾತಗಳು' : 'Nature, Wildlife & Eco-Tourism Hub'}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Jungle Lodges safaris, waterfall flow predictors, Kumara Parvatha permits, and Netrani scuba conditions.
          </p>
        </div>
      </div>

      {/* Row: Wildlife Sighting Probability & Waterfall Flow Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wildlife Sighting Probability Indicator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Binoculars className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Wildlife Sighting Probability Indicator (ಸಫಾರಿ ವನ್ಯಜೀವಿ ಸಂಭವನೀಯತೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Calculated using ranger logs and historical dry-season sightings in Kabini & Nagarhole.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {wildlifeProbabilities.map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{item.animal}</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.probability} Chance
                  </span>
                </div>
                <div className="text-xs text-emerald-900 font-semibold">{item.zone}</div>
                <div className="text-[11px] text-stone-500">Best Window: {item.bestTime}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Waterfall Flow Predictor */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Waterfall Flow Predictor (ಜಲಪಾತಗಳ ನೀರಿನ ಹರಿವು ಮುನ್ಸೂಚನೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Monsoon and catchment dam discharge tracker for famous Karnataka cascades.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {waterfallStatus.map((wf, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-cyan-50/50 border border-cyan-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{wf.name}</span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-cyan-200 text-cyan-900">
                    {wf.flow}
                  </span>
                </div>
                <div className="text-xs text-cyan-800 font-semibold">{wf.river}</div>
                <p className="text-xs text-stone-600">{wf.alert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Beach Flags & Trekking Permit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coastal Beach Safety & Cleanliness Flags */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Coastal Beach Safety & Cleanliness Flags (ಕಡಲತೀರ ಸುರಕ್ಷತೆ)
              </h4>
              <p className="text-xs text-stone-500">
                Tide warnings, high undertow flags, and cleanliness ratings along coastal Karnataka.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {beaches.map((b, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{b.name}</span>
                  <span className="text-xs font-bold text-emerald-700">Cleanliness: {b.cleanIndex}</span>
                </div>
                <div className="text-xs font-semibold text-stone-800">{b.flag}</div>
                <p className="text-xs text-stone-500">{b.sports}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trekking Permit Integration & Dandeli Rafting */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Trekking Permits & Dandeli River Rafting Scale
              </h4>
              <p className="text-xs text-stone-500">
                Forest Department slot rules and Kali river water rapid grades in Dandeli.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span>Kumara Parvatha & Kudremukh Treks</span>
                <span className="bg-emerald-200 px-2 py-0.5 rounded-full">Forest Permit Required</span>
              </div>
              <p className="text-xs text-stone-600">
                Daily cap of 50 trekkers per trail. Camping inside forest boundary prohibited; online booking opens 7 days in advance via Karnataka Ecotourism.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-blue-900">
                <span>Dandeli Kali River White-Water Rafting</span>
                <span className="bg-blue-200 px-2 py-0.5 rounded-full">Grade 3+ Active</span>
              </div>
              <p className="text-xs text-stone-600">
                Supa Dam release creates optimal 9.5 km stretch with 'Adi's Delirium' and 'The Big Daddy' rapids.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row: AI Flora/Fauna Scanner & Leave No Trace Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flora and Fauna Identification Camera */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                AI Flora & Fauna Identification Scanner (ಕರ್ನಾಟಕ ಜೀವವೈವಿಧ್ಯ ಸ್ಕ್ಯಾನರ್)
              </h4>
              <p className="text-xs text-stone-500">
                Simulated AI lens identifying Western Ghats endemic trees and aviary species.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => triggerScan('tree')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer"
            >
              Scan State Tree (Sandalwood)
            </button>
            <button
              type="button"
              onClick={() => triggerScan('bird')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer"
            >
              Scan State Bird (Indian Roller)
            </button>
          </div>

          {scannedSpecies && (
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1 text-xs">
              <div className="font-extrabold text-purple-950 text-sm">{scannedSpecies.name}</div>
              <div className="text-purple-800 font-bold">{scannedSpecies.status}</div>
              <p className="text-stone-700 leading-relaxed pt-1">{scannedSpecies.info}</p>
            </div>
          )}
        </div>

        {/* Leave No Trace Campaign Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-stone-900 text-base">
                  Leave No Trace Eco-Pledge (ಪರಿಸರ ಸ್ನೇಹಿ ಪ್ರಯಾಣ ಪ್ರತಿಜ್ಞೆ)
                </h4>
                <p className="text-xs text-stone-500">
                  Earn green explorer badges by avoiding single-use plastic in Western Ghats.
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-stone-400">Green Score</div>
              <div className="text-2xl font-black text-emerald-600">{ecoPoints} Pts</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <p className="text-xs text-stone-600 leading-relaxed">
              Karnataka Forest Department penalizes plastic disposal inside Kudremukh, Agumbe, and Bandipur corridors. Pledge to carry your own steel flask.
            </p>
            <button
              type="button"
              disabled={pledged}
              onClick={() => {
                setPledged(true);
                setEcoPoints((p) => p + 50);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-200 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {pledged ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                  <span>Pledge Taken (+50 Eco Points Credited)</span>
                </>
              ) : (
                <span>Take the 'Namma Parisara' Eco Pledge (+50 Pts)</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

