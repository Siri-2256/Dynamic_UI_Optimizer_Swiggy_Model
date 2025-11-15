import React from 'react';

interface TelemetryProps {
  log: string[];
}

const Telemetry: React.FC<TelemetryProps> = ({ log }) => {
  return (
    <div className="border rounded p-4 mt-4 bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Telemetry Log</h2>
      <ul className="list-disc pl-6">
        {log.length === 0 && <p className="text-gray-600">No telemetry data available.</p>}
        {log.map((entry, index) => (
          <li key={index} className="text-sm text-gray-800">{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default Telemetry;