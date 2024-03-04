import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value.trim() === '') {
      handleSearch('');
    } else {
      handleSearch(value.toLowerCase());
    }
  };

  return (
    <header className="App-header">
      <h1>Car Search App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;