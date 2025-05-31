import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';

function NewRestaurant() {
  const { addRestaurant, loading, error } = useContext(RestaurantContext);
  const navigate = useNavigate();
  
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    category: '',
    description: '',
    rating: 5,
    price: '$$',
    image: '/static/pacifico.jpg' // valor por defecto
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLocalError('');
    
    try {
      // Añadir el restaurante usando Firebase
      await addRestaurant(restaurant);
      
      // Mostrar mensaje de éxito
      setSuccessMessage(`¡Restaurante "${restaurant.name}" añadido con éxito!`);
      
      // Limpiar el formulario
      setRestaurant({
        name: '',
        address: '',
        category: '',
        description: '',
        rating: 5,
        price: '$$',
        image: '/static/pacifico.jpg'
      });
      
      // Redirigir a la página principal después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setLocalError('Error al añadir el restaurante: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Añadir Nuevo Restaurante</h2>
        
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        
        {(error || localError) && (
          <div className="alert alert-danger" role="alert">
            {error || localError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre del Restaurante</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={restaurant.name}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Categoría</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={restaurant.category}
              onChange={handleChange}
              required
              disabled={submitting}
            >
              <option value="" disabled>Selecciona una categoría</option>
              <option value="Italiano">Italiano</option>
              <option value="Mexicano">Mexicano</option>
              <option value="Parrilla">Parrilla</option>
              <option value="Mariscos">Mariscos</option>
              <option value="Vegetariano">Vegetariano</option>
              <option value="Asiático">Asiático</option>
              <option value="Postres">Postres</option>
              <option value="Cafetería">Cafetería</option>
              <option value="Comida Rápida">Comida Rápida</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={restaurant.address}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={restaurant.description}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="rating" className="form-label">Calificación</label>
              <select
                className="form-select"
                id="rating"
                name="rating"
                value={restaurant.rating}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="1">1 - Malo</option>
                <option value="2">2 - Regular</option>
                <option value="3">3 - Bueno</option>
                <option value="4">4 - Muy Bueno</option>
                <option value="5">5 - Excelente</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">Precio</label>
              <select
                className="form-select"
                id="price"
                name="price"
                value={restaurant.price}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="$">$ - Económico</option>
                <option value="$$">$$ - Moderado</option>
                <option value="$$$">$$$ - Costoso</option>
                <option value="$$$$">$$$$ - Muy Costoso</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Imagen</label>
            <select
              className="form-select"
              id="image"
              name="image"
              value={restaurant.image}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="/static/pacifico.jpg">Pacífico</option>
              <option value="/static/italiano.jpg">Italiano</option>
              <option value="/static/fritos.jpg">Fritos</option>
              <option value="/static/pollo.jpg">Pollo</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Añadiendo...' : 'Añadir Restaurante'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRestaurant;