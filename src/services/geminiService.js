const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Pre-cached authentic Karnataka mock itinerary with 100-feature depth.
 */
export const FALLBACK_KARNATAKA_ITINERARY = {
  title: "Royal Mysuru, Srirangapatna & Coorg Highlands Safari",
  totalBudget: 8500,
  overview:
    "An unforgettable journey tracing the royal heritage of the Wadiyars in Mysuru, the sacred Kaveri river island of Srirangapatna, and the misty coffee hills and waterfalls of Madikeri (Coorg).",
  budgetSplit: { travel: 30, stay: 35, food: 20, activities: 15 },
  festivalAlert: {
    active: true,
    name: "Mysuru Dasara & Cauvery Theerthodbhava Season",
    tip: "Experience the royal Ambavilas Palace dazzling with 100,000 golden bulbs and witness holy waters emerging at Talacauvery in Coorg.",
  },
  transitComparison: [
    { mode: 'KSRTC Airavat Club Class', duration: '3h 15m', cost: 380, comfort: 'Semi-Sleeper AC Volvo', bookingUrl: 'https://www.ksrtc.in' },
    { mode: 'Vande Bharat Express (Train)', duration: '1h 50m', cost: 520, comfort: 'High-speed Chair Car with meals', bookingUrl: 'https://www.irctc.co.in' },
    { mode: 'Private Cab via Expressway', duration: '2h 10m', cost: 2400, comfort: 'Direct doorstep with Fastag toll included', bookingUrl: 'https://www.kstdc.co' },
  ],
  days: [
    {
      day: 1,
      theme: "Garden City Heritage & Journey to Royal Mysuru",
      activities: [
        {
          time: "Morning",
          place: "Bangalore Palace & Lalbagh Glasshouse",
          lat: 12.9988,
          lng: 77.5921,
          cost: 250,
          desc: "Tudor-style royal palace filled with Victorian wood carvings, followed by a walk through 240-acre botanical gardens.",
          audioStory:
            "Commissioned by Chamarajendra Wadiyar X in 1887, Bangalore Palace was modeled after England's Windsor Castle. The legendary Lalbagh Glasshouse was inspired by London's Crystal Palace.",
          crowdPrediction: "Low crowd 8:30 AM – 10:30 AM (Peak 3:00 PM – 6:00 PM)",
          accessible: true,
          accessibilityNote: "Wheelchair ramps at Glasshouse and Palace entrance",
          offbeat: false,
        },
        {
          time: "Afternoon",
          place: "Devaraja Market & Guru Sweets, Mysuru",
          lat: 12.3087,
          lng: 76.6517,
          cost: 150,
          desc: "Century-old heritage market with piles of fresh jasmine, colored kumkuma, and original ghee Mysore Pak.",
          audioStory:
            "In 1935, royal chef Kakasura Madappa prepared a sweet syrup of gram flour, ghee, and sugar for Maharaja Krishnaraja Wadiyar IV, giving birth to the world-famous 'Mysore Pak'.",
          crowdPrediction: "Moderate crowd around 2 PM; high energy during evening flower auctions",
          accessible: true,
          accessibilityNote: "Paved central corridors; avoid side alleys for wheelchairs",
          offbeat: false,
        },
        {
          time: "Evening",
          place: "Mysore Palace (Ambavilas Palace)",
          lat: 12.3051,
          lng: 76.6551,
          cost: 100,
          desc: "The pinnacle of Indo-Saracenic royal architecture, illuminated by 100,000 bulbs against the dusk sky.",
          audioStory:
            "After the wooden palace burnt down in 1897, British architect Henry Irwin designed this grand marvel for Maharani Vani Vilas Sannidhana with Belgian stained glass and cast-iron pillars from Glasgow.",
          crowdPrediction: "Palace illumination at 7:00 PM on Sundays & holidays; arrive by 6:15 PM for best seats",
          accessible: true,
          accessibilityNote: "Battery-operated buggies and wheelchair service available at Varaha Gate",
          offbeat: false,
        },
      ],
    },
    {
      day: 2,
      theme: "Sacred Hills, Monolithic Nandi & Srirangapatna",
      activities: [
        {
          time: "Morning",
          place: "Chamundi Hill & Monolithic Nandi",
          lat: 12.2743,
          lng: 76.6702,
          cost: 50,
          desc: "Climb the thousand sacred steps to witness goddess Chamundeshwari and the monolithic 16-foot Nandi bull.",
          audioStory:
            "Carved from a single boulder of black granite in 1659 under Dodda Devaraja Wadiyar, this giant Nandi is adorned with intricately sculpted brass bells and chains.",
          crowdPrediction: "Best visited before 8:00 AM for sunrise mist and zero queue",
          accessible: false,
          accessibilityNote: "Road route to hilltop available; steps are steep for seniors",
          offbeat: false,
        },
        {
          time: "Afternoon",
          place: "Srirangapatna Fort & Dariya Daulat Bagh",
          lat: 12.4237,
          lng: 76.6834,
          cost: 30,
          desc: "Island fortress on the Kaveri river and Tipu Sultan's ornate teakwood summer palace.",
          audioStory:
            "Surrounded entirely by the sacred Kaveri River, Srirangapatna was the capital of the Mysore Kingdom. Its walls still bear cannonball marks from the fourth Anglo-Mysore war of 1799.",
          crowdPrediction: "Low afternoon footfall; shaded teakwood corridors",
          accessible: true,
          accessibilityNote: "Level garden pathways throughout the palace",
          offbeat: false,
        },
        {
          time: "Evening",
          place: "Brindavan Gardens & Musical Fountain",
          lat: 12.4262,
          lng: 76.5744,
          cost: 60,
          desc: "Terraced water gardens laid beneath the massive Krishna Raja Sagara dam, featuring dancing musical fountains.",
          audioStory:
            "Conceived by visionary Dewan Sir M. Visvesvaraya and Sir Mirza Ismail, Brindavan Gardens was built across the Cauvery river inspired by the Shalimar Gardens of Kashmir.",
          crowdPrediction: "Musical fountain begins at 6:30 PM; peak crowds on weekends",
          accessible: true,
          accessibilityNote: "Paved promenade with boating jetty access",
          offbeat: false,
        },
      ],
    },
    {
      day: 3,
      theme: "Misty Highlands, Abbey Falls & Golden Temple of Coorg",
      activities: [
        {
          time: "Morning",
          place: "Abbey Falls, Madikeri",
          lat: 12.4516,
          lng: 75.7198,
          cost: 50,
          desc: "Roaring waterfall cascading into rocky ravines amidst lush private coffee and black pepper estates.",
          audioStory:
            "Previously named Jessy Falls by the British after an officer's daughter, Abbey Falls plunges 70 feet into the Cauvery tributary amidst aromatic cardamom and coffee valleys.",
          crowdPrediction: "Arrive at opening (9:00 AM) to experience birdsong without selfie crowds",
          accessible: false,
          accessibilityNote: "Approx 80 stone steps downward to the hanging bridge",
          offbeat: false,
        },
        {
          time: "Afternoon",
          place: "Raja's Seat & Madikeri Fort",
          lat: 12.4239,
          lng: 75.7382,
          cost: 40,
          desc: "A brick-and-mortar pavilion where Kodava kings watched breathtaking sunsets over undulating hillocks.",
          audioStory:
            "Kodava rulers spent quiet twilights at Raja's Seat enjoying music with their queens, looking across sweeping valleys often carpeted in thick rolling white mist.",
          crowdPrediction: "Sunset window (5:00 PM – 6:30 PM) is popular; garden benches fill early",
          accessible: true,
          accessibilityNote: "Flat garden pathways and senior-friendly rest benches",
          offbeat: false,
        },
        {
          time: "Evening",
          place: "Namdroling Monastery (Bylakuppe Golden Temple)",
          lat: 12.4542,
          lng: 75.9631,
          cost: 0,
          desc: "The largest Tibetan settlement in South India featuring 40-foot gilded Buddhist statues and intricate thangka murals.",
          audioStory:
            "Founded in 1963 by Penor Rinpoche with modest bamboo huts, Bylakuppe was granted sanctuary by Karnataka Chief Minister S. Nijalingappa, growing into a global center for Tibetan culture.",
          crowdPrediction: "Evening prayer chants at 5:00 PM are calm and peaceful",
          accessible: true,
          accessibilityNote: "Spacious paved temple courtyards with easy wheelchair access",
          offbeat: false,
        },
      ],
    },
  ],
  transit: [
    {
      route: "Bengaluru to Mysuru",
      mode: "KSRTC Airavat Club Class / Vande Bharat Express",
      approxCost: 380,
      bookingUrl: "https://www.ksrtc.in",
    },
    {
      route: "Mysuru to Madikeri (Coorg)",
      mode: "KSRTC Rajahamsa Executive Coach",
      approxCost: 260,
      bookingUrl: "https://www.ksrtc.in",
    },
    {
      route: "Madikeri to Bylakuppe & Return",
      mode: "KSRTC Karnataka Sarige / Express Bus",
      approxCost: 140,
      bookingUrl: "https://www.ksrtc.in",
    },
  ],
  kannadaSurvivalKit: [
    {
      kannada: "ನಮಸ್ಕಾರ (Namaskara)",
      english: "Hello / Greetings",
      usage: "Universal respectful greeting for all locals",
    },
    {
      kannada: "ಎಷ್ಟು? (Eshtu?)",
      english: "How much?",
      usage: "Shopping / Auto",
    },
    {
      kannada: "ಅರಮನೆಗೆ ಹೋಗಬೇಕು (Aramanege hogabeku)",
      english: "Need to go to the palace",
      usage: "Directing cab or auto drivers in Mysuru",
    },
    {
      kannada: "ಊಟ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ (Oota thumba chennagide)",
      english: "The food is very delicious",
      usage: "Complimenting restaurant hosts and tiffin centers",
    },
    {
      kannada: "ದಯವಿಟ್ಟು ನಿಲ್ಲಿಸಿ (Dayavittu nillisi)",
      english: "Please stop here",
      usage: "Getting down from KSRTC buses or autos",
    },
    {
      kannada: "ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)",
      english: "Thank you very much",
      usage: "Polite gratitude after services",
    },
  ],
  localFood: [
    {
      dish: "Authentic Mysore Pak",
      spot: "Guru Sweets, Devaraja Market, Mysuru",
    },
    {
      dish: "Crispy Mylari Benne Masala Dosa",
      spot: "Original Hotel Vinayaka Mylari, Nazarbad, Mysuru",
    },
    {
      dish: "Pandi Curry & Kadambuttu (Steamed Rice Balls)",
      spot: "Coorg Cuisine / East End Hotel, Madikeri",
    },
    {
      dish: "Maddur Vada & Filter Kaapi",
      spot: "Maddur Tiffany's, Old Bengaluru-Mysuru Expressway",
    },
    {
      dish: "Bisi Bele Bath with Ghee & Boondi",
      spot: "Mavalli Tiffin Room (MTR), Lalbagh Road, Bengaluru",
    },
  ],
};

