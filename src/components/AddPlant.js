import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlant.css';

const AddPlant = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [quantityPlanted, setQuantityPlanted] = useState('');
  const [manureUsed, setManureUsed] = useState('');
  const [waterUsed, setWaterUsed] = useState('');
  const [lastWateringDate, setLastWateringDate] = useState('');
  const [nextWateringDate, setNextWateringDate] = useState('');
  const [lastSprayDate, setLastSprayDate] = useState('');
  const [nextSprayDate, setNextSprayDate] = useState('');
  const [lastSprayReason, setLastSprayReason] = useState('');
  const [nextSprayReason, setNextSprayReason] = useState('');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

// Function to format a date to YYYY-MM-DD format
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear(); // Get the full year (4 digits)
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
};

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/garden/plant');
      if (!response.ok) throw new Error('Failed to fetch plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error.message);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add validation or transformation here if needed for quantityPlanted
    const newPlant = {
      Name: name,
      Type: type,
      PlantingDate: formatDate(plantingDate),
      quantityPlanted: quantityPlanted, // Allow text and number here
      manureUsed: manureUsed,
      waterUsed: waterUsed,
      lastWateringDate: formatDate(lastWateringDate),
      nextWateringDate: formatDate(nextWateringDate),
      lastSprayDate: formatDate(lastSprayDate),
      nextSprayDate: formatDate(nextSprayDate),
      lastSprayReason: lastSprayReason,
      nextSprayReason: nextSprayReason,
      expectedHarvestDate: formatDate(expectedHarvestDate),
    };

    try {
      const response = await fetch('http://localhost:5000/api/garden/plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlant),
      });

      if (response.ok) {
        alert('Plant added successfully!');
        resetForm();
        fetchPlants(); // Refresh the list after adding
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding plant:', error.message);
      alert(`Couldn't add plant: ${error.message}`);
    }
  };

  const resetForm = () => {
    setName('');
    setType('');
    setPlantingDate('');
    setQuantityPlanted('');
    setManureUsed('');
    setWaterUsed('');
    setLastWateringDate('');
    setNextWateringDate('');
    setLastSprayDate('');
    setNextSprayDate('');
    setLastSprayReason('');
    setNextSprayReason('');
    setExpectedHarvestDate('');
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (plant) => {
    navigate(`/editplant/${plant.Name}`, { state: { plant } });
  };

  const handleDeleteClick = async (plantName) => {
    if (window.confirm(`Are you sure you want to delete plant ${plantName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/garden/plant/${plantName}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Plant deleted successfully!');
          fetchPlants(); // Refresh the list after deletion
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting plant:', error.message);
        alert(`Couldn't delete plant: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-plant-container">
      <h3>Plants</h3>
      <table className="plant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Planting Date</th>
            <th>Quantity Planted</th>
            <th>Manure Used</th>
            <th>Water Used</th>
            <th>Last Watering Date</th>
            <th>Next Watering Date</th>
            <th>Last Spray Date</th>
            <th>Next Spray Date</th>
            <th>Last Spray Reason</th>
            <th>Next Spray Reason</th>
            <th>Expected Harvest Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant.Name}>
              <td>{plant.Name}</td>
              <td>{plant.Type}</td>
              <td>{formatDate(plant.PlantingDate)}</td>
              <td>{plant.quantityPlanted}</td>
              <td>{plant.manureUsed}</td>
              <td>{plant.waterUsed}</td>
              <td>{formatDate(plant.lastWateringDate)}</td>
              <td>{formatDate(plant.nextWateringDate)}</td>
              <td>{formatDate(plant.lastSprayDate)}</td>
              <td>{formatDate(plant.nextSprayDate)}</td>
              <td>{plant.lastSprayReason}</td>
              <td>{plant.nextSprayReason}</td>
              <td>{formatDate(plant.expectedHarvestDate)}</td>
              <td>
                <button onClick={() => handleEditClick(plant)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(plant.Name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-plant-button">
        {showForm ? 'Close' : 'Add Plant'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-plant-form">
          <div className="form-field">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Type:</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Planting Date:</label>
            <input type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Quantity Planted:</label>
            <input
              type="text"
              value={quantityPlanted}
              onChange={(e) => setQuantityPlanted(e.target.value)} 
              required
            />
          </div>
          <div className="form-field">
            <label>Manure Used:</label>
            <input type="text" value={manureUsed} onChange={(e) => setManureUsed(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Water Used:</label>
            <input type="text" value={waterUsed} onChange={(e) => setWaterUsed(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Last Watering Date:</label>
            <input type="date" value={lastWateringDate} onChange={(e) => setLastWateringDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Next Watering Date:</label>
            <input type="date" value={nextWateringDate} onChange={(e) => setNextWateringDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Last Spray Date:</label>
            <input type="date" value={lastSprayDate} onChange={(e) => setLastSprayDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Next Spray Date:</label>
            <input type="date" value={nextSprayDate} onChange={(e) => setNextSprayDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Last Spray Reason:</label>
            <input type="text" value={lastSprayReason} onChange={(e) => setLastSprayReason(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Next Spray Reason:</label>
            <input type="text" value={nextSprayReason} onChange={(e) => setNextSprayReason(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Expected Harvest Date:</label>
            <input type="date" value={expectedHarvestDate} onChange={(e) => setExpectedHarvestDate(e.target.value)} />
          </div>
          <button type="submit">Add Plant</button>
        </form>
      )}
    </div>
  );
};

export default AddPlant;
