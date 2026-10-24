# 🐘 Namma Yatra (ನಮ್ಮ ಯಾತ್ರೆ)
### Autonomous AI Travel Companion & Intelligent Karnataka Tourism Navigator

<p align="center">
  <img src="public/karnataka-emblem.png" alt="Karnataka Emblem" width="120" />
</p>

<p align="center">
  <strong>"ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು — One State, Many Worlds"</strong><br>
  <em>Next-Generation Autonomous Travel Intelligence Engineered for Karnataka's Rich Heritage & Modern Wonders</em>
</p>

<p align="center">
  <a href="https://github.com/Nitya9496/AI-TRAVEL-PLANER"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" /></a>
  <a href="https://brisk-nitrogen-kadel9r.tmp.now"><img src="https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React_18-Vite_5-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://firebase.google.com"><img src="https://img.shields.io/badge/Firebase-Auth_Suite-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /></a>
  <a href="https://ai.google.dev"><img src="https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
</p>

---

## 🌟 Executive Overview

**Namma Yatra (ನಮ್ಮ ಯಾತ್ರೆ)** is a full-stack, autonomous AI travel planning ecosystem created specifically for travelers exploring Karnataka. Powered by **Google Gemini 1.5 Flash**, **Firebase Authentication**, **Leaflet geospatial maps**, and a native **Kannada Voice Engine**, it transforms how explorers experience Karnataka's UNESCO heritage temples, Western Ghats misty passes, pristine Arabian sea coastlines, and bustling tech hubs.

Whether calculating Ghat road hairpin hazards, budgeting KSRTC Rajahamsa routes, bargaining with auto-rickshaw drivers in colloquial Kannada, or getting real-time itinerary updates from autonomous AI agent **"Namma Sanchari"**, Namma Yatra delivers an unparalleled travel concierge experience.

---

## 🚀 Key Highlights & Autonomous Capabilities

### 🤖 1. "Namma Sanchari" — Real-Time Autonomous AI Travel Agent
* **Floating Slide-Over Concierge Drawer**: Always-accessible bottom-right floating trigger with pulsating glowing indicator.
* **Autonomous Itinerary Re-Planning**: Type or speak a prompt (e.g. *"Replan for 2 days under ₹8,000 with more beach trails"*), and the agent autonomously rewrites the itinerary and dynamically re-renders maps, timeline cards, and budget splits without page reloads.
* **Speech-to-Text Input**: Integrated Web Speech API (`webkitSpeechRecognition`) for hands-free voice search.
* **Curated Quick Actions**: One-tap query chips for Gokarna trails, Mysuru heritage, and Kannada auto negotiation phrases.
* **Zero-Crash Resilience**: Built-in instant fallback engine guaranteeing 100% demo uptime even during API rate limits.

### 🔐 2. Production Firebase Authentication Suite
* **One-Click Google Sign-In**: Instant OAuth popup login via `signInWithPopup`.
* **Email & Password Authentication**: Smooth toggle between Login and Account Registration with form validation.
* **Indian Mobile Phone OTP (+91)**: Native SMS verification with invisible reCAPTCHA verifier (`RecaptchaVerifier`).
* **Instant Demo Sign-In**: 1-click test bypass (`123456`) designed to bypass Indian telecom (TRAI DLT) SMS filtering and Spark quota caps.
* **Global Session State**: Persistent local cache synced directly with `onAuthStateChanged` displaying user credentials across the navigation header.

### 🗺️ 3. Interactive Geospatial Explorer (Leaflet & OpenStreetMap)
* **Real-Time Karnataka Coordinates**: Dynamic pins placed on exact historical monuments, beaches, wildlife safaris, and ghats.
* **Dual-Layer Route Polylines**: Visual path rendering connecting Day 1, Day 2, and Day 3 destinations.
* **Curated Popups**: Visual spot cards with thumbnail imagery, arrival time slot, and estimated entry fee in ₹.

### 🗣️ 4. Kannada Cultural Hub & Audio Storyteller
* **Bilingual UI Toggle**: 1-tap transition between **English** and **ಕನ್ನಡ (Kannada)** across all 7 feature suites.
* **Audio Storytelling**: Native Web Speech text-to-speech narrating local legends (Belur Chennakeshava, Hampi Vittala chariot, Om Beach).
* **Kannada Survival Phrasebook**: Essential everyday survival phrases for auto bargaining, restaurant ordering, and asking directions with audio pronunciation.

