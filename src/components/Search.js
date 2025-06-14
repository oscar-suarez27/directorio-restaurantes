import { useContext, useEffect, useState } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';

function Search() {
  const { searchRestaurants, searchResults, loading, error } = useContext(RestaurantContext);
  const [searchTerm, setSearchTerm] = useState('');
  // Eliminamos las variables no utilizadas
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Actualizar resultados cuando cambien los resultados del contexto
  useEffect(() => {
    if (searchResults.length > 0 || searched) {
      setResults(searchResults);
    }
  }, [searchResults, searched]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setLocalError(null);
    
    try {
      if (!searchTerm.trim()) {
        setResults([]);
        setSearched(true);
        return;
      }
      
      // Usar la función de búsqueda de Firebase del contexto
      await searchRestaurants(searchTerm);
      setSearched(true);
    } catch (err) {
      setLocalError('Error al realizar la búsqueda: ' + err.message);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
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
            disabled={isSearching}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {(error || localError) && (
        <div className="alert alert-danger" role="alert">
          {error || localError}
        </div>
      )}

      {loading && <p>Cargando resultados...</p>}

      {searched && !loading && (
        <div>
          <h3>Resultados de búsqueda ({results.length})</h3>
          {results.length > 0 ? (
            <div className="row">
              {results.map(restaurant => (
                <div 
                  key={restaurant.id} 
                  className="col-md-4 mb-4"
                  style={{
                    animation: `fadeIn 0.5s ease forwards`
                  }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
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