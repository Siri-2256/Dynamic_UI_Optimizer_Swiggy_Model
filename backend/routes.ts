import { Request, Response } from 'express';
import { Store, State } from './store';

// Handler for the /api/decide route
export const decideHandler = async (req: Request, res: Response, store: Store) => {
  const { timeSlot, sessionId = null, recentCategory = null } = req.body;

  if (!timeSlot) {
    return res.status(400).json({ ok: false, error: 'Missing required timeSlot in request body' });
  }

  const epsilon = parseFloat(process.env.EPSILON || '0.2'); // Default epsilon is 0.2
  const state: State = await store.getState();
  const cardVariants = state.cardVariants;

  // Epsilon-greedy decision-making
  const shouldExplore = Math.random() < epsilon;
  const variantKeys = Object.keys(cardVariants);
  const chosenCardVariant = shouldExplore
    ? variantKeys[Math.floor(Math.random() * variantKeys.length)] // Explore: Random variant
    : variantKeys.reduce((best, key) =>
        cardVariants[key].trials === 0
          ? key
          : cardVariants[best].rewards / Math.max(cardVariants[best].trials, 1) >
            cardVariants[key].rewards / Math.max(cardVariants[key].trials, 1)
          ? best
          : key
      ); // Exploit: Best-performing variant

  // Update state with the recent category count
  if (recentCategory) {
    state.categoryCounts[recentCategory] = (state.categoryCounts[recentCategory] || 0) + 1;
  }

  await store.setState(state);

  return res.json({
    ok: true,
    decision: {
      sections: ['Top Picks', 'Recommended', 'Nearby'], // Hardcoded for demo purposes
      chosenCardVariant,
    },
    stateSnapshot: state,
  });
};

// Handler for the /api/reward route
export const rewardHandler = async (req: Request, res: Response, store: Store) => {
  const { variantId, reward } = req.body;

  if (!variantId || reward === undefined) {
    return res.status(400).json({ ok: false, error: 'Missing required variantId or reward in request body' });
  }

  const state: State = await store.getState();
  const variant = state.cardVariants[variantId];

  if (!variant) {
    return res.status(404).json({ ok: false, error: 'Invalid variantId' });
  }

  // Update the variant stats
  variant.trials += 1;
  variant.rewards += reward;
  await store.setState(state);

  return res.json({ ok: true, cardVariants: state.cardVariants });
};

// Handler for the /api/state route
export const stateHandler = async (_req: Request, res: Response, store: Store) => {
  const state: State = await store.getState();
  res.json({ ok: true, state });
};

// Handler for the /health route
export const healthHandler = async (_req: Request, res: Response, store: Store) => {
  const uptimeSeconds = process.uptime();
  res.json({ ok: true, uptime: Math.floor(uptimeSeconds) });
};

// Handler for the /reset route
export const resetHandler = async (_req: Request, res: Response, store: Store) => {
  await store.resetState();
  res.json({ ok: true, message: 'Store has been reset.' });
};