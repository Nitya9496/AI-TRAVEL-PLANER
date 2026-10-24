import React, { useState } from 'react';
import {
  Utensils,
  Coffee,
  Home,
  Beer,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  Wifi,
} from 'lucide-react';

export default function DiningStayHub({ lang = 'en' }) {
  const [activeDietFilter, setActiveDietFilter] = useState('all');

  const sweetShops = [
    {
      sweet: 'Authentic Dharwad Peda (GI Tagged)',
      legend: 'Line Bazaar, Dharwad',
      recommended: 'Babusingh Thakur Peda (Est. 1912)',
      tasteNote: 'Slow-caramelized buffalo milk khoa rolled in fine sugar crystals with distinct smoky aroma.',
    },
    {
      sweet: 'Original Ghee Mysore Pak',
      legend: 'Sayyaji Rao Road, Mysuru',
      recommended: 'Guru Sweet Mart (Direct descendants of royal chef Kakasura Madappa)',
      tasteNote: 'Porous, airy golden square soaked in molten desi ghee that dissolves effortlessly on your tongue.',
    },
    {
      sweet: 'Gokak Karadantu & Belagavi Kunda',
      legend: 'Gokak / Belagavi',
      recommended: 'Shri Shivalingeshwar Sweets, Gokak',
      tasteNote: 'Crunchy dry-fruit sweet made from organic edible gum (dantu), jaggery, nutmeg, and dry coconut.',
    },
  ];

  const coffeeDarshinis = [
    {
      name: 'Mavalli Tiffin Room (MTR)',
      place: 'Lalbagh Road, Bengaluru',
      specialty: 'Pure brass dabara filter kaapi (85% plantation peaberry / 15% chicory) with crispy Rava Idli.',
      rating: '4.9 ★',
    },
    {
      name: 'Vidyarthi Bhavan',
      place: 'Gandhi Bazaar, Basavanagudi',
      specialty: 'Thick, crispy exterior Benne Masala Dosa served with green chutney & boiling filter coffee.',
      rating: '4.8 ★',
    },
    {
      name: 'Original Hotel Vinayaka Mylari',
      place: 'Nazarbad, Mysuru',
      specialty: 'Softest cloud-like butter dosa accompanied by authentic onion sagu and freshly brewed coffee.',
      rating: '4.9 ★',
    },
    {
      name: 'Brahmin’s Coffee Bar',
      place: 'Shankarapuram, Bengaluru',
      specialty: 'Hot Khara Bath, piping idli steeped in coconut chutney, and iconic standing filter kaapi.',
      rating: '4.8 ★',
    },
  ];

  const coastalKhanavalis = [
    {
      name: "Giri Manja's",
      location: 'Car Street, Mangaluru',
      specialty: 'Legendary Anjal (King Fish) tawa fry, Kane (Lady Fish) curry, and authentic coastal fish thali.',
    },
    {
      name: 'Machali Restaurant',
      location: 'Kadri, Mangaluru',
      specialty: 'Fresh catch Crab Ghee Roast, Squid Sukka, and Neer Dosa prepared in Bunts style.',
    },
    {
      name: 'Hotel Narayana',
      location: 'Bunder (Old Port), Mangaluru',
      specialty: 'Old-school seaport canteen frying fresh silver fish, pomfret, and mackerel in coconut oil.',
    },
  ];

  const accommodations = [
    {
      name: 'Lalitha Mahal Palace Hotel',
      type: 'Heritage Palace Stay',
      location: 'Mysuru',
      highlight: 'Built in 1921 by Maharaja Krishnaraja Wadiyar IV as an Italian renaissance palace for Viceroy visits.',
      price: '₹₹₹₹',
    },
    {
      name: 'Misty Woods Coffee Plantation Homestay',
      type: 'Workation & Pet-Friendly',
      location: 'Madikeri, Coorg',
      highlight: 'High-speed 200 Mbps optical fiber Wi-Fi, power backup, open estate lawns welcoming pet dogs.',
      price: '₹₹',
    },
    {
      name: 'Zostel Hampi / Gokarna Beach Pods',
      type: 'Budget Pods & Solo Backpacker Deals',
      location: 'Hampi & Gokarna',
      highlight: 'Dorms and air-conditioned capsule pods with zero single-supplement charges for solo backpackers.',
      price: '₹',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-200 flex items-center gap-1.5 mb-1">
            <Utensils className="w-4 h-4" />
            <span>Smart Accommodation & Dining</span>
          </div>
          <h3 className="text-2xl font-black">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಖಾದ್ಯ ವೈಭವ ಮತ್ತು ವಿಶಿಷ್ಟ ವಸತಿಗಳು' : 'Karnataka Culinary Trails & Smart Stays'}
          </h3>
          <p className="text-xs text-amber-100 mt-1">
            Dharwad Peda navigators, coastal seafood Khanavalis, filter coffee Darshinis, and workations.
          </p>
        </div>
      </div>

      {/* Row: Filter Coffee Darshinis & Sweet Shop Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filter Coffee Hotspot Locator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Filter Coffee Hotspot Locator (ದರ್ಶಿನಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ತಾಣಗಳು)
              </h4>
              <p className="text-xs text-stone-500">
                Iconic heritage Darshinis and coffee bars serving authentic South Indian brass dabara brew.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {coffeeDarshinis.map((dar, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{dar.name}</span>
                  <span className="text-xs font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                    {dar.rating}
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-800">📍 {dar.place}</div>
                <p className="text-xs text-stone-600 leading-snug">{dar.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Sweet Shop Navigator */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-100 text-yellow-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Traditional Sweet Shop Navigator (ಧಾರ್ವಾಡ್ ಪೇಡ & ಮೈಸೂರು ಪಾಕ್)
              </h4>
              <p className="text-xs text-stone-500">
                Directs travelers to authentic original inventors of GI-tagged Karnataka confections.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {sweetShops.map((sw, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{sw.sweet}</span>
                  <span className="text-[10px] font-bold bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded-md">
                    {sw.legend}
                  </span>
                </div>
                <div className="text-xs text-red-700 font-bold">Original: {sw.recommended}</div>
                <p className="text-xs text-stone-600 leading-snug">{sw.tasteNote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Coastal Seafood Khanavalis & Street Food Safety */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coastal Seafood Specialists */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-700">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Coastal Seafood Specialist Finder (ಕರಾವಳಿ ಮೀನು ಊಟದ ಖಾನಾವಳಿ)
              </h4>
              <p className="text-xs text-stone-500">
                Top-rated Mangalorean and Karwar Khanavali eateries serving catch-of-the-day fish thalis.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {coastalKhanavalis.map((ck, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">{ck.name}</span>
                  <span className="text-[10px] text-stone-500 font-semibold">{ck.location}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">{ck.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Street Food Safety & Microbreweries */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-base">
                Street Food Safety & Microbrewery Scout
              </h4>
              <p className="text-xs text-stone-500">
                Hygiene audit scores for famous food streets and craft beer trails in pub capital Bengaluru.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span>VV Puram Food Street (Thindi Beedi, Bengaluru)</span>
                <span className="bg-emerald-200 px-2 py-0.5 rounded-full">Hygiene Score: 92/100</span>
              </div>
              <p className="text-xs text-stone-600">
                FSSAI-audited street food hub. Must try: Paddus, Mosaru Kodubale, Gulkand with butter & ice cream at Shivanna Gulkand.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>Bengaluru Craft Beer Trail (Indiranagar / Koramangala)</span>
                <span className="bg-amber-200 px-2 py-0.5 rounded-full">Toit • Arbor • Windmills</span>
              </div>
              <p className="text-xs text-stone-600">
                Sample localized craft styles like Basmati Blonde and mango-infused wheat ales brewed on tap.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Curated Stays */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base">
              Smart Accommodations Matrix (ಪ್ರಾಚೀನ ಅರಮನೆಗಳು & ವರ್ಕೇಷನ್ ಹೋಮ್‌ಸ್ಟೇಗಳು)
            </h4>
            <p className="text-xs text-stone-500">
              Heritage palaces, high-speed Wi-Fi workations, and pet-friendly estates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accommodations.map((acc, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900">{acc.name}</span>
                <span className="text-xs font-bold text-stone-500">{acc.price}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 inline-block">
                {acc.type}
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">{acc.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

