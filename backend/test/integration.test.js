const axios = require('axios');
const assert = require('assert');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const testDecide = async () => {
  console.log('Testing /api/decide...');
  const response = await axios.post(`${BASE_URL}/api/decide`, {
    timeSlot: 'morning',
    recentCategory: 'breakfast',
  });

  const { data } = response;
  assert(data.ok, '/api/decide response should have ok: true');
  assert(data.decision, '/api/decide response should have a decision');
  assert(data.decision.chosenCardVariant, '/api/decide should return a chosenCardVariant');
  assert(data.stateSnapshot, '/api/decide should return a stateSnapshot');
  console.log('✓ /api/decide test passed');
};

const testReward = async () => {
  console.log('Testing /api/reward...');
  const response = await axios.post(`${BASE_URL}/api/reward`, {
    variantId: 'A',
    reward: 1,
  });

  const { data } = response;
  assert(data.ok, '/api/reward response should have ok: true');
  assert(data.cardVariants, '/api/reward should return updated cardVariants');
  console.log('✓ /api/reward test passed');
};

const runTests = async () => {
  try {
    await testDecide();
    await testReward();
    console.log('All tests passed!');
  } catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
  }
};

runTests();