import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById } from '../firebase/restaurantService';

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const data = await getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        console.error("Error al obtener restaurante:", err);
        setError("No se pudo cargar el restaurante. " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [id]);
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando información del restaurante...</p>
      </div>
    );
  }
  
  if (error || !restaurant) {
    return (
      <div className="alert alert-danger mt-4">
        {error || "No se encontró el restaurante."} 
        <button className="btn btn-link" onClick={() => navigate('/')}>Volver al directorio</button>
      </div>
    );
  }

  return (
    <div className="card mb-4 shadow-sm">
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
            <div className="mb-3">
              <span className="badge bg-primary me-2">{restaurant.category}</span>
              <span className="badge bg-secondary me-2">{restaurant.price}</span>
              <span className="badge bg-success">
                {Array(Math.round(restaurant.rating || 0)).fill().map((_, i) => '★').join('')}
              </span>
            </div>
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