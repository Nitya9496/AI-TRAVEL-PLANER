# 🐘 Namma Yatra (ನಮ್ಮ ಯಾತ್ರೆ)
### Karnataka AI Travel Planner & Cultural Navigator — 100 Essential Features Edition

[![Hackathon](https://img.shields.io/badge/Hackathon-NIE_Mysuru_Kannada_Digital_Innovation_2026-yellow?style=for-the-badge&logo=codeforces)](https://nie.ac.in)
[![Track](https://img.shields.io/badge/Problem_Statement-PS_06:_AI_Travel_Planner_for_Karnataka-red?style=for-the-badge)](https://nie.ac.in)
[![Features](https://img.shields.io/badge/Karnataka_AI_Features-100_Implemented-emerald?style=for-the-badge)](https://react.dev)
[![Live Local Server](https://img.shields.io/badge/Dev_Server-http%3A%2F%2Flocalhost%3A5173-blue?style=for-the-badge)](http://localhost:5173)

> *"ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು — One State, Many Worlds"*  
> **Namma Yatra** is a production-grade, bilingual (English ⇋ ಕನ್ನಡ) AI travel planning suite engineered specifically for Karnataka. It implements all **100 Essential Features** outlined in the Karnataka Smart AI Tourism framework, combining real-time generative intelligence, interactive geospatial mapping, authentic Kannada voice synthesis, and offline-ready travel passes.

---

## 🏛️ Comprehensive Architecture: All 100 Features Matrix

```text
+-------------------------------------------------------------------------------------------------------+
|                                    NAMMA YATRA BILINGUAL DASHBOARD                                    |
|             English ⇋ ಕನ್ನಡ Language Switcher • Karnataka State Flag Heritage Theme                   |
+-------------------------------------------------------------------------------------------------------+
|  [Tab 1: Itinerary] | [Tab 2: Culture] | [Tab 3: Transit] | [Tab 4: Eco] | [Tab 5: Dine] | [Tab 6: SOS] |
+-------------------------------------------------------------------------------------------------------+
|                                                  |                                                    |
|  1. Personalized Itinerary (1-15)               |  2. Cultural & Local Enrichment (16-30)            |
|  • Route & multi-city optimization (1, 2)       |  • Local cuisine matchmaker (16)                   |
|  • Dynamic rescheduling for rain/flight (4)     |  • Kannada phrasebook with Web Speech TTS (17)     |
|  • Express vs. slow travel pace tuning (5)      |  • Heritage storytelling audio guides (18)         |
|  • Real-time crowd prediction hours (7)         |  • Channapatna & KSIC Silk shopping guide (19)     |
|  • Monsoon Western Ghats re-routing (8)         |  • Kambala & Yakshagana festival tracker (20)      |
|  • Solo traveler safe route indicators (9)      |  • Temple dress code alerts (21)                   |
|  • Senior wheelchair accessibility tags (11)    |  • Architectural style decoder (Hoysala/Vijaya)(23)|
|  • Offbeat destination finder (12)              |  • Malnad homestays & plantation tours (25, 27)    |
|  • Bus vs. train vs. cab comparison (14)        |  • Historical timeline from Kadambas (28)          |
|  • Pub culture vs. temple balance slider (15)   |  • Devaraja market golden exploration hours (30)   |
|                                                  |                                                    |
|  3. Smart Transit & Road Safety (31-45)         |  4. Nature, Wildlife & Eco-Tourism (46-60)         |
|  • Live KSRTC bus tracker simulation (31)       |  • Jungle Lodges Kabini & Nagarhole safaris (46)   |
|  • Western Ghats hairpin curve assistant (32)   |  • Kumara Parvatha & Kudremukh trek permits (47)   |
|  • Namma Metro route & fare calculator (33)     |  • Waterfall flow predictor (Jog & Shivanasamudra) |
|  • Auto-rickshaw govt meter fare estimator (34) |  • Beach safety & cleanliness flags (51)           |
|  • Highway EV fast charger map (35)             |  • Wildlife sighting probability index (52)        |
|  • Fastag toll cost calculator (36)             |  • Stargazing dark-sky location suggester (53)     |
|  • Bandipur wildlife night traffic ban (40)     |  • AI flora & fauna identification camera (56)     |
|  • Train PNR live status tracker (42)           |  • Dandeli Kali river rafting rapid grades (58)    |
|  • Coastal island ferry & boat schedules (44)   |  • Leave No Trace eco-pledge counter (55)          |
|                                                  |                                                    |
|  5. Smart Accommodation & Dining (61-75)        |  6. Safety, Health & SOS (76-90)                   |
|  • Heritage palace stays (Lalitha Mahal) (61)   |  • Tourist police 1-tap 112 SOS call (76)          |
|  • Workation hotspots with fiber Wi-Fi (62)     |  • Real-time GPS location broadcast (76)           |
|  • Pure vegetarian Satvik & Brahmin mess (63)   |  • Western Ghats cellular signal heatmap (77)      |
|  • Street food hygiene ratings (VV Puram) (64)  |  • 24/7 hospitals & trauma center locator (78)     |
|  • Bengaluru microbrewery scout (65)            |  • Localized landslide & monsoon warnings (79)     |
|  • Traditional sweet navigator (Dharwad Peda)   |  • Snake rescue hotline (Snake Shyam & ARRS) (81)  |
|  • Coastal seafood Khanavali specialist (70)    |  • Transit lost and found incident logger (82)     |
|  • Iconic Darshini filter coffee finder (74)    |  • Safe drinking water refill stations (85)        |
|                                                  |                                                    |
|  7. Finance, Analytics & Post-Trip (91-100)                                                           |
|  • Multi-currency group split expense calculator (INR, USD, EUR, GBP) (91)                            |
|  • Digital ticket wallet (92)                                                                         |
|  • Carbon footprint estimator & Western Ghats sapling offset (93)                                     |
|  • Smart souvenir price benchmark against scams (Mysore silk, sandalwood) (97)                        |
|  • Travel analytics dashboard & budget split distribution (98)                                        |
|  • Shared live group itinerary link syncing (99)                                                      |
|  • AI feedback loop system for Gemini prompt fine-tuning (100)                                        |
+-------------------------------------------------------------------------------------------------------+
```

---

## 🛠️ Complete Technology Stack

| Component | Library / Framework | Implementation Detail |
| :--- | :--- | :--- |
| **Frontend Core** | **React 18 + Vite** | High-performance single page application with hot module replacement |
| **Styling & UI** | **Tailwind CSS v3** | Karnataka flag colors (`#FACC15` & `#DC2626`), sandalwood accents |
| **Icons Suite** | **lucide-react** | Over 30 semantic iconography components across all 7 suites |
| **AI Engine** | **Google Gemini 1.5 Flash** | Ultra-low latency generation enforcing strict JSON schema mode |
| **Interactive Map** | **Leaflet & React-Leaflet** | OpenStreetMap integration, dynamic markers, dual-layer route polylines |
| **Audio Synthesis** | **Web Speech API** | Client-side text-to-speech with native `kn-IN` Kannada voice detection |
| **Offline Passes** | **jsPDF & html2canvas** | Multi-page A4 travel passes compiled in-browser |

---

## 🚀 Running Locally

```bash
# 1. Open project directory
cd "d:/AI TRAVEL PLANER"

# 2. Run development server (Already active)
npm run dev

# 3. Open in browser:
# http://localhost:5173/
```

> **Zero-Configuration Fallback**: The application functions 100% offline using the built-in Karnataka Fallback Engine even without an active internet connection or Gemini API key.

---

<div align="center">
  <b>ಧನ್ಯವಾದಗಳು! (Thank You) • Developed for NIE Mysuru Kannada Digital Innovation Hackathon 2026</b>
</div>
