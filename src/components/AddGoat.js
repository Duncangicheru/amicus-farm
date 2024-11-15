import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGoat.css';

const AddGoat = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [initialWeight, setInitialWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [lastVetVisit, setLastVetVisit] = useState('');
  const [nextVetVisit, setNextVetVisit] = useState('');
  const [lastVisitReason, setLastVisitReason] = useState('');
  const [nextVisitReason, setNextVisitReason] = useState('');
  const [goats, setGoats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchGoats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/livestock/goats');
      if (!response.ok) throw new Error('Failed to fetch goats');
      const data = await response.json();
      setGoats(data);
    } catch (error) {
      console.error('Error fetching goats:', error.message);
    }
  };

  useEffect(() => {
    fetchGoats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0) {
      alert('Weights must be positive numbers, buying price cannot be negative, and age cannot be negative.');
      return;
    }
    const newGoat = {
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
      const response = await fetch('http://localhost:5000/api/livestock/goats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoat),
      });

      if (response.ok) {
        alert('Goat added successfully!');
        resetForm();
        fetchGoats();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding goat:', error.message);
      alert(`Couldn't add goat: ${error.message}`);
    }
  };

  const resetForm = () => {
    setName('');
    setBreed('');
    setInitialWeight('');
    setCurrentWeight('');
    setBuyingPrice('');
    setAge('');
    setColor('');
    setLastVetVisit('');
    setNextVetVisit('');
    setLastVisitReason('');
    setNextVisitReason('');
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (goat) => {
    navigate(`/editgoat/${goat.Name}`, { state: { goat } });
  };

  const handleDeleteClick = async (goatName) => {
    if (window.confirm(`Are you sure you want to delete goat ${goatName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/livestock/goats/${goatName}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Goat deleted successfully!');
          fetchGoats();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting goat:', error.message);
        alert(`Couldn't delete goat: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-goat-container">
      <h3>Goats</h3>
      <table className="goat-table">
        <thead>
          <tr>
            <th>Name</th>
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
          {goats.map(goat => (
            <tr key={goat.Name}>
              <td>{goat.Name}</td>
              <td>{goat.Breed}</td>
              <td>{goat.InitialWeight}</td>
              <td>{goat.CurrentWeight}</td>
              <td>{goat.BuyingPrice}</td>
              <td>{goat.Age}</td>
              <td>{goat.Color}</td>
              <td>{goat.LastVetVisit.slice(0, 10)}</td>
              <td>{goat.NextVetVisit.slice(0, 10)}</td>
              <td>{goat.LastVisitReason}</td>
              <td>{goat.NextVisitReason}</td>
              <td>
                <button onClick={() => handleEditClick(goat)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(goat.Name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-goat-button">
        {showForm ? 'Close' : 'Add Goat'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-goat-form">
          <div className="form-field">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
          <button type="submit">Add Goat</button>
        </form>
      )}
    </div>
  );
};

export default AddGoat;
