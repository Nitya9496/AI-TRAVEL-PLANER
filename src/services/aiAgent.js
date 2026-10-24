const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Pre-baked fallbacks to safeguard against API limits or network drops during demo.
 */
const MOCK_AGENT_FALLBACKS = {
  gokarna: {
    replyMessage:
      "Namaskara! I have updated your journey to feature the stunning Coastal Karnataka beach trail, adding Om Beach, Kudle Beach, and the coastal heritage of Gokarna & Murudeshwar.",
    updatedItinerary: {
      title: "Coastal Karnataka: Gokarna Beach Trail & Murudeshwar",
      totalBudget: 12000,
      overview:
        "A breathtaking coastal journey exploring the sacred cliffs of Gokarna, the pristine shores of Om Beach & Kudle Beach, and the colossal Arabian Sea Shiva statue in Murudeshwar.",
      budgetSplit: { travel: 35, stay: 35, food: 20, activities: 10 },
      festivalAlert: {
        active: true,
        name: "Mahashivaratri at Mahabaleshwar Temple",
        tip: "Witness grand sea-facing temple chariot processions at Car Street, Gokarna.",
      },
      days: [
        {
          day: 1,
          theme: "Sacred Shores & Sunset of Gokarna",
          activities: [
            {
              time: "Morning",
              place: "Mahabaleshwar Temple & Kotitirtha",
              lat: 14.5428,
              lng: 74.3184,
              cost: 0,
              desc: "Visit the 4th-century sacred granite shrine housing the revered Atmalinga on the Arabian Sea coast.",
              audioStory: "Legend says Ravana was tricked into placing the holy Atmalinga here by Ganesha disguised as a young cowherd, rooting it eternally into the sands.",
            },
            {
              time: "Afternoon",
              place: "Kudle Beach Cafe Trail",
              lat: 14.5323,
              lng: 74.3168,
              cost: 150,
              desc: "Leisurely beach walk and coastal seafood dining under coconut palms overlooking turquoise waves.",
              audioStory: "Kudle Beach forms a crescent valley between two rugged cliffs, offering an idyllic escape praised by coastal travelers worldwide.",
            },
            {
              time: "Evening",
              place: "Om Beach Cliffside Walk",
              lat: 14.5199,
              lng: 74.3157,
              cost: 50,
              desc: "Climb the rocky promontory where two semi-circular coves naturally join to form the sacred Hindu 'ॐ' (Om) symbol.",
              audioStory: "Om Beach is world-famous for its natural geological shape mirroring the sacred syllable, surrounded by black laterite rock formations.",
            },
          ],
        },
        {
          day: 2,
          theme: "Coastal Grandeur & Murudeshwar Shiva Statue",
          activities: [
            {
              time: "Morning",
              place: "Murudeshwar Shiva Temple & 20-Story Raja Gopura",
              lat: 14.0942,
              lng: 74.4899,
              cost: 50,
              desc: "Take the high-speed lift to the 18th floor of the Raja Gopura for a panoramic view of the 123-foot ocean-facing Shiva statue.",
              audioStory: "Built atop the Kanduka Giri cliff, Murudeshwar is surrounded on three sides by the waters of the Arabian Sea.",
            },
            {
              time: "Afternoon",
              place: "Mirjan Fort",
              lat: 14.4934,
              lng: 74.4194,
              cost: 30,
              desc: "Walk through moss-covered laterite battlements and secret moats built by Rani Chennabhairadevi (The Pepper Queen).",
              audioStory: "Rani Chennabhairadevi ruled for 54 years, defying Portuguese armadas and controlling India's prime black pepper trade from this fort.",
            },
            {
              time: "Evening",
              place: "Maravanthe Beach Sunset Drive",
              lat: 13.7058,
              lng: 74.6467,
              cost: 0,
              desc: "Scenic coastal highway with the Arabian sea on your left and the Souparnika river on your right.",
              audioStory: "One of the most photogenic marine roads in Asia, immortalized in countless classic Kannada folk songs and cinema.",
            },
          ],
        },
      ],
      transit: [
        {
          route: "Bengaluru to Gokarna Road",
          mode: "KSRTC Airavat Club Class / Panchaganga Express",
          approxCost: 750,
          bookingUrl: "https://www.ksrtc.in",
        },
        {
          route: "Gokarna to Murudeshwar",
          mode: "KSRTC Non-AC Sleeper / Local Train",
          approxCost: 180,
          bookingUrl: "https://www.ksrtc.in",
        },
      ],
      kannadaSurvivalKit: [
        { kannada: "ಬೀಚ್‌ಗೆ ಹೇಗೆ ಹೋಗಬೇಕು? (Beach-ge hege hogabeku?)", english: "How do I reach the beach?", usage: "Directions" },
        { kannada: "ಮೀನು ಊಟ ಇದೆಯಾ? (Meenu oota ideya?)", english: "Do you have fish meals?", usage: "Restaurants" },
        { kannada: "ಎಷ್ಟು ರೂಪಾಯಿ? (Eshtu roopayi?)", english: "How many rupees?", usage: "Bargaining / Auto" },
        { kannada: "ತುಂಬಾ ಧನ್ಯವಾದಗಳು (Thumba dhanyavadagalu)", english: "Thank you very much!", usage: "Courtesy" },
      ],
      localFood: [
        { dish: "Kane (Ladyfish) Ghee Roast & Neer Dosa", spot: "Giri Manja's / Fish Market Stalls, Gokarna" },
        { dish: "Mangalore Buns & Filter Kaapi", spot: "Prema Restaurant, Gokarna Town" },
      ],
    },
  },
  general: {
    replyMessage:
      "Namaskara! I am Namma Sanchari, your autonomous Karnataka travel companion. I have tailored your itinerary to focus on Karnataka's royal heritage in Mysuru and the misty coffee plantations of Coorg under ₹10,000.",
    updatedItinerary: {
      title: "Royal Mysuru & Coorg Coffee Circuit",
      totalBudget: 9500,
      overview:
        "A customized 3-day royal safari covering the illuminated Mysore Palace, Chamundi Hills, Srirangapatna river fortress, and the misty coffee estates of Madikeri.",
      budgetSplit: { travel: 30, stay: 35, food: 20, activities: 15 },
      festivalAlert: {
        active: true,
        name: "Mysuru Cultural Season",
        tip: "Visit Mysore Palace during Sunday evening lighting (7:00 PM – 8:00 PM) for 100,000 golden bulbs spectacle.",
      },
      days: [
        {
          day: 1,
          theme: "Heritage & Palaces of Mysuru",
          activities: [
            {
              time: "Morning",
              place: "Mysore Palace (Ambavilas)",
              lat: 12.3051,
              lng: 76.6551,
              cost: 100,
              desc: "Tour the golden throne room, stained glass durbar hall, and royal carriage collection.",
              audioStory: "Rebuilt in 1912 by British architect Henry Irwin after a fire, its Indo-Saracenic turrets symbolize Karnataka's royal glory.",
            },
            {
              time: "Afternoon",
              place: "Devaraja Market & Guru Sweets",
              lat: 12.3087,
              lng: 76.6517,
              cost: 150,
              desc: "Taste fresh Mysore Pak at its historic birthplace and explore natural attar perfumes and incense stalls.",
              audioStory: "Invented in 1935 by royal sweet-maker Kakasura Madappa, Mysore Pak combines pure ghee, gram flour, and cardamom sugar syrup.",
            },
            {
              time: "Evening",
              place: "Chamundi Hill & Monolithic Nandi",
              lat: 12.2743,
              lng: 76.6702,
              cost: 50,
              desc: "Panoramic sunset view across Mysuru city and the 350-year-old monolithic bull statue.",
              audioStory: "Chiseled from a single black granite boulder in 1659, this 16-foot Nandi is among the largest monolithic bulls in India.",
            },
          ],
        },
        {
          day: 2,
          theme: "Misty Coffee Highlands & Waterfalls of Coorg",
          activities: [
            {
              time: "Morning",
              place: "Abbey Falls, Madikeri",
              lat: 12.4516,
              lng: 75.7198,
              cost: 50,
              desc: "Hanging bridge view over roaring mountain cascades nestled inside private coffee estates.",
              audioStory: "Surrounded by pepper vines and wild arabica plants, Abbey Falls plunges 70 feet into the Cauvery river basin.",
            },
            {
              time: "Afternoon",
              place: "Raja's Seat & Madikeri Fort",
              lat: 12.4239,
              lng: 75.7382,
              cost: 40,
              desc: "Hilltop sunset garden where Kodava kings once spent quiet evenings enjoying sweeping valley vistas.",
              audioStory: "Kings of Coorg watched rolling mists gather in the valleys while royal musicians played classical strings.",
            },
            {
              time: "Evening",
              place: "Bylakuppe Golden Temple (Namdroling)",
              lat: 12.4542,
              lng: 75.9631,
              cost: 0,
              desc: "Visit the serene Tibetan Buddhist sanctuary adorned with 40-foot gilded statues and colorful thangkas.",
              audioStory: "Founded in 1963 by Penor Rinpoche, Bylakuppe is the largest Tibetan settlement in South India.",
            },
          ],
        },
      ],
      transit: [
        {
          route: "Bengaluru to Mysuru",
          mode: "KSRTC Airavat / Vande Bharat Express",
          approxCost: 380,
          bookingUrl: "https://www.ksrtc.in",
        },
        {
          route: "Mysuru to Madikeri (Coorg)",
          mode: "KSRTC Rajahamsa Coach",
          approxCost: 260,
          bookingUrl: "https://www.ksrtc.in",
        },
      ],
      kannadaSurvivalKit: [
        { kannada: "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ? (Namaskara, hegiddira?)", english: "Hello, how are you?", usage: "Polite Greeting" },
        { kannada: "ಮೀಟರ್ ಹಾಕಿ ಸರ್ (Meter haaki sir)", english: "Please turn on the meter, sir", usage: "Auto Rickshaw" },
        { kannada: "ಕಡಿಮೆ ಮಾಡಿ (Kadime maadi)", english: "Please reduce the price", usage: "Market Bargaining" },
        { kannada: "ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)", english: "Thank you very much!", usage: "Gratitude" },
      ],
      localFood: [
        { dish: "Original Ghee Mysore Pak", spot: "Guru Sweet Mart, Sayyaji Rao Rd, Mysuru" },
        { dish: "Authentic Pandi Curry & Kadambuttu", spot: "Coorg Cuisine, Madikeri" },
      ],
    },
  },
};

