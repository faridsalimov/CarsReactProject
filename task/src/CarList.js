import React from 'react';
import { Link } from 'react-router-dom';

function CarList({ cars, toggleFavorite, favorites }) {
  return (
    <div className="car-list">
      {cars.map(car => (
        <div className="car" key={car.id}>
          <Link to={`/car/${car.id}`}>
            <img src={car.image} alt={`${car.brand} ${car.model}`}/>
          </Link>
          <button className="favorite-button" onClick={() => toggleFavorite(car.id)}>
            {favorites.includes(car.id) ? '❤️' : '🤍'}
          </button>
          <h3>{car.year} {car.brand} {car.model}</h3>
        </div>
      ))}
    </div>
  );
}

export default CarList;