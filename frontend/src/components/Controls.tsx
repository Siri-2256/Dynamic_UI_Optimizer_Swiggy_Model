import React, { useState } from 'react';

interface ControlsProps {
  onMakeDecision: (timeSlot: string, recentCategory?: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ onMakeDecision }) => {
  const [timeSlot, setTimeSlot] = useState<string>('morning');
  const [recentCategory, setRecentCategory] = useState<string>('');

  const handleDecision = () => {
    onMakeDecision(timeSlot, recentCategory || undefined);
  };

  return (
    <div className="mb-4 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Controls</h2>
      <div className="mb-2">
        <label htmlFor="timeSlot" className="block font-medium">
          Time Slot:
        </label>
        <select
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="morning">Morning</option>
          <option value="lunch">Lunch</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="category" className="block font-medium">
          Recent Category (optional):
        </label>
        <input
          id="category"
          type="text"
          value={recentCategory}
          onChange={(e) => setRecentCategory(e.target.value)}
          placeholder="E.g., Fast Food, Indian Cuisine"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleDecision}
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
      >
        Make Decision
      </button>
    </div>
  );
};

export default Controls;