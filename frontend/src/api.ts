import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Make a decision using the backend API
 * @param payload - Request payload for decision-making
 */
export const decide = async (payload: {
  timeSlot: string;
  recentCategory?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/decide`, payload);
  return response.data;
};

/**
 * Submit a reward using the backend API
 * @param payload - Request payload for submitting reward
 */
export const reward = async (payload: {
  variantId: string;
  reward: number;
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/reward`, payload);
  return response.data;
};

/**
 * Fetch the current state snapshot from the backend API
 */
export const fetchState = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/state`);
  return response.data;
};