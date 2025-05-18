import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';

function Home() {
  const { restaurants } = useContext(RestaurantContext);

  return (
    <div className="main-content">
      <h2 className="mb-4">Directorio de Restaurantes</h2>
      <div className="row">
        {restaurants.map((restaurant, index) => (
          <div 
            key={restaurant.id} 
            style={{
              animation: `slideIn 0.3s ease forwards ${index * 0.1}s`,
              opacity: 0
            }}
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

