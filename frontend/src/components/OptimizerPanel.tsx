import React from 'react';

interface OptimizerPanelProps {
  decision: {
    sections: string[];
    chosenCardVariant: string;
  };
  onSubmitReward: (variantId: string, rewardValue: number) => void;
}

const OptimizerPanel: React.FC<OptimizerPanelProps> = ({ decision, onSubmitReward }) => {
  const handleReward = (rewardValue: number) => {
    onSubmitReward(decision.chosenCardVariant, rewardValue);
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Optimizer Panel</h2>
      <p>
        <strong>Chosen Card Variant:</strong> {decision.chosenCardVariant}
      </p>
      <p>
        <strong>Sections:</strong> {decision.sections.join(', ')}
      </p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => handleReward(1)}
          className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        >
          Reward (+)
        </button>
        <button
          onClick={() => handleReward(0)}
          className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700"
        >
          No Reward (0)
        </button>
      </div>
    </div>
  );
};

export default OptimizerPanel;