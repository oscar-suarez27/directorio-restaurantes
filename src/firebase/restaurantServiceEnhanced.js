// Servicio mejorado para operaciones de restaurantes en Firestore
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Referencia a la colección de restaurantes
const restaurantsCollection = collection(db, 'restaurants');

// Obtener todos los restaurantes con mejor manejo de errores
export const getRestaurants = async () => {
  try {
    const snapshot = await getDocs(restaurantsCollection);
    const restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Obtenidos ${restaurants.length} restaurantes de Firestore`);
    return restaurants;
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    console.log("Retornando lista vacía de restaurantes como fallback");
    // Retornar array vacío en lugar de lanzar error para mejor experiencia de usuario
    return [];
  }
};

// Obtener un restaurante por ID con mejor manejo de errores
export const getRestaurantById = async (id) => {
  try {
    console.log(`Buscando restaurante con ID: ${id}`);
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const restaurant = {
        id: docSnap.id,
        ...docSnap.data()
      };
      console.log(`Restaurante encontrado: ${restaurant.name}`);
      return restaurant;
    } else {
      console.warn(`No se encontró restaurante con ID: ${id}`);
      throw new Error("No se encontró el restaurante");
    }
  } catch (error) {
    console.error("Error al obtener el restaurante:", error);
    throw error;
  }
};

// Añadir un nuevo restaurante con mejor manejo de errores
export const addRestaurant = async (restaurantData) => {
  try {
    console.log(`Añadiendo nuevo restaurante: ${restaurantData.name}`);
    // Añadir timestamp
    const dataWithTimestamp = {
      ...restaurantData,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(restaurantsCollection, dataWithTimestamp);
    console.log(`Restaurante añadido con ID: ${docRef.id}`);
    
    return {
      id: docRef.id,
      ...dataWithTimestamp
    };
  } catch (error) {
    console.error("Error al añadir restaurante:", error);
    throw error;
  }
};

// Buscar restaurantes por nombre o categoría con mejor manejo de errores
export const searchRestaurants = async (searchTerm) => {
  try {
    console.log(`Buscando restaurantes con término: "${searchTerm}"`);
    if (!searchTerm || searchTerm.trim() === '') {
      console.log("Término de búsqueda vacío, retornando lista vacía");
      return [];
    }
    
    // Convertir a minúsculas para hacer la búsqueda insensible a mayúsculas
    const termLower = searchTerm.toLowerCase();
    
    // Obtener todos los restaurantes
    const snapshot = await getDocs(restaurantsCollection);
    
    // Filtrar los resultados manualmente
    const results = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(restaurant => 
        (restaurant.name && restaurant.name.toLowerCase().includes(termLower)) || 
        (restaurant.category && restaurant.category.toLowerCase().includes(termLower)) ||
        (restaurant.description && restaurant.description.toLowerCase().includes(termLower))
      );
    
    console.log(`Se encontraron ${results.length} restaurantes que coinciden con "${searchTerm}"`);
    return results;
  } catch (error) {
    console.error("Error al buscar restaurantes:", error);
    console.log("Retornando lista vacía como fallback");
    return [];
  }
};

// Actualizar un restaurante con mejor manejo de errores
export const updateRestaurant = async (id, restaurantData) => {
  try {
    console.log(`Actualizando restaurante con ID: ${id}`);
    const docRef = doc(db, 'restaurants', id);
    
    // Añadir timestamp de actualización
    const dataWithTimestamp = {
      ...restaurantData,
      updatedAt: new Date()
    };
    
    await updateDoc(docRef, dataWithTimestamp);
    console.log(`Restaurante actualizado correctamente`);
    
    return {
      id,
      ...dataWithTimestamp
    };
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    throw error;
  }
};

// Eliminar un restaurante con mejor manejo de errores
export const deleteRestaurant = async (id) => {
  try {
    console.log(`Eliminando restaurante con ID: ${id}`);
    const docRef = doc(db, 'restaurants', id);
    await deleteDoc(docRef);
    console.log(`Restaurante eliminado correctamente`);
    return id;
  } catch (error) {
    console.error("Error al eliminar restaurante:", error);
    throw error;
  }
};
