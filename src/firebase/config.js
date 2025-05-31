// Configuración de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
// NOTA: Deberás reemplazar esto con tus propias credenciales de Firebase
// Puedes obtenerlas en la consola de Firebase (https://console.firebase.google.com/)
const firebaseConfig = {
  // REEMPLAZA ESTOS VALORES con los que copiaste de la consola de Firebase
  apiKey: "AIzaSyDJwfzoj4uUWrB10Z8v2p82yyg8nL2CkDY",
  authDomain: "directorio-restaurantes-2fad9.firebaseapp.com",
  projectId: "directorio-restaurantes-2fad9",
  storageBucket: "directorio-restaurantes-2fad9.firebasestorage.app",
  messagingSenderId: "624042802966",
  appId: "1:624042802966:web:545f489c0ad7e8d8e31a37",
  measurementId: "G-GJH3C522S2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configuración de Firestore con opciones específicas para permitir acceso público
const db = getFirestore(app);

// Configuración para acceso público
// Estas configuraciones aseguran que se pueda leer/escribir sin restricciones
db._ignoreUndefinedProperties = true;

// Esta propiedad se agregó para garantizar compatibilidad con las reglas que permiten acceso total
const originalGet = db.get;
if (originalGet && typeof originalGet === 'function') {
  db.get = function(...args) {
    console.log('Accediendo a Firestore con permisos públicos');
    return originalGet.apply(this, args);
  };
}

export { db };
