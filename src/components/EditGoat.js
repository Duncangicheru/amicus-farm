import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditGoat.css';

const EditGoat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goat = location.state?.goat; // Use optional chaining to prevent errors if state is undefined

  const [name, setName] = useState(goat?.Name || '');
  const [breed, setBreed] = useState(goat?.Breed || '');
  const [initialWeight, setInitialWeight] = useState(goat?.InitialWeight || '');
  const [currentWeight, setCurrentWeight] = useState(goat?.CurrentWeight || '');
  const [buyingPrice, setBuyingPrice] = useState(goat?.BuyingPrice || '');
  const [age, setAge] = useState(goat?.Age || '');
  const [color, setColor] = useState(goat?.Color || '');
  const [lastVetVisit, setLastVetVisit] = useState(goat?.LastVetVisit ? goat.LastVetVisit.slice(0, 10) : '');
  const [nextVetVisit, setNextVetVisit] = useState(goat?.NextVetVisit ? goat.NextVetVisit.slice(0, 10) : '');
  const [lastVisitReason, setLastVisitReason] = useState(goat?.LastVisitReason || '');
  const [nextVisitReason, setNextVisitReason] = useState(goat?.NextVisitReason || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation checks
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0) {
      setError('Weights must be positive numbers, buying price cannot be negative, and age cannot be negative.');
      return;
    }

    const updatedGoat = {
      Name: name,
      Breed: breed,
      InitialWeight: Number(initialWeight),
      CurrentWeight: Number(currentWeight),
      BuyingPrice: Number(buyingPrice),
      Age: Number(age),
      Color: color,
      LastVetVisit: lastVetVisit,
      NextVetVisit: nextVetVisit,
      LastVisitReason: lastVisitReason,
      NextVisitReason: nextVisitReason,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/livestock/goats/${goat.Name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoat),
      });

      if (response.ok) {
        setSuccess('Goat updated successfully!');
        setError(null);
        navigate('/addgoat'); // Navigate back to AddGoat after updating
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        setSuccess(null);
      }
    } catch (error) {
      setError(`Couldn't update goat: ${error.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="edit-goat-container">
      <h3>Edit Goat</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleUpdate} className="edit-goat-form">
        <div className="form-field">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field small-field">
          <label>Breed:</label>
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Initial Weight:</label>
          <input type="number" value={initialWeight} onChange={(e) => setInitialWeight(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Current Weight:</label>
          <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Buying Price:</label>
          <input type="number" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} required />
        </div>
        <div className="form-field small-field">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-field small-field">
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Last Vet Visit:</label>
          <input type="date" value={lastVetVisit} onChange={(e) => setLastVetVisit(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Next Vet Visit:</label>
          <input type="date" value={nextVetVisit} onChange={(e) => setNextVetVisit(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Last Visit Reason:</label>
          <input type="text" value={lastVisitReason} onChange={(e) => setLastVisitReason(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Next Visit Reason:</label>
          <input type="text" value={nextVisitReason} onChange={(e) => setNextVisitReason(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Update Goat</button>
      </form>
    </div>
  );
};

export default EditGoat;
