import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSheep.css';

const AddSheep = () => {
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
  const [sheep, setSheep] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchSheep = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/livestock/sheep');
      if (!response.ok) throw new Error('Failed to fetch sheep');
      const data = await response.json();
      setSheep(data);
    } catch (error) {
      console.error('Error fetching sheep:', error.message);
    }
  };

  useEffect(() => {
    fetchSheep();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(initialWeight) <= 0 || Number(currentWeight) <= 0 || Number(buyingPrice) < 0 || Number(age) < 0) {
      alert('Weights must be positive numbers, buying price cannot be negative, and age cannot be negative.');
      return;
    }
    const newSheep = {
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
      const response = await fetch('http://localhost:5000/api/livestock/sheep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSheep),
      });

      if (response.ok) {
        alert('Sheep added successfully!');
        resetForm();
        fetchSheep();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding sheep:', error.message);
      alert(`Couldn't add sheep: ${error.message}`);
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

  const handleEditClick = (sheep) => {
    navigate(`/editsheep/${sheep.Name}`, { state: { sheep } });
  };

  const handleDeleteClick = async (sheepName) => {
    if (window.confirm(`Are you sure you want to delete sheep ${sheepName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/livestock/sheep/${sheepName}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Sheep deleted successfully!');
          fetchSheep();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting sheep:', error.message);
        alert(`Couldn't delete sheep: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-sheep-container">
      <h3>Sheep</h3>
      <table className="sheep-table">
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
          {sheep.map(sheep => (
            <tr key={sheep.Name}>
              <td>{sheep.Name}</td>
              <td>{sheep.Breed}</td>
              <td>{sheep.InitialWeight}</td>
              <td>{sheep.CurrentWeight}</td>
              <td>{sheep.BuyingPrice}</td>
              <td>{sheep.Age}</td>
              <td>{sheep.Color}</td>
              <td>{sheep.LastVetVisit.slice(0, 10)}</td>
              <td>{sheep.NextVetVisit.slice(0, 10)}</td>
              <td>{sheep.LastVisitReason}</td>
              <td>{sheep.NextVisitReason}</td>
              <td>
                <button onClick={() => handleEditClick(sheep)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(sheep.Name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-sheep-button">
        {showForm ? 'Close' : 'Add Sheep'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-sheep-form">
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
          <button type="submit">Add Sheep</button>
        </form>
      )}
    </div>
  );
};

export default AddSheep;
