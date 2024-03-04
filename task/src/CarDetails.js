import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CarDetails({ cars, comments, addComment }) {
  const { id } = useParams();
  const car = cars.find(car => car.id === parseInt(id));
  const carComments = comments[id] || [];

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(id, name, comment);
    setName('');
    setComment('');
  };

  if (!car) {
    return (
      <div className="car-details">
        <h2>Details</h2>
        <div>Car not found.</div>
      </div>
    );
  }

  return (
    <div className="car-details">
      <h2>Details</h2>
      <p>{car.year} {car.brand} {car.model}</p>
      <img src={car.image} alt={`${car.brand} ${car.model}`} />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        <textarea placeholder="Comment" value={comment} onChange={handleCommentChange}></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className='comments'>
        {carComments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.name}</strong>: {comment.comment}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarDetails;