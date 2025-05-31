import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';

function Home() {
  const { restaurants, loading, error } = useContext(RestaurantContext);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando restaurantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2 className="mb-4">Directorio de Restaurantes</h2>
      
      {restaurants.length === 0 ? (
        <div className="alert alert-info">
          No hay restaurantes disponibles. ¡Añade el primero!
        </div>
      ) : (
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id} 
              className="col-md-4 mb-4"
              style={{
                animation: `slideIn 0.3s ease forwards ${index * 0.1}s`,
                opacity: 0
              }}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

