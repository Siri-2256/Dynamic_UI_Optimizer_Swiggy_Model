import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import RestaurantCard from './components/RestaurantCard';
import OptimizerPanel from './components/OptimizerPanel';
import Telemetry from './components/Telemetry';
import { decide, reward, fetchState } from './api';

interface Decision {
  sections: string[];
  chosenCardVariant: string;
}

interface StateSnapshot {
  cardVariants: {
    [key: string]: {
      trials: number;
      rewards: number;
    };
  };
  categoryCounts: {
    [key: string]: number;
  };
}

const App: React.FC = () => {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [stateSnapshot, setStateSnapshot] = useState<StateSnapshot | null>(null);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);

  const makeDecision = async (timeSlot: string, recentCategory?: string) => {
    try {
      const response = await decide({ timeSlot, recentCategory });
      const { decision, stateSnapshot } = response;
      setDecision(decision);
      setStateSnapshot(stateSnapshot);

      // Log the decision
      setTelemetryLog((prevLog) => [
        `Made decision: Variant: ${decision.chosenCardVariant}, Sections: ${decision.sections.join(', ')}`,
        ...prevLog,
      ]);
    } catch (error) {
      console.error('Error making decision:', error);
    }
  };

  const submitReward = async (variantId: string, rewardValue: number) => {
    try {
      const response = await reward({ variantId, reward: rewardValue });
      setStateSnapshot((prevState) => ({
        ...prevState!,
        cardVariants: response.cardVariants,
      }));

      // Log the reward
      setTelemetryLog((prevLog) => [
        `Submitted reward: Variant: ${variantId}, Reward: ${rewardValue}`,
        ...prevLog,
      ]);
    } catch (error) {
      console.error('Error submitting reward:', error);
    }
  };

  useEffect(() => {
    const initializeState = async () => {
      try {
        const response = await fetchState();
        setStateSnapshot(response.state);
      } catch (error) {
        console.error('Error fetching state:', error);
      }
    };

    initializeState();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Controls onMakeDecision={makeDecision} />
        {decision && (
          <OptimizerPanel decision={decision} onSubmitReward={submitReward} />
        )}
        {decision &&
          decision.sections.map((section, index) => (
            <RestaurantCard key={index} section={section} />
          ))}
        {stateSnapshot && <Telemetry log={telemetryLog} />}
      </main>
    </div>
  );
};

export default App;