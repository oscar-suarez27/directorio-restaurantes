# Configuración de Firebase

Este proyecto utiliza Firebase como backend para almacenar y gestionar los datos de los restaurantes. Para configurar Firebase correctamente en tu proyecto, sigue estos pasos:

## 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Sigue las instrucciones para crear un nuevo proyecto
4. Anota el ID del proyecto, lo necesitarás más adelante

## 2. Configurar Firestore Database

1. En el panel de navegación lateral de la consola de Firebase, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige la ubicación más cercana a tu región
5. Haz clic en "Habilitar"

## 3. Obtener las credenciales de Firebase

1. En la consola de Firebase, haz clic en el icono de configuración (engranaje) junto a "Descripción general del proyecto"
2. Selecciona "Configuración del proyecto"
3. En la pestaña "General", desplázate hacia abajo hasta "Tus aplicaciones"
4. Haz clic en el icono de la web (</>) para agregar una aplicación web
5. Registra la aplicación con un nombre (ej. "Directorio de Restaurantes")
6. Copia el objeto `firebaseConfig` que se muestra

## 4. Configurar el proyecto

1. Abre el archivo `src/firebase/config.js` en tu proyecto
2. Reemplaza el objeto `firebaseConfig` con el que copiaste de la consola de Firebase:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messagingSenderId",
  appId: "tu-appId"
};
```

## 5. Iniciar la aplicación

Una vez configurado Firebase, puedes iniciar la aplicación con:

```
npm start
```

## Estructura de datos en Firestore

La aplicación utiliza una colección llamada `restaurants` con la siguiente estructura para cada documento:

```
restaurants/
  - [documentId]/
    - name: string (nombre del restaurante)
    - address: string (dirección)
    - description: string (descripción)
    - category: string (categoría de comida)
    - image: string (ruta a la imagen)
    - rating: number (calificación de 1 a 5)
    - price: string (rango de precio: $, $$, $$$, $$$$)
```

Si deseas cargar datos iniciales, puedes utilizar la función de importación de Firestore o crear documentos manualmente a través de la consola de Firebase.
