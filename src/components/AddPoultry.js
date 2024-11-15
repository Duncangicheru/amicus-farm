import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPoultry.css';

const AddPoultry = () => {
  const [totalNumber, setTotalNumber] = useState('');
  const [breed, setBreed] = useState('');
  const [initialWeight, setInitialWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [lastVetVisit, setLastVetVisit] = useState(''); // Default is empty
  const [nextVetVisit, setNextVetVisit] = useState(''); // Default is empty
  const [lastVisitReason, setLastVisitReason] = useState('');
  const [nextVisitReason, setNextVisitReason] = useState('');
  const [poultries, setPoultries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchPoultries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/livestock/poultry');
      if (!response.ok) throw new Error('Failed to fetch poultries');
      const data = await response.json();
      setPoultries(data);
    } catch (error) {
      console.error('Error fetching poultries:', error.message);
    }
  };

  useEffect(() => {
    fetchPoultries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0) {
      alert('Weights must be positive numbers, buying price cannot be negative, and age cannot be negative.');
      return;
    }
    const newPoultry = {
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
      const response = await fetch('http://localhost:5000/api/livestock/poultry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPoultry),
      });

      if (response.ok) {
        alert('Poultry added successfully!');
        resetForm();
        fetchPoultries(); // Refresh the list after adding
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding poultry:', error.message);
      alert(`Couldn't add poultry: ${error.message}`);
    }
  };

  const resetForm = () => {
    setTotalNumber('');
    setBreed('');
    setInitialWeight('');
    setCurrentWeight('');
    setBuyingPrice('');
    setAge('');
    setColor('');
    setLastVetVisit(''); // Reset to empty
    setNextVetVisit(''); // Reset to empty
    setLastVisitReason('');
    setNextVisitReason('');
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (poultry) => {
    navigate(`/editpoultry/${poultry.TotalNumber}`, { state: { poultry } });
  };

  // New function to handle poultry deletion
  const handleDeleteClick = async (totalNumber) => {
    if (window.confirm(`Are you sure you want to delete poultry with total number ${totalNumber}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/livestock/poultry/${totalNumber}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Poultry deleted successfully!');
          fetchPoultries(); // Refresh the list after deletion
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting poultry:', error.message);
        alert(`Couldn't delete poultry: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-poultry-container">
      <h3>Poultries</h3>
      <table className="poultry-table">
        <thead>
          <tr>
            <th>Total Number</th>
            <th>Breed</th>
            <th>Initial Weight (kg)</th>
            <th>Current Weight (kg)</th>
            <th>Buying Price</th>
            <th>Age (years)</th>
            <th>Color</th>
            <th>Last Vet Visit</th>
            <th>Next Vet Visit</th>
            <th>Last Visit Reason</th>
            <th>Next Visit Reason</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {poultries.map(poultry => (
            <tr key={poultry.TotalNumber}>
              <td>{poultry.TotalNumber}</td>
              <td>{poultry.Breed}</td>
              <td>{poultry.InitialWeight}</td>
              <td>{poultry.CurrentWeight}</td>
              <td>{poultry.BuyingPrice}</td>
              <td>{poultry.Age}</td>
              <td>{poultry.Color}</td>
              <td>{poultry.LastVetVisit.slice(0, 10)}</td> {/* Displaying date as YYYY-MM-DD */}
              <td>{poultry.NextVetVisit.slice(0, 10)}</td> {/* Displaying date as YYYY-MM-DD */}
              <td>{poultry.LastVisitReason}</td>
              <td>{poultry.NextVisitReason}</td>
              <td>
                <button onClick={() => handleEditClick(poultry)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(poultry.TotalNumber)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-poultry-button">
        {showForm ? 'Close' : 'Add Poultry'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-poultry-form">
          <div className="form-field">
            <label>Total Number:</label>
            <input type="number" value={totalNumber} onChange={(e) => setTotalNumber(e.target.value)} required />
          </div>
          <div className="form-field">
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
          <div className="form-field">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="form-field">
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
          <button type="submit">Add Poultry</button>
        </form>
      )}
    </div>
  );
};

export default AddPoultry;
