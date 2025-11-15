# Dynamic UI Optimizer — Swiggy Model

This project is a hackathon-ready application that dynamically optimizes UI layouts using an epsilon-greedy algorithm. The goal is to select the best UI card variant while collecting feedback and tracking statistics over time.

## Features
- Backend (Node.js + Express):
  - Epsilon-greedy decision-making.
  - API endpoints for decision, reward submission, health check, and state reset.
  - In-memory state management (or Redis for persistence).
- Frontend (React + TypeScript):
  - Interactive UI to test decisions and submit rewards.
  - Telemetry log panel to track decisions for demo purposes.
  - Fallback client-side mock API in case the backend is unreachable.
  - Styled with TailwindCSS for rapid prototyping.

---

## Repository Structure

```
dynamic-ui-optimizer/
├── backend/
│   ├── index.ts.....................(Backend entry point)
│   ├── store.ts.....................(In-memory/Redis state management)
│   ├── package.json.................(Backend dependencies)
│   ├── .env.example.................(Environment variable template)
│   ├── README.md....................(Backend-specific documentation)
│   └── test/
│       └── integration.test.js......(Basic integration tests)
├── frontend/
│   ├── public/
│   │   └── index.html...............(Frontend HTML container)
│   ├── src/
│   │   ├── main.tsx.................(Frontend entry point)
│   │   ├── App.tsx..................(Main application component)
│   │   ├── api.ts...................(Utility for API requests)
│   │   ├── components/
│   │   │   ├── Header.tsx...........(Header component)
│   │   │   ├── Controls.tsx.........(UI to trigger decisions)
│   │   │   ├── RestaurantCard.tsx...(UI card for optimized sections)
│   │   │   ├── OptimizerPanel.tsx...(Decision and reward control panel)
│   │   │   ├── Telemetry.tsx........(Logs UI actions)
│   ├── styles/
│   │   ├── tailwind.config.js.......(Tailwind configurations)
│   │   └── styles.css...............(Tailwind CSS imports)
│   ├── README.md....................(Frontend-specific documentation)
│   ├── tsconfig.json................(TypeScript configurations)
│   ├── package.json.................(Frontend dependencies)
└── README.md........................(Root repository documentation)
```

---

## Setup Instructions

### Prerequisites
- Node.js (16.x or higher).
- Redis (optional; required for persistent storage).
- Yarn or npm.
- Modern browser for frontend (e.g., Chrome, Edge).

---

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy and set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the backend server:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

---

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in the browser:
   ```
   http://localhost:5173
   ```

---

## API Endpoints (Backend)

### `POST /api/decide`
Triggers the epsilon-greedy decision-making algorithm and returns the chosen card variant and the current state snapshot.

### `POST /api/reward`
Logs a reward value for a given card variant to improve future decision-making.

### `GET /api/state`
Returns the current backend state (useful for debugging).

### `GET /health`
Returns backend uptime.

### `POST /reset`
Resets the backend state (requires a special secret).

---

## Demo Script

Here’s a step-by-step script to test the backend and frontend integration.

1. Choose a **time slot** and **category** in the frontend Controls panel.
2. Click `Make Decision` to see the chosen card variant.
3. Interact with the `Reward` buttons to provide feedback.
4. Observe the **state snapshot** and **telemetry log** updating in real time.

---

## Troubleshooting

1. **Backend Not Responding:**
   - Ensure the server is running at the specified port (`3000` by default).
   - Check the `.env` file for correct configurations.

2. **Frontend API Connection Fails:**
   - Confirm the `REACT_APP_API_URL` in the frontend points to the correct backend address.

3. **State Not Persisting in Backend:**
   - Run a Redis instance and update the `REDIS_URL` in the backend environment file.

---

## Project Deployment

To bundle and deploy the application:
1. Build the frontend using:
   ```bash
   npm run build
   ```

2. Deploy the `backend` folder to your server or a cloud service (like AWS or DigitalOcean).

3. Serve the frontend build files using any static file server or include them in the backend.

To package this repository as a zip file locally:
```bash
zip -r dynamic-ui-optimizer.zip *
```

Happy Hacking!