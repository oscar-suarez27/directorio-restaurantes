import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  // Renderizar estrellas basadas en la calificación
  const renderStars = (rating) => {
    rating = rating || 0;
    return Array(5).fill().map((_, i) => (
      <span key={i} className={`text-${i < rating ? 'warning' : 'secondary'}`}>★</span>
    ));
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img 
          src={process.env.PUBLIC_URL + restaurant.image} 
          className="card-img-top" 
          alt={restaurant.name} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {restaurant.category && (
          <span className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 rounded-start mt-2">
            {restaurant.category}
          </span>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{restaurant.name}</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="small">{renderStars(restaurant.rating)}</div>
          <span className="badge bg-secondary">{restaurant.price || '$$'}</span>
        </div>
        <p className="card-text small text-muted">{restaurant.address}</p>
        <p className="card-text" style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.5em',
          maxHeight: '3em'
        }}>
          {restaurant.description}
        </p>
      </div>
      <div className="card-footer bg-white border-top-0">
        <Link to={`/restaurant/${restaurant.id}`} className="btn btn-sm btn-primary w-100">
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;