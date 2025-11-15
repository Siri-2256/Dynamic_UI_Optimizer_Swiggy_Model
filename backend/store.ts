import { RedisClientType, createClient } from 'redis';

// State interface for in-memory store
interface VariantStats {
  trials: number;
  rewards: number;
}

interface State {
  cardVariants: Record<string, VariantStats>;
  categoryCounts: Record<string, number>;
}

// Default state template
const defaultState: State = {
  cardVariants: {
    A: { trials: 0, rewards: 0 },
    B: { trials: 0, rewards: 0 },
    C: { trials: 0, rewards: 0 },
  },
  categoryCounts: {},
};

// In-memory store wrapper
function createInMemoryStore() {
  let state: State = JSON.parse(JSON.stringify(defaultState));

  return {
    getState: (): State => state,
    setState: (newState: State) => {
      state = newState;
    },
    resetState: () => {
      state = JSON.parse(JSON.stringify(defaultState));
    },
  };
}

// Redis store wrapper
function createRedisStore(redisUrl: string) {
  const client: RedisClientType = createClient({ url: redisUrl });
  const stateKey = 'dynamic_ui_optimizer_state';

  client.connect();

  return {
    getState: async (): Promise<State> => {
      const data = await client.get(stateKey);
      return data ? JSON.parse(data) : JSON.parse(JSON.stringify(defaultState));
    },
    setState: async (newState: State) => {
      await client.set(stateKey, JSON.stringify(newState));
    },
    resetState: async () => {
      await client.set(stateKey, JSON.stringify(defaultState));
    },
  };
}

// Factory function to toggle between in-memory and Redis
export function createStore() {
  if (process.env.REDIS_URL) {
    console.log('Using Redis store');
    return createRedisStore(process.env.REDIS_URL);
  }
  console.log('Using in-memory store');
  return createInMemoryStore();
}

export type Store = ReturnType<typeof createStore>;
export type { State, VariantStats };