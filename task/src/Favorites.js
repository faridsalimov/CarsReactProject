import React from 'react';

function Favorites({ cars, favorites, toggleFavorite }) {
  const favoriteCars = cars.filter(car => favorites.includes(car.id));

  if (favoriteCars.length === 0) {
    return (
      <div className="favorites">
        <h2>Favorites</h2>
        <p>This place looks empty.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favoriteCars.map(car => (
          <li key={car.id}>
            {car.year} {car.brand} {car.model}
            <button onClick={() => toggleFavorite(car.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;