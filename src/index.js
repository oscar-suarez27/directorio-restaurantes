import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RestaurantProvider } from './context/RestaurantContext';
import './custom.css';
import { initializeFirestore } from './firebase/firestoreLoader';
import { loadInitialRestaurants } from './firebase/initFirestore';
import './index.css';
import reportWebVitals from './reportWebVitals';


// Intentar cargar datos iniciales en Firestore usando ambos métodos para mayor compatibilidad
Promise.all([
  loadInitialRestaurants().catch(err => console.warn("Método original de carga falló:", err)),
  initializeFirestore().catch(err => console.warn("Método alternativo de carga falló:", err))
])
  .then(() => console.log("Proceso de inicialización de datos completado"))
  .catch(error => console.error("Error en la inicialización:", error));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RestaurantProvider>
      <App />
    </RestaurantProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
