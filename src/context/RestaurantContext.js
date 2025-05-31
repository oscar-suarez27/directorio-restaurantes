import React, { createContext, useState, useEffect } from 'react';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { getRestaurants, addRestaurant as firebaseAddRestaurant, searchRestaurants as firebaseSearchRestaurants } from '../firebase/restaurantService';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Cargar restaurantes desde Firebase al iniciar
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        // Intentar cargar desde Firebase
        const firebaseRestaurants = await getRestaurants();
        
        if (firebaseRestaurants.length === 0) {
          // Si no hay datos en Firebase, usar los datos iniciales
          // En un entorno real, podrías subirlos a Firebase
          setRestaurants(initialRestaurants);
        } else {
          setRestaurants(firebaseRestaurants);
        }
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
        setError("Error al cargar los restaurantes. Por favor, intenta de nuevo más tarde.");
        // Cargar datos locales como fallback
        setRestaurants(initialRestaurants);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Función para añadir un nuevo restaurante usando Firebase
  const addRestaurant = async (newRestaurant) => {
    try {
      setLoading(true);
      // Añadir a Firebase
      const addedRestaurant = await firebaseAddRestaurant(newRestaurant);
      // Actualizar el estado local
      setRestaurants(prevRestaurants => [...prevRestaurants, addedRestaurant]);
      return addedRestaurant;
    } catch (error) {
      console.error("Error al añadir restaurante:", error);
      setError("Error al añadir el restaurante. Por favor, intenta de nuevo.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar restaurantes
  const searchRestaurants = async (searchTerm) => {
    try {
      setLoading(true);
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return [];
      }
      
      const results = await firebaseSearchRestaurants(searchTerm);
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error("Error al buscar restaurantes:", error);
      setError("Error al buscar restaurantes. Por favor, intenta de nuevo.");
      setSearchResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantContext.Provider value={{ 
      restaurants, 
      addRestaurant, 
      searchRestaurants,
      searchResults,
      loading,
      error
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};