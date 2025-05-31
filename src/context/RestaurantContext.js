import { createContext, useEffect, useState } from 'react';
import { restaurants as initialRestaurants } from '../data/restaurants';
import {
  addRestaurant as firebaseAddRestaurant,
  searchRestaurants as firebaseSearchRestaurants,
  getRestaurants
} from '../firebase/restaurantService';

// Importar también el servicio mejorado como respaldo
import {
  addRestaurant as enhancedAddRestaurant,
  getRestaurants as enhancedGetRestaurants,
  searchRestaurants as enhancedSearchRestaurants
} from '../firebase/restaurantServiceEnhanced';

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
        setError(null);
        
        // Intentar cargar usando el servicio mejorado primero
        try {
          console.log("Intentando cargar restaurantes con el servicio mejorado...");
          const firebaseRestaurants = await enhancedGetRestaurants();
          
          if (firebaseRestaurants && firebaseRestaurants.length > 0) {
            console.log(`Cargados ${firebaseRestaurants.length} restaurantes con el servicio mejorado`);
            setRestaurants(firebaseRestaurants);
            setLoading(false);
            return;
          }
        } catch (enhancedError) {
          console.warn("Error al cargar con servicio mejorado:", enhancedError);
        }
        
        // Si falla, intentar con el servicio original
        try {
          console.log("Intentando cargar restaurantes con el servicio original...");
          const firebaseRestaurants = await getRestaurants();
          
          if (firebaseRestaurants.length === 0) {
            // Si no hay datos en Firebase, usar los datos iniciales
            console.log("No hay datos en Firebase, usando datos iniciales");
            setRestaurants(initialRestaurants);
          } else {
            console.log(`Cargados ${firebaseRestaurants.length} restaurantes con el servicio original`);
            setRestaurants(firebaseRestaurants);
          }
        } catch (originalError) {
          console.warn("Error al cargar con servicio original:", originalError);
          // Cargar datos locales como último recurso
          console.log("Usando datos locales como último recurso");
          setRestaurants(initialRestaurants);
        }
      } catch (error) {
        console.error("Error general al cargar restaurantes:", error);
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
      setError(null);
      
      // Intentar añadir usando el servicio mejorado primero
      try {
        console.log("Intentando añadir restaurante con servicio mejorado...");
        const addedRestaurant = await enhancedAddRestaurant(newRestaurant);
        // Actualizar el estado local
        setRestaurants(prevRestaurants => [...prevRestaurants, addedRestaurant]);
        return addedRestaurant;
      } catch (enhancedError) {
        console.warn("Error al añadir con servicio mejorado:", enhancedError);
        
        // Si falla, intentar con el servicio original
        console.log("Intentando añadir con servicio original...");
        const addedRestaurant = await firebaseAddRestaurant(newRestaurant);
        // Actualizar el estado local
        setRestaurants(prevRestaurants => [...prevRestaurants, addedRestaurant]);
        return addedRestaurant;
      }
    } catch (error) {
      console.error("Error general al añadir restaurante:", error);
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
      setError(null);
      
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return [];
      }
      
      // Intentar buscar usando el servicio mejorado primero
      try {
        console.log("Intentando buscar con servicio mejorado...");
        const results = await enhancedSearchRestaurants(searchTerm);
        setSearchResults(results);
        return results;
      } catch (enhancedError) {
        console.warn("Error al buscar con servicio mejorado:", enhancedError);
        
        // Si falla, intentar con el servicio original
        console.log("Intentando buscar con servicio original...");
        const results = await firebaseSearchRestaurants(searchTerm);
        setSearchResults(results);
        return results;
      }
    } catch (error) {
      console.error("Error general al buscar restaurantes:", error);
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