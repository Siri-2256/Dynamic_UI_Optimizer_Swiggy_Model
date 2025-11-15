import React from 'react';

interface RestaurantCardProps {
  section: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ section }) => {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-lg">
      <h3 className="text-lg font-bold mb-2">{section}</h3>
      <p className="text-gray-600">
        Explore top-rated restaurants in this section.
      </p>
      <div className="mt-4">
        <img
          src={`https://source.unsplash.com/1600x900/?restaurant,${section}`}
          alt={`Restaurants in ${section}`}
          className="w-full rounded"
        />
      </div>
    </div>
  );
};

export default RestaurantCard;