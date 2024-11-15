import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditPlant.css';

const EditPlant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the plant object passed from the previous page
  const plant = location.state?.plant;

  // Initialize form state with plant data or empty string if not available
  const [name, setName] = useState(plant?.Name || '');
  const [type, setType] = useState(plant?.Type || '');
  const [plantingDate, setPlantingDate] = useState(plant?.PlantingDate ? plant.PlantingDate.slice(0, 10) : '');
  const [quantityPlanted, setQuantityPlanted] = useState(plant?.quantityPlanted || '');
  const [manureUsed, setManureUsed] = useState(plant?.manureUsed || '');
  const [waterUsed, setWaterUsed] = useState(plant?.waterUsed || '');
  const [lastWateringDate, setLastWateringDate] = useState(plant?.lastWateringDate ? plant.lastWateringDate.slice(0, 10) : '');
  const [nextWateringDate, setNextWateringDate] = useState(plant?.nextWateringDate ? plant.nextWateringDate.slice(0, 10) : '');
  const [lastSprayDate, setLastSprayDate] = useState(plant?.lastSprayDate ? plant.lastSprayDate.slice(0, 10) : '');
  const [nextSprayDate, setNextSprayDate] = useState(plant?.nextSprayDate ? plant.nextSprayDate.slice(0, 10) : '');
  const [lastSprayReason, setLastSprayReason] = useState(plant?.lastSprayReason || '');
  const [nextSprayReason, setNextSprayReason] = useState(plant?.nextSprayReason || '');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState(plant?.expectedHarvestDate ? plant.expectedHarvestDate.slice(0, 10) : '');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (plant) {
      setName(plant.Name);
      setType(plant.Type);
      setPlantingDate(plant.PlantingDate ? plant.PlantingDate.slice(0, 10) : '');
      setQuantityPlanted(plant.quantityPlanted);
      setManureUsed(plant.manureUsed);
      setWaterUsed(plant.waterUsed);
      setLastWateringDate(plant.lastWateringDate ? plant.lastWateringDate.slice(0, 10) : '');
      setNextWateringDate(plant.nextWateringDate ? plant.nextWateringDate.slice(0, 10) : '');
      setLastSprayDate(plant.lastSprayDate ? plant.lastSprayDate.slice(0, 10) : '');
      setNextSprayDate(plant.nextSprayDate ? plant.nextSprayDate.slice(0, 10) : '');
      setLastSprayReason(plant.lastSprayReason);
      setNextSprayReason(plant.nextSprayReason);
      setExpectedHarvestDate(plant.expectedHarvestDate ? plant.expectedHarvestDate.slice(0, 10) : '');
    }
  }, [plant]);  // Run this when plant data is loaded

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation checks
    if (Number(quantityPlanted) < 0) {
      setError('Quantity planted cannot be negative.');
      return;
    }

    const updatedPlant = {
      Name: name,
      Type: type,
      PlantingDate: plantingDate,
      quantityPlanted: quantityPlanted,
      manureUsed: manureUsed,
      waterUsed: waterUsed,
      lastWateringDate: lastWateringDate,
      nextWateringDate: nextWateringDate,
      lastSprayDate: lastSprayDate,
      nextSprayDate: nextSprayDate,
      lastSprayReason: lastSprayReason,
      nextSprayReason: nextSprayReason,
      expectedHarvestDate: expectedHarvestDate
    };

    try {
      const response = await fetch(`http://localhost:5000/api/garden/plant/${plant.Name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlant),
      });

      if (response.ok) {
        setSuccess('Plant updated successfully!');
        setError(null);
        navigate('/addplant'); // Navigate back after updating
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        setSuccess(null);
      }
    } catch (error) {
      setError(`Couldn't update plant: ${error.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="edit-plant-container">
      <h3>Edit Plant</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleUpdate} className="edit-plant-form">
        <div className="form-field">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field small-field">
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
            type="text"  // Change to text to allow both numbers and text
            value={quantityPlanted}
            onChange={(e) => setQuantityPlanted(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Manure Used:</label>
          <input type="text" value={manureUsed} onChange={(e) => setManureUsed(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Water Used:</label>
          <input type="text" value={waterUsed} onChange={(e) => setWaterUsed(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Last Watering Date:</label>
          <input type="date" value={lastWateringDate} onChange={(e) => setLastWateringDate(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Next Watering Date:</label>
          <input type="date" value={nextWateringDate} onChange={(e) => setNextWateringDate(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Last Spray Date:</label>
          <input type="date" value={lastSprayDate} onChange={(e) => setLastSprayDate(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Next Spray Date:</label>
          <input type="date" value={nextSprayDate} onChange={(e) => setNextSprayDate(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Last Spray Reason:</label>
          <input type="text" value={lastSprayReason} onChange={(e) => setLastSprayReason(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Next Spray Reason:</label>
          <input type="text" value={nextSprayReason} onChange={(e) => setNextSprayReason(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Expected Harvest Date:</label>
          <input type="date" value={expectedHarvestDate} onChange={(e) => setExpectedHarvestDate(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Update Plant</button>
      </form>
    </div>
  );
};

export default EditPlant;
