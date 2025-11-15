# Dynamic UI Optimizer — Backend

This is the backend service for the Dynamic UI Optimizer application. It provides APIs to dynamically decide UI sections and manage rewards using an epsilon-greedy algorithm.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Optional: Redis (if using Redis for the state store)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dynamic-ui-optimizer/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an environment file:
   Copy the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to set your environment variables.

4. (Optional) Start Redis:
   If using Redis, ensure it is running and specify the `REDIS_URL` in your `.env`.

### Running the Backend
1. To start the backend in production mode:
   ```bash
   npm start
   ```

2. To use `nodemon` for development:
   ```bash
   npm run dev
   ```

### Endpoints

#### `POST /api/decide`
Handles decision-making logic for UI optimization using epsilon-greedy strategy.

- **Request Body:**
  ```json
  {
    "timeSlot": "morning" | "lunch" | "evening" | "night",
    "sessionId": "<optional>",
    "recentCategory": "<optional>"
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "decision": { "sections": ["..."], "chosenCardVariant": "A" | "B" | "C" },
    "stateSnapshot": {
      "cardVariants": { "A": { "trials":num,"rewards":num }, "B":..., "C":... },
      "categoryCounts": { "<category>": num }
    }
  }
  ```

#### `POST /api/reward`
Accepts feedback and updates reward statistics for a specific card variant.

- **Request Body:**
  ```json
  {
    "variantId": "A" | "B" | "C",
    "reward": 1
  }
  ```
- **Response:**
  ```json
  {
    "ok": true,
    "cardVariants": { "...updated stats..." }
  }
  ```

#### `GET /api/state`
Returns the current application state.

#### `GET /health`
Returns information about backend service health (e.g., uptime).

#### `POST /reset`
Resets the application state (protected by a demo secret).

- **Request Body:**
  ```json
  { "secret": "<demo_secret>" }
  ```

### Testing
Run integration tests:
```bash
npm test
```

### Troubleshooting
- **Backend not reachable:** Ensure your `.env` and Redis setup are correct.
- **State not updating:** Check Redis logs if using Redis; fallback to in-memory by removing `REDIS_URL`.

### Contact
For questions or issues, contact the repository maintainer.
