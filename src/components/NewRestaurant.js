import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';

function NewRestaurant() {
  const { addRestaurant } = useContext(RestaurantContext);
  const navigate = useNavigate();
  
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    image: '/static/pacifico.jpg' // valor por defecto
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Añadir el restaurante al contexto
    addRestaurant(restaurant);
    
    // Mostrar mensaje de éxito
    setSuccessMessage(`¡Restaurante "${restaurant.name}" añadido con éxito!`);
    
    // Limpiar el formulario
    setRestaurant({
      name: '',
      address: '',
      description: '',
      image: '/static/pacifico.jpg'
    });
    
    // Redirigir a la página principal después de 2 segundos
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
            />
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Imagen</label>
            <select
              className="form-select"
              id="image"
              name="image"
              value={restaurant.image}
              onChange={handleChange}
            >
              <option value="/static/pacifico.jpg">Pacífico</option>
              <option value="/static/italiano.jpg">Italiano</option>
              <option value="/static/fritos.jpg">Fritos</option>
              <option value="/static/pollo.jpg">Pollo</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Añadir Restaurante</button>
        </form>
      </div>
    </div>
  );
}

export default NewRestaurant;