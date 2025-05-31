import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Referencia a la colección de restaurantes
const restaurantsCollection = collection(db, 'restaurants');

// Obtener todos los restaurantes
export const getRestaurants = async () => {
  try {
    const snapshot = await getDocs(restaurantsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    throw error;
  }
};

// Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("No se encontró el restaurante");
    }
  } catch (error) {
    console.error("Error al obtener el restaurante:", error);
    throw error;
  }
};

// Añadir un nuevo restaurante
export const addRestaurant = async (restaurantData) => {
  try {
    const docRef = await addDoc(restaurantsCollection, restaurantData);
    return {
      id: docRef.id,
      ...restaurantData
    };
  } catch (error) {
    console.error("Error al añadir restaurante:", error);
    throw error;
  }
};

// Buscar restaurantes por nombre o categoría
export const searchRestaurants = async (searchTerm) => {
  try {
    // Convertir a minúsculas para hacer la búsqueda insensible a mayúsculas
    const termLower = searchTerm.toLowerCase();
    
    // Obtener todos los restaurantes (en una app real podrías usar índices o funciones de Firebase más avanzadas)
    const snapshot = await getDocs(restaurantsCollection);
    
    // Filtrar los resultados manualmente
    // Nota: En una aplicación de producción, deberías considerar usar consultas de Firestore más específicas
    return snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(restaurant => 
        restaurant.name.toLowerCase().includes(termLower) || 
        restaurant.category.toLowerCase().includes(termLower) ||
        restaurant.description.toLowerCase().includes(termLower)
      );
  } catch (error) {
    console.error("Error al buscar restaurantes:", error);
    throw error;
  }
};

// Actualizar un restaurante
export const updateRestaurant = async (id, restaurantData) => {
  try {
    const docRef = doc(db, 'restaurants', id);
    await updateDoc(docRef, restaurantData);
    return {
      id,
      ...restaurantData
    };
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    throw error;
  }
};

// Eliminar un restaurante
export const deleteRestaurant = async (id) => {
  try {
    const docRef = doc(db, 'restaurants', id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error al eliminar restaurante:", error);
    throw error;
  }
};