/**
 * Generates an authentic Karnataka travel itinerary using the Google Gemini API.
 */
export async function generateItinerary({
  startingCity = "Bengaluru",
  durationDays = 3,
  budget = 15000,
  groupType = "Friends",
  travelVibe = ["Heritage & Architecture"],
  pace = "express",
  monsoonAlert = false,
  soloSafe = false,
  familyFriendly = false,
  seniorAccess = false,
  offbeat = false,
} = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const vibesString = Array.isArray(travelVibe) ? travelVibe.join(", ") : travelVibe;

  // Gracefully fallback if API key is not configured
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn(
      "[Namma Yatra] No Gemini API key detected. Activating Karnataka fallback mock data."
    );
    return getAdaptedMockData({
      startingCity,
      durationDays,
      budget,
      groupType,
      travelVibe: vibesString,
      pace,
      monsoonAlert,
      soloSafe,
      familyFriendly,
      seniorAccess,
      offbeat,
    });
  }

  const systemInstruction =
    "You are an authentic Karnataka travel planner. Return ONLY valid JSON format without markdown ticks, code fences, or backticks.";

  const prompt = `Plan a ${durationDays}-day travel itinerary strictly inside Karnataka, starting from "${startingCity}".

Traveler Profile & Customizations:
- Origin Hub: ${startingCity}
- Duration: ${durationDays} Days
- Total Budget: INR ₹${budget}
- Travel Group: ${groupType}
- Selected Vibes: ${vibesString}
- Travel Pace: ${pace === "relaxed" ? "Relaxed & Slow Travel" : "Express Sightseeing"}
- Monsoon Adjustments: ${monsoonAlert ? "Avoid flooded ghat trails; prefer weather-safe cultural indoor monuments" : "Standard season"}
- Solo Safe Routes: ${soloSafe ? "Prioritize well-lit, highly populated tourist corridors with verified transit" : "Standard"}
- Family & Kid Friendly: ${familyFriendly ? "Include parks, clean restrooms, minimal strenuous steps" : "Standard"}
- Senior Citizen Accessibility: ${seniorAccess ? "Focus on locations with wheelchair access, ramps, elevator availability" : "Standard"}
- Offbeat Destinations: ${offbeat ? "Include hidden Karnataka gems like Yana Rocks or Chincholi canyons" : "Prominent heritage & nature"}

Strict Requirements:
1. Only feature genuine Karnataka locations, temples, beaches, ghats, and heritage centers.
2. Return accurate GPS coordinates ("lat" and "lng") for each activity in Karnataka.
3. Every activity MUST include a 2-sentence "audioStory" giving captivating historical lore suitable for text-to-speech.
4. Include "crowdPrediction" (low-crowd visiting hours) and "accessibilityNote" for each activity.
5. Transit routes must reference authentic KSRTC bus types (Airavat Club Class, Rajahamsa) with bookingUrl: "https://www.ksrtc.in".
6. Recommend iconic local food dishes and real spots.
7. Provide essential situational Kannada survival phrases.

STRICT JSON SCHEMA REQUIRED:
{
  "title": "string",
  "totalBudget": 0,
  "overview": "string",
  "budgetSplit": { "travel": 35, "stay": 35, "food": 20, "activities": 10 },
  "festivalAlert": { "active": true, "name": "string", "tip": "string" },
  "days": [
    {
      "day": 1,
      "theme": "string",
      "activities": [
        {
          "time": "Morning | Afternoon | Evening",
          "place": "string",
          "lat": 12.9716,
          "lng": 77.5946,
          "cost": 150,
          "desc": "string",
          "audioStory": "2 sentence historical lore or legend about this place.",
          "crowdPrediction": "Best visited 8:30 AM to avoid rush",
          "accessible": true,
          "accessibilityNote": "Wheelchair ramps available"
        }
      ]
    }
  ],
  "transit": [
    {
      "route": "Bengaluru to Mysuru",
      "mode": "KSRTC Airavat / Train",
      "approxCost": 350,
      "bookingUrl": "https://www.ksrtc.in"
    }
  ],
  "kannadaSurvivalKit": [
    {
      "kannada": "ಎಷ್ಟು? (Eshtu?)",
      "english": "How much?",
      "usage": "Shopping / Auto"
    }
  ],
  "localFood": [
    {
      "dish": "Mysore Pak",
      "spot": "Guru Sweets, Devaraja Market"
    }
  ]
}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      console.warn(`[Namma Yatra] Gemini returned status ${response.status}. Using fallback.`);
      return getAdaptedMockData({ startingCity, durationDays, budget, groupType, travelVibe: vibesString, pace, monsoonAlert });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return getAdaptedMockData({ startingCity, durationDays, budget, groupType, travelVibe: vibesString, pace, monsoonAlert });
    }

    const cleanedText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    console.warn(`[Namma Yatra] Error communicating with Gemini API (${err.message}). Using fallback.`);
    return getAdaptedMockData({ startingCity, durationDays, budget, groupType, travelVibe: vibesString, pace, monsoonAlert });
  }
}

/**
 * Adapt fallback data to the user's specific inputs and duration
 */
function getAdaptedMockData({
  startingCity,
  durationDays,
  budget,
  groupType,
  travelVibe,
  pace,
  monsoonAlert,
}) {
  const daysNum = Math.min(Math.max(Number(durationDays) || 3, 1), 7);
  let days = [...FALLBACK_KARNATAKA_ITINERARY.days.slice(0, Math.min(daysNum, 3))];

  if (daysNum >= 4) {
    days.push({
      day: 4,
      theme: "Hoysala Architectural Wonders of Belur & Halebidu",
      activities: [
        {
          time: "Morning",
          place: "Chennakeshava Temple, Belur",
          lat: 13.1623,
          lng: 75.8596,
          cost: 50,
          desc: "UNESCO World Heritage Hoysala masterpiece with 12th-century intricate soapstone filigree.",
          audioStory:
            "King Vishnuvardhana commissioned this marvel in 1117 CE to mark his victory over the Cholas. Master sculptor Jakanachari carved bracket dancers with perforations so delicate stone jewelry appears to rattle.",
          crowdPrediction: "Best photographed during soft morning sunlight (8:00 AM – 10:00 AM)",
          accessible: true,
          accessibilityNote: "Level courtyard with ramped access",
        },
        {
          time: "Afternoon",
          place: "Hoysaleshwara Temple, Halebidu",
          lat: 13.2166,
          lng: 75.9934,
          cost: 50,
          desc: "Twin temple sanctuaries depicting epics, charging elephants, and celestial dancers in relief.",
          audioStory:
            "Despite being sacked in the 14th century, Halebidu retains over 1,200 continuous horizontal stone reliefs where no two carved elephants share the same pose.",
          crowdPrediction: "Moderate afternoon crowd; ASI licensed guides available at entrance",
          accessible: true,
          accessibilityNote: "Wide stone pavements around the base",
        },
        {
          time: "Evening",
          place: "Chikkamagaluru Coffee Estate Walk",
          lat: 13.3153,
          lng: 75.7754,
          cost: 100,
          desc: "Sunset walk through misty coffee plantations tasting freshly roasted Arabica kaapi.",
          audioStory:
            "Sufi saint Baba Budan smuggled seven raw coffee beans from Yemen in his waistband in 1670 CE, planting them on these very hills to birth India's coffee heritage.",
          crowdPrediction: "Private estate slots booked in advance",
          accessible: false,
          accessibilityNote: "Uneven dirt trail through coffee rows",
        },
      ],
    });
  }

  if (daysNum >= 5) {
    days.push({
      day: 5,
      theme: "Highest Peaks & Shola Forests of Western Ghats",
      activities: [
        {
          time: "Morning",
          place: "Mullayanagiri Peak",
          lat: 13.3908,
          lng: 75.7214,
          cost: 0,
          desc: "Trek to the highest summit in Karnataka (1,930m) with sweeping vistas above cloud blankets.",
          audioStory:
            "Named after sage Mullappa Swamy who meditated inside a cave at the summit, Mullayanagiri is the crown of the Chandra Drona hill ranges.",
          crowdPrediction: "Arrive by 6:00 AM to witness sunrise cloud inversion",
          accessible: false,
          accessibilityNote: "400 steep stone steps from parking bay",
        },
        {
          time: "Afternoon",
          place: "Baba Budangiri (Dattatreya Peetha) & Manikyadhara Falls",
          lat: 13.4217,
          lng: 75.7667,
          cost: 30,
          desc: "Sacred cave shrine revered by Hindus and Muslims alike, beside perennial cascading waterfalls.",
          audioStory:
            "Legend holds that the droplets of Manikyadhara ('String of Pearls') never dry up, having sprung when Saint Dattatreya blessed the drought-stricken hillock.",
          crowdPrediction: "Pleasant afternoon mountain breezes",
          accessible: true,
          accessibilityNote: "Road reaches close to shrine entry",
        },
        {
          time: "Evening",
          place: "Bhadra Wildlife Sanctuary Edge",
          lat: 13.5623,
          lng: 75.6417,
          cost: 200,
          desc: "Twilight safari ride around the teak forests and reservoir shores teeming with spotted deer and peacocks.",
          audioStory:
            "Formally known as Jagara Valley, Bhadra is home to ancient shola ecosystems and provides a natural corridor for Karnataka's wild elephant herds.",
          crowdPrediction: "Evening boat safari departs 4:30 PM",
          accessible: true,
          accessibilityNote: "Safari jeeps accommodate elderly travelers",
        },
      ],
    });
  }

  if (daysNum >= 6) {
    days.push({
      day: 6,
      theme: "Coastal Grandeur, Murudeshwar & Maravanthe Beach",
      activities: [
        {
          time: "Morning",
          place: "Murudeshwar Shiva Temple & Raja Gopura",
          lat: 14.0942,
          lng: 74.4899,
          cost: 50,
          desc: "World's second-tallest Shiva statue (123 feet) surrounded on three sides by the Arabian Sea.",
          audioStory:
            "According to the Ramayana lore, Ravana cast down the cloth covering the Atma Linga on this cliff, known as Kanduka Giri, blessing the Arabian sea coast.",
          crowdPrediction: "Lift to 18th floor of Raja Gopura has shortest queue before 9:30 AM",
          accessible: true,
          accessibilityNote: "Elevators installed inside the 20-story Raja Gopura",
        },
        {
          time: "Afternoon",
          place: "Maravanthe Beach Coastal Highway",
          lat: 13.7058,
          lng: 74.6467,
          cost: 0,
          desc: "Spectacular highway where the turquoise Arabian Sea runs on the right and the Souparnika River flows on the left.",
          audioStory:
            "Maravanthe is considered one of India's most breathtaking scenic drives, immortalized in countless Kannada movies and coastal poetry.",
          crowdPrediction: "Breeze is pleasant; shaded shacks serve tender coconut",
          accessible: true,
          accessibilityNote: "Highway viewpoint parking bay with direct ramp",
        },
        {
          time: "Evening",
          place: "Malpe Beach & St. Mary's Basaltic Rock View",
          lat: 13.3525,
          lng: 74.7042,
          cost: 40,
          desc: "Golden sands, sunset camel walks, and coastal shacks serving fresh fish fry and Neer Dosa.",
          audioStory:
            "Vasco da Gama first landed at nearby St. Mary's Island in 1498, marveling at its unique hexagonal basaltic rock pillars formed by prehistoric sub-volcanic lava.",
          crowdPrediction: "Sunset is peak social hour; lifeguard patrols active",
          accessible: true,
          accessibilityNote: "Malpe has a paved wheelchair beach walkway to the surf line",
        },
      ],
    });
  }

  if (daysNum >= 7) {
    days.push({
      day: 7,
      theme: "UNESCO Wonder: The Golden Ruins of Hampi",
      activities: [
        {
          time: "Morning",
          place: "Virupaksha Temple & Hampi Bazaar",
          lat: 15.3358,
          lng: 76.4601,
          cost: 50,
          desc: "7th-century functioning temple with a 160-foot gopura on the banks of the Tungabhadra river.",
          audioStory:
            "Virupaksha Temple survived the 1565 battle that destroyed Vijayanagara. Its sanctum features an optical pinhole camera effect inverting the gopura shadow on inner walls.",
          crowdPrediction: "Attend temple elephant Lakshmi's morning bath at Tungabhadra river (8:00 AM)",
          accessible: true,
          accessibilityNote: "Paved entrance; inner sanctum has a low threshold",
        },
        {
          time: "Afternoon",
          place: "Vijaya Vittala Temple & Stone Chariot",
          lat: 15.3438,
          lng: 76.4764,
          cost: 40,
          desc: "Iconic stone chariot featured on the 50 Rupee note, flanked by musical pillars producing sapthaswara.",
          audioStory:
            "Built by King Krishnadevaraya in the 16th century, the stone chariot is dedicated to Garuda. Its stone wheels once freely rotated on axles.",
          crowdPrediction: "Battery electric buggies run continuously from parking to temple gate",
          accessible: true,
          accessibilityNote: "Electric buggies provided for seniors & kids",
        },
        {
          time: "Evening",
          place: "Hemakuta Hill Sunset & Tungabhadra Coracle Ride",
          lat: 15.3332,
          lng: 76.4583,
          cost: 100,
          desc: "Golden twilight over boulder-strewn landscapes and ancient pre-Vijayanagara triple-chamber shrines.",
          audioStory:
            "According to mythology, gold showered on this hill when Lord Shiva consented to marry Pampa Devi, earning it the eternal name Hemakuta ('Hill of Gold').",
          crowdPrediction: "Golden hour viewpoint (5:30 PM – 6:15 PM) is unmissable",
          accessible: false,
          accessibilityNote: "Gentle rock slope with some rock-cut footholds",
        },
      ],
    });
  }

  const numericBudget =
    typeof budget === "string" ? parseInt(budget.replace(/\D/g, ""), 10) : budget;

  return {
    ...FALLBACK_KARNATAKA_ITINERARY,
    title: `${travelVibe || "Karnataka Heritage"} Safari: ${startingCity} Circuit`,
    totalBudget:
      numericBudget && !isNaN(numericBudget) ? numericBudget : 8500 * Math.ceil(daysNum / 3),
    overview: `An authentic ${daysNum}-day exploration starting from ${startingCity}, crafted for ${groupType.toLowerCase()} travel with scenic transit, historical immersion, and crowd-optimized pacing.`,
    days,
  };
}

export default generateItinerary;
