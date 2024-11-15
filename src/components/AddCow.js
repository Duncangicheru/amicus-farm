import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCow.css';

const AddCow = () => {
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
  const [cows, setCows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchCows = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/livestock/cows');
      if (!response.ok) throw new Error('Failed to fetch cows');
      const data = await response.json();
      setCows(data);
    } catch (error) {
      console.error('Error fetching cows:', error.message);
    }
  };

  useEffect(() => {
    fetchCows();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0) {
      alert('Weights must be positive numbers, buying price cannot be negative, and age cannot be negative.');
      return;
    }

    const newCow = {
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
      const response = await fetch('http://localhost:5000/api/livestock/cows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCow),
      });

      if (response.ok) {
        alert('Cow added successfully!');
        resetForm();
        fetchCows(); // Refresh the list after adding
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding cow:', error.message);
      alert(`Couldn't add cow: ${error.message}`);
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

  const handleEditClick = (cow) => {
    navigate(`/editcow/${cow.Name}`, { state: { cow } });
  };

  // New function to handle cow deletion
  const handleDeleteClick = async (cowName) => {
    if (window.confirm(`Are you sure you want to delete cow ${cowName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/livestock/cows/${cowName}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Cow deleted successfully!');
          fetchCows(); // Refresh the list after deletion
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting cow:', error.message);
        alert(`Couldn't delete cow: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-cow-container">
      <h3>Cows</h3>
      <table className="cow-table">
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
          {cows.map(cow => (
            <tr key={cow.Name}>
              <td>{cow.Name}</td>
              <td>{cow.Breed}</td>
              <td>{cow.InitialWeight}</td>
              <td>{cow.CurrentWeight}</td>
              <td>{cow.BuyingPrice}</td>
              <td>{cow.Age}</td>
              <td>{cow.Color}</td>
              <td>{cow.LastVetVisit.slice(0, 10)}</td> {/* Displaying date as YYYY-MM-DD */}
              <td>{cow.NextVetVisit.slice(0, 10)}</td> {/* Displaying date as YYYY-MM-DD */}
              <td>{cow.LastVisitReason}</td>
              <td>{cow.NextVisitReason}</td>
              <td>
                <button onClick={() => handleEditClick(cow)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(cow.Name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-cow-button">
        {showForm ? 'Close' : 'Add Cow'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-cow-form">
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
          <button type="submit">Add Cow</button>
        </form>
      )}
    </div>
  );
};

export default AddCow;
