import React, { createContext, useState, useEffect } from 'react';
import { restaurants as initialRestaurants } from '../data/restaurants';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  // Intentar cargar restaurantes del localStorage, si no existen usar los iniciales
  const [restaurants, setRestaurants] = useState(() => {
    const savedRestaurants = localStorage.getItem('restaurants');
    return savedRestaurants ? JSON.parse(savedRestaurants) : initialRestaurants;
  });

  // Guardar restaurantes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  // Función para añadir un nuevo restaurante
  const addRestaurant = (newRestaurant) => {
    // Generar un nuevo ID basado en el último ID existente + 1
    const newId = restaurants.length > 0 
      ? Math.max(...restaurants.map(r => r.id)) + 1 
      : 1;
    
    // Crear el nuevo restaurante con ID
    const restaurantToAdd = {
      ...newRestaurant,
      id: newId
    };
    
    // Actualizar el estado
    setRestaurants([...restaurants, restaurantToAdd]);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};