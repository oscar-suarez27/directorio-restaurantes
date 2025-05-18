import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';

function RestaurantDetail() {
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();
  
  // Encontrar el restaurante por ID
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  
  // Si no se encuentra el restaurante, mostrar mensaje
  if (!restaurant) {
    return (
      <div className="alert alert-danger mt-4">
        No se encontró el restaurante. <button className="btn btn-link" onClick={() => navigate('/')}>Volver al directorio</button>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="row g-0">
        <div className="col-md-6">
          <img 
            src={process.env.PUBLIC_URL + restaurant.image} 
            className="img-fluid rounded-start" 
            alt={restaurant.name} 
            style={{ height: '400px', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h2 className="card-title">{restaurant.name}</h2>
            <p className="card-text">
              <strong>Dirección:</strong> {restaurant.address}
            </p>
            <p className="card-text">
              <strong>Descripción:</strong> {restaurant.description}
            </p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Volver al Directorio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;