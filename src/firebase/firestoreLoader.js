// Utilidad mejorada para cargar datos iniciales en Firestore
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { db } from './config';

// Referencia a la colección de restaurantes
const restaurantsCollection = collection(db, 'restaurants');

// Función para verificar si ya existen restaurantes en Firestore con mejor manejo de errores
export const checkRestaurantsExist = async () => {
  try {
    const snapshot = await getDocs(restaurantsCollection);
    return !snapshot.empty;
  } catch (error) {
    console.error("Error verificando restaurantes:", error);
    console.log("Intentando continuar con la carga de datos iniciales...");
    // En caso de error, asumimos que no existen para intentar cargarlos de todos modos
    return false;
  }
};

// Función para cargar restaurantes iniciales en Firestore con manejo de errores mejorado
export const loadInitialRestaurants = async () => {
  try {
    console.log("Verificando si existen restaurantes en Firestore...");
    let exist = false;
    
    try {
      exist = await checkRestaurantsExist();
    } catch (checkError) {
      console.warn("No se pudo verificar la existencia de restaurantes:", checkError);
      // Continuamos de todos modos
    }
    
    if (exist) {
      console.log("Ya existen restaurantes en Firestore. No se cargarán datos iniciales.");
      return;
    }
    
    console.log("Cargando restaurantes iniciales en Firestore...");
    let loadedCount = 0;
    
    // Cargar cada restaurante inicial con manejo de errores individual
    for (const restaurant of initialRestaurants) {
      try {
        // Omitir el ID ya que Firestore generará uno automáticamente
        const { id, ...restaurantData } = restaurant;
        
        // Añadir campos adicionales si no existen
        const completeData = {
          ...restaurantData,
          category: restaurantData.category || 'Otros',
          rating: restaurantData.rating || 4,
          price: restaurantData.price || '$$',
          createdAt: new Date()
        };
        
        // Añadir a Firestore
        await addDoc(restaurantsCollection, completeData);
        console.log(`Restaurante "${completeData.name}" añadido correctamente.`);
        loadedCount++;
      } catch (restaurantError) {
        console.error(`Error al añadir restaurante "${restaurant.name}":`, restaurantError);
        // Continuamos con el siguiente restaurante en caso de error
      }
    }
    
    if (loadedCount > 0) {
      console.log(`Se cargaron ${loadedCount} de ${initialRestaurants.length} restaurantes iniciales en Firestore.`);
    } else {
      console.warn("No se pudo cargar ningún restaurante en Firestore. Verifica la configuración y los permisos.");
    }
  } catch (error) {
    console.error("Error cargando restaurantes iniciales:", error);
  }
};

// Exportar función para uso directo
export const initializeFirestore = async () => {
  console.log("Iniciando carga de datos en Firestore...");
  await loadInitialRestaurants();
  console.log("Proceso de inicialización de Firestore completado.");
};
