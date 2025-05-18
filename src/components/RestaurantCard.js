import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100">
        <img 
          src={process.env.PUBLIC_URL + restaurant.image} 
          className="card-img-top" 
          alt={restaurant.name} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="card-text">{restaurant.address}</p>
          <p className="card-text">{restaurant.description}</p>
          <Link to={`/restaurant/${restaurant.id}`} className="btn btn-sm btn-outline-primary">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;