/**
 * Ask Namma Sanchari - The Autonomous Karnataka AI Travel Companion
 *
 * @param {string} userMessage - Prompt / command from user
 * @param {Object|null} currentItinerary - Current active itinerary in app state
 * @returns {Promise<{replyMessage: string, updatedItinerary?: Object}>}
 */
export async function askTravelAgent(userMessage, currentItinerary = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Determine fallback key based on query intent
  const lowerMsg = userMessage.toLowerCase();
  const fallbackObj = lowerMsg.includes("gokarna") || lowerMsg.includes("beach") || lowerMsg.includes("coast")
    ? MOCK_AGENT_FALLBACKS.gokarna
    : MOCK_AGENT_FALLBACKS.general;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("[Namma Sanchari] No API key detected. Using autonomous fallback response.");
    return fallbackObj;
  }

  const systemInstruction = `You are "Namma Sanchari - Autonomous Karnataka Travel Companion".
You are an expert guide on Karnataka tourism, KSRTC transit, Hoysala/Wadiyar history, local cuisine, and Kannada phrases.
Your goal is to answer the traveler's question, provide local insights, and dynamically customize/update their itinerary when requested.

If the user asks to modify, plan, reduce budget, add beaches/hills/temples, or change days:
- Return a helpful conversational explanation in "replyMessage".
- Generate the complete, valid "updatedItinerary" object strictly adhering to the schema below.
If the user only asks a general question, return a helpful "replyMessage" and you may return the existing itinerary or an updated one in "updatedItinerary".

CRITICAL: Return ONLY valid raw JSON without markdown ticks, code fences, or backticks.
REQUIRED JSON SCHEMA:
{
  "replyMessage": "Conversational explanation for the traveler",
  "updatedItinerary": {
    "title": "string",
    "totalBudget": 15000,
    "overview": "string",
    "days": [
      {
        "day": 1,
        "theme": "string",
        "activities": [
          { "time": "Morning | Afternoon | Evening", "place": "string", "lat": 12.3051, "lng": 76.6551, "cost": 100, "desc": "string", "audioStory": "2 sentence historical lore" }
        ]
      }
    ],
    "transit": [
      { "route": "string", "mode": "KSRTC Airavat / Train", "approxCost": 300 }
    ],
    "kannadaSurvivalKit": [
      { "kannada": "ಎಷ್ಟು? (Eshtu?)", "english": "How much?", "usage": "Shopping / Auto" }
    ],
    "localFood": [
      { "dish": "string", "spot": "string" }
    ]
  }
}`;

  const prompt = `User Message: "${userMessage}"

Current Active Itinerary:
${currentItinerary ? JSON.stringify(currentItinerary, null, 2) : "None yet."}

Respond as Namma Sanchari in the strict JSON format specified.`;

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
      console.warn(`[Namma Sanchari] Gemini responded with status ${response.status}. Using fallback.`);
      return fallbackObj;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return fallbackObj;
    }

    const cleanedText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedText);
    if (!parsed.replyMessage) {
      parsed.replyMessage = "I have updated your Karnataka journey based on your request!";
    }
    return parsed;
  } catch (err) {
    console.warn(`[Namma Sanchari] Autonomous agent error (${err.message}). Activating fallback.`);
    return fallbackObj;
  }
}

export default askTravelAgent;

