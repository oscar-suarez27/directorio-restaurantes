// Utilidad para cargar datos iniciales en Firestore
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';
import { restaurants as initialRestaurants } from '../data/restaurants';

// Referencia a la colección de restaurantes
const restaurantsCollection = collection(db, 'restaurants');

// Función para verificar si ya existen restaurantes en Firestore
export const checkRestaurantsExist = async () => {
  try {
    const snapshot = await getDocs(restaurantsCollection);
    return !snapshot.empty;
  } catch (error) {
    console.error("Error verificando restaurantes:", error);
    return false;
  }
};

// Función para cargar restaurantes iniciales en Firestore
export const loadInitialRestaurants = async () => {
  try {
    console.log("Verificando si existen restaurantes en Firestore...");
    const exist = await checkRestaurantsExist();
    
    if (exist) {
      console.log("Ya existen restaurantes en Firestore. No se cargarán datos iniciales.");
      return;
    }
    
    console.log("Cargando restaurantes iniciales en Firestore...");
    
    // Cargar cada restaurante inicial
    for (const restaurant of initialRestaurants) {
      // Omitir el ID ya que Firestore generará uno automáticamente
      const { id, ...restaurantData } = restaurant;
      
      // Añadir campos adicionales si no existen
      const completeData = {
        ...restaurantData,
        category: restaurantData.category || 'Otros',
        rating: restaurantData.rating || 4,
        price: restaurantData.price || '$$',
      };
      
      // Añadir a Firestore
      await addDoc(restaurantsCollection, completeData);
    }
    
    console.log(`Se cargaron ${initialRestaurants.length} restaurantes iniciales en Firestore.`);
  } catch (error) {
    console.error("Error cargando restaurantes iniciales:", error);
  }
};
