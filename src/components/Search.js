import React, { useState, useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';

function Search() {
  const { restaurants } = useContext(RestaurantContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredResults;
    
    if (searchType === 'name') {
      filteredResults = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === 'address') {
      filteredResults = restaurants.filter(restaurant =>
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === 'description') {
      filteredResults = restaurants.filter(restaurant =>
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setResults(filteredResults);
    setSearched(true);
  };

  return (
    <div>
      <h2 className="mb-4">Buscar Restaurantes</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu búsqueda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="form-select" 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Nombre</option>
            <option value="address">Dirección</option>
            <option value="description">Tipo de Comida</option>
          </select>
          <button className="btn btn-primary" type="submit">Buscar</button>
        </div>
      </form>

      {searched && (
        <div>
          <h3>Resultados de búsqueda ({results.length})</h3>
          {results.length > 0 ? (
            <div className="row">
              {results.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <p>No se encontraron restaurantes con ese criterio.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;