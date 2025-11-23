# HP SmartTrack

HP SmartTrack is a dual-role platform (Distributor & Customer) designed to digitize the last-mile LPG ecosystem, addressing the "Invisible Inventory" challenge by bridging the gap between distributors and customers. The app moves away from paper logs to real-time, data-driven management.

---

## Features

### Distributor Dashboard (The "Command Center")  
Designed for logistics managers to optimize inventory and ensure safety:

- **Real-Time Metrics:** Immediate visibility into total cylinders in circulation, returns, and critical safety checks.  
- **Geo-Insight Analytics:** Heatmap-style breakdown of regions with a "Health Score" to identify areas with high hoarding (idle assets).  
- **Fleet Tracking:** Live status of delivery vehicles (Delivering vs. Returning), load percentage, and ETA.  
- **AI Demand Prediction (Gemini):** Uses Google Gemini to analyze sales history and current stock to generate procurement recommendations.  
- **Idle Asset Recovery:** Flags customers who have held cylinders for more than 60 days to recover invisible inventory.  
- **Compliance:** Visual trackers for regulator expiry and hydro-testing to ensure no unsafe equipment is in circulation.

### Customer Dashboard (The "Engagement App")  
A mobile-first, gamified experience designed to encourage timely refills and safety compliance:

- **Visual Refill Tracker:** Predicts "Days Left" with a progress bar changing color (Orange → Red) as the cylinder empties.  
- **Gamification (HP Star Rewards):** Wallet system that rewards users with "Coins" for timely behavior.  
- **Visual Inventory:** Displays cylinders using flame icons instead of just a number.  
- **Digital Safety Certificate:** Shows regulator expiry and safety check status visually.  
- **Idle Return Action:** Dedicated button to return extra cylinders, reducing hoarding.  
- **AI Safety Assistant:** Built-in chat powered by Gemini for instant safety guidance.

---

## Installation & Setup

1. Provide your gemini api key by making .env.local file as GEMINI_API_KEY = "your api key"

2. **Clone the repository:**  
```bash
git clone https://github.com/yourusername/LpgConnect.git
cd LpgConnect
Install dependencies:

bash
Copy code
npm install
Running the App (Start the development server):

bash
Copy code
npm run dev
The app will usually run at: http://localhost:3000
