import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RestaurantProvider } from './context/RestaurantContext';
import './custom.css';
import { loadInitialRestaurants } from './firebase/initFirestore';
import './index.css';
import reportWebVitals from './reportWebVitals';


// Intentar cargar datos iniciales en Firestore
loadInitialRestaurants()
  .then(() => console.log("Inicialización de Firestore completada"))
  .catch(error => console.error("Error en inicialización de Firestore:", error));

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
