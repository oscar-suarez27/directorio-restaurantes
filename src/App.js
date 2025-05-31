import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './animations.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NewRestaurant from './components/NewRestaurant';
import RestaurantDetail from './components/RestaurantDetail';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/new" element={<NewRestaurant />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
