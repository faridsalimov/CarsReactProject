import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { cars } from './data';
import Header from './Header';
import CarList from './CarList';
import Favorites from './Favorites';
import CarDetails from './CarDetails';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const favoritesFromCookie = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favoritesFromCookie);

    const commentsFromCookie = JSON.parse(localStorage.getItem('comments')) || {};
    setComments(commentsFromCookie);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(localStorage.getItem('favorites'));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    console.log(localStorage.getItem('comments'));
  }, [comments]);

  const toggleFavorite = (carId) => {
    if (favorites.includes(carId)) {
      const updatedFavorites = favorites.filter(id => id !== carId);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, carId]);
    }
  };

  const addComment = (carId, name, comment) => {
    console.log(name);
    if (!name == '') {
      if (!comment == '') {
        const carComments = comments[carId] || [];
        const updatedComments = { ...comments, [carId]: [...carComments, { name, comment }] };
        setComments(updatedComments);
      } else {
        alert("Please include your comment.");
      }
    } else {
      alert("Please include your name.");
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = cars.filter(car =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  return (
    <Router>
      <div className="App">
        <Header handleSearch={handleSearch} filteredCars={filteredCars}/>
        <Routes>
          <Route
            path="/"
            element={<CarList cars={filteredCars.length > 0 ? filteredCars : cars} toggleFavorite={toggleFavorite} favorites={favorites} />}
          />
          <Route
            path="/car/:id"
            element={<CarDetails cars={cars} comments={comments} addComment={addComment} />}
          />
          <Route
            path="/favorites"
            element={<Favorites cars={cars} favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;