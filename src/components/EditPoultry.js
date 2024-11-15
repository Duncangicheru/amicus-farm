import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditPoultry.css';

const EditPoultry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const poultry = location.state?.poultry; // Use optional chaining to prevent errors if state is undefined

  const [totalNumber, setTotalNumber] = useState(poultry?.TotalNumber || '');
  const [breed, setBreed] = useState(poultry?.Breed || '');
  const [initialWeight, setInitialWeight] = useState(poultry?.InitialWeight || '');
  const [currentWeight, setCurrentWeight] = useState(poultry?.CurrentWeight || '');
  const [buyingPrice, setBuyingPrice] = useState(poultry?.BuyingPrice || '');
  const [age, setAge] = useState(poultry?.Age || '');
  const [color, setColor] = useState(poultry?.Color || '');
  const [lastVetVisit, setLastVetVisit] = useState(poultry?.LastVetVisit ? poultry.LastVetVisit.slice(0, 10) : '');
  const [nextVetVisit, setNextVetVisit] = useState(poultry?.NextVetVisit ? poultry.NextVetVisit.slice(0, 10) : '');
  const [lastVisitReason, setLastVisitReason] = useState(poultry?.LastVisitReason || '');
  const [nextVisitReason, setNextVisitReason] = useState(poultry?.NextVisitReason || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation checks
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0 || Number(totalNumber) <= 0) {
      setError('Weights, Total Number, buying price cannot be negative, and age cannot be negative.');
      return;
    }

    const updatedPoultry = {
      TotalNumber: Number(totalNumber),
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
      const response = await fetch(`http://localhost:5000/api/livestock/poultry/${poultry.TotalNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPoultry),
      });

      // Check if response is ok (status code 2xx)
      if (response.ok) {
        setSuccess('Poultry updated successfully!');
        setError(null);
        navigate('/addpoultry'); // Navigate back to AddPoultry after updating
      } else {
        // If the response is not successful, try to parse the error message
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          // Try to parse the JSON if the response is JSON
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        } else {
          // If it's not JSON, display a generic error message
          const errorText = await response.text();
          setError(`Unexpected error: ${errorText}`);
        }
        setSuccess(null);
      }
    } catch (error) {
      setError(`Couldn't update poultry: ${error.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="edit-poultry-container">
      <h3>Edit Poultry</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleUpdate} className="edit-poultry-form">
        <div className="form-field">
          <label>Total Number:</label>
          <input type="number" value={totalNumber} onChange={(e) => setTotalNumber(e.target.value)} required />
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
        <button type="submit" className="submit-button">Update Poultry</button>
      </form>
    </div>
  );
};

export default EditPoultry;