### 📊 5. Smart Transit, Safety & Budget Engine
* **Smart Transit Hub**: Real-time comparison between KSRTC Airavat, Indian Railways, and coastal ferries.
* **Western Ghats Safety Radar**: Hairpin curve cautions, Charmadi & Shiradi Ghat monsoon advisories, and Bandipur night traffic ban timer (9:00 PM – 6:00 AM).
* **Emergency SOS & Police**: 1-tap dialer for 112 Karnataka Tourist Police and Snake Shyam emergency wildlife rescue.
* **Offline PDF Travel Pass**: High-resolution, multi-page exportable travel dossier generated via `html2canvas` and `jsPDF`.

---

## 🏛️ Comprehensive 7-Suite Feature Matrix

```text
+----------------------------------------------------------------------------------------------------------------+
|                                        NAMMA YATRA BILINGUAL DASHBOARD                                         |
|                  English ⇋ ಕನ್ನಡ Interface  •  Karnataka State Flag Theme (#FACC15 & #DC2626)                  |
+----------------------------------------------------------------------------------------------------------------+
|  [1. Itinerary & Maps]  [2. Culture & Audio]  [3. Smart Transit]  [4. Wildlife]  [5. Dining]  [6. Safety & SOS] |
+----------------------------------------------------------------------------------------------------------------+
|                                                       |                                                        |
|  1. Personalized Route Engine                         |  2. Cultural & Local Enrichment                        |
|  • AI multi-day schedule (Morning/Afternoon/Evening)  |  • Kannada phrasebook with native Web Speech TTS       |
|  • Express vs. relaxed pacing slider                  |  • Heritage storytelling audio guides                  |
|  • Dynamic re-routing for rain or unexpected delays   |  • Channapatna toy craft & Mysore silk shopping spots  |
|  • Solo traveler safe route indicators               |  • Kambala, Karaga, and Yakshagana festival alerts     |
|  • Senior wheelchair accessibility tags               |  • Hoysala vs. Vijayanagara architecture guide         |
|  • Offbeat destination recommendations                |  • Malnad homestay & coffee plantation planner        |
|                                                       |                                                        |
|  3. Smart Transit & Road Safety                       |  4. Nature, Wildlife & Eco-Tourism                     |
|  • KSRTC bus route finder & fare estimator            |  • Kabini, Nagarhole & Bandipur safari booking advice  |
|  • Western Ghats hairpin curve driving assistant      |  • Kudremukh & Kumara Parvatha trek permit guide       |
|  • Namma Metro route & token calculator               |  • Jog Falls & Shivanasamudra water flow tracker       |
|  • Auto-rickshaw govt meter fare estimator            |  • Coastal beach cleanliness & red flag safety radar   |
|  • EV fast-charging highway locator                   |  • Wildlife sighting probability index                 |
|  • Bandipur national park night traffic ban alert     |  • Leave No Trace eco-pledge tracker                   |
|                                                       |                                                        |
|  5. Dining & Authentic Cuisine                        |  6. Safety, Health & SOS Hub                           |
|  • Traditional Udupi Darshini filter coffee finder    |  • Tourist Police 1-tap 112 emergency dialer           |
|  • North Karnataka Jolada Rotti Khanavali spots       |  • Western Ghats cellular dead-zone heatmap            |
|  • Mysore Pak & Dharwad Peda heritage sweet tracker   |  • 24/7 district hospital & trauma center directory   |
|  • Coastal Mangaluru seafood specialist radar         |  • Snake rescue hotline (Snake Shyam & ARRS)           |
|                                                       |                                                        |
|  7. Finance, Group Split & Analytics                  |                                                        |
|  • Multi-currency expense split calculator (₹, $, €)  |                                                        |
|  • Visual budget breakdown (Stay, Travel, Food, Misc) |                                                        |
|  • Carbon footprint estimator with sapling offset     |                                                        |
|  • Multi-page offline PDF Travel Pass download        |                                                        |
+----------------------------------------------------------------------------------------------------------------+
```

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) | Blazing fast client bundle with hot module replacement |
| **Styling** | [Tailwind CSS v3.4](https://tailwindcss.com/) | Responsive design with Karnataka state color palette |
| **Icons** | [Lucide React](https://lucide.dev/) | Over 35 clean semantic icons |
| **AI Intelligence** | [Google Gemini 1.5 Flash](https://ai.google.dev/) | Ultra-fast JSON itinerary generation & autonomous reasoning |
| **Authentication** | [Firebase v10 (Auth)](https://firebase.google.com/) | Google OAuth, Email/Password, & Phone OTP verification |
| **Maps & GIS** | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) | Geospatial visualization, dynamic markers & route lines |
| **Voice Engine** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Client-side speech recognition & native Kannada TTS |
| **Dossier Export** | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) | Client-side vector PDF generation |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge network delivery |

---

## 📁 Repository Directory Structure

```bash
AI-TRAVEL-PLANER/
├── public/                       # Static public assets
│   ├── hero-coastal.jpg          # Coastal Karnataka scenic backdrop
│   ├── hero-highway.jpg          # Maravanthe NH66 coastal highway
│   ├── karnataka-coastal.png     # Custom coastal map imagery
│   └── karnataka-emblem.png      # Official Gandaberunda emblem
├── src/
│   ├── components/
│   │   ├── AgentDrawer.jsx       # "Namma Sanchari" slide-over AI agent drawer
│   │   ├── AuthModal.jsx         # Firebase multi-provider modal (Google/Email/OTP)
│   │   ├── CulturalHub.jsx       # Heritage storytelling, architecture & festivals
│   │   ├── DiningStayHub.jsx     # Darshini, Khanavali & homestay curator
│   │   ├── EcoWildlifeHub.jsx    # Safari permits, waterfalls & trek guides
│   │   ├── FinanceAnalyticsHub.jsx# Expense tracker, group split & carbon offset
│   │   ├── KannadaSurvivalKit.jsx# Audio phrasebook & auto-bargaining kit
│   │   ├── NammaYatraHero.jsx    # Header, banner & multi-city prompt builder
│   │   ├── SafetyHealthHub.jsx   # 112 Police SOS, snake rescue & hospital radar
│   │   ├── SmartTransitHub.jsx   # KSRTC buses, Metro, tolls & Ghat radar
│   │   └── TravelMap.jsx         # Interactive Leaflet map with custom pins
│   ├── services/
│   │   ├── aiAgent.js            # Namma Sanchari autonomous reasoning service
│   │   └── geminiService.js      # Structured Google Gemini API integration
│   ├── App.jsx                   # Master dashboard state & tab coordinator
│   ├── firebase.js               # Firebase client initialization & auth exports
│   ├── index.css                 # Tailwind typography & animation styles
│   ├── leafletFix.js             # Leaflet marker icon asset patch
│   ├── main.jsx                  # React DOM mount point
│   └── translations.js           # Bilingual English ⇋ ಕನ್ನಡ dictionary
├── .env.example                  # Environment variable blueprint
├── .gitignore                    # Git ignore file (omits node_modules & .env)
├── index.html                    # Root HTML file with persistent reCAPTCHA
├── package.json                  # Dependencies & scripts definition
├── tailwind.config.js            # Tailwind theme tokens & color extensions
└── vite.config.js                # Vite build & bundler configuration
```

---

## ⚡ Quickstart Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Nitya9496/AI-TRAVEL-PLANER.git
cd AI-TRAVEL-PLANER
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```

Configure your API credentials inside `.env`:
```env
# Google Gemini AI Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Authentication Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> [!NOTE]
> Even without active API keys, Namma Yatra includes a **pre-baked offline intelligence fallback** that provides authentic itineraries for all major Karnataka circuits!

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 📱 Mobile Phone OTP Testing Instructions

Google Firebase limits free tier accounts to **10 SMS per day** and Indian telecom carriers (Airtel/Jio/Vi) often delay international SMS due to TRAI DLT regulations. To test Phone Authentication seamlessly:

1. Open your [Firebase Console](https://console.firebase.google.com/) &rarr; **Authentication** &rarr; **Sign-in method** &rarr; **Phone**.
2. Under **"Phone numbers for testing"**, add:
   - **Phone**: `+91 9876543210`
   - **Test OTP**: `123456`
3. In the application's Phone Sign-In tab:
   - Enter `9876543210` and click **"Send 6-Digit SMS OTP"**.
   - Click the one-tap **"Auto-Fill & Verify Code (123456)"** button for instant verification!
   - Or click **"Instant Phone Sign-In"** to log in immediately without waiting for SMS!

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are welcome!
1. Fork the Project (`https://github.com/Nitya9496/AI-TRAVEL-PLANER/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ for Karnataka Tourism | <strong>ನಮ್ಮ ಕರ್ನಾಟಕ, ನಮ್ಮ ಹೆಮ್ಮೆ</strong>
</p>
