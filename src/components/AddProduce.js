import React, { useState, useEffect } from 'react';
import './AddProduce.css'; // Create a new CSS file for styling

const AddProduce = () => {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [typeOfProduce, setTypeOfProduce] = useState('');
  const [unitsProduced, setUnitsProduced] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [remainingUnits, setRemainingUnits] = useState('');
  const [totalUnitsProducedSoFar, setTotalUnitsProducedSoFar] = useState('');
  const [produces, setProduces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduceId, setEditingProduceId] = useState(null); // Track the produce being edited

  // Fetch produce data
  const fetchProduces = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/production/produce');
      console.log('Fetch produces response:', response);
      if (!response.ok) throw new Error('Failed to fetch produce data');
      const data = await response.json();
      setProduces(data);
    } catch (error) {
      console.error('Error fetching produces:', error.message);
      alert('Error fetching produce records. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProduces();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the fields are filled in correctly as text
    if (
      !item ||
      !typeOfProduce ||
      !unitsProduced ||
      !pricePerUnit ||
      !remainingUnits ||
      !totalUnitsProducedSoFar ||
      !date
    ) {
      alert('Please fill in all fields');
      return;
    }

    const newProduce = {
      Item: item,
      Date: date,
      TypeOfProduce: typeOfProduce,
      UnitsProduced: unitsProduced,
      PricePerUnit: pricePerUnit,
      RemainingUnits: remainingUnits,
      TotalUnitsProducedSoFar: totalUnitsProducedSoFar,
    };

    if (editingProduceId) {
      // Update produce
      try {
        const response = await fetch(`http://localhost:5000/api/production/produce/${editingProduceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduce),
        });

        if (response.ok) {
          alert('Produce updated successfully!');
          resetForm();
          setEditingProduceId(null); // Reset editing state
          fetchProduces();
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error updating produce:', error.message);
        alert(`Couldn't update produce: ${error.message}`);
      }
    } else {
      // Create new produce
      try {
        const response = await fetch('http://localhost:5000/api/production/produce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduce),
        });

        if (response.ok) {
          alert('Produce added successfully!');
          resetForm();
          fetchProduces();
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error adding produce:', error.message);
        alert(`Couldn't add produce: ${error.message}`);
      }
    }
  };

  // Reset form fields
  const resetForm = () => {
    setItem('');
    setDate('');
    setTypeOfProduce('');
    setUnitsProduced('');
    setPricePerUnit('');
    setRemainingUnits('');
    setTotalUnitsProducedSoFar('');
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  // Handle edit
  const handleEdit = (produce) => {
    setItem(produce.Item);
    setDate(produce.Date);
    setTypeOfProduce(produce.TypeOfProduce);
    setUnitsProduced(produce.UnitsProduced);
    setPricePerUnit(produce.PricePerUnit);
    setRemainingUnits(produce.RemainingUnits);
    setTotalUnitsProducedSoFar(produce.TotalUnitsProducedSoFar);
    setEditingProduceId(produce._id); // Set the ID of the produce being edited
    setShowForm(true);
  };

  const handleDelete = async (produceId) => {
    if (window.confirm('Are you sure you want to delete this produce?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/production/produce/${produceId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Produce deleted successfully!');
          fetchProduces(); // Refresh the list after deletion
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting produce:', error.message);
        alert(`Couldn't delete produce: ${error.message}`);
      }
    }
  };  

  return (
    <div className="add-produce-container">
      <h3>Produce Records</h3>
      <table className="produce-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Date</th>
            <th>Type of Produce</th>
            <th>Units Produced</th>
            <th>Price per Unit</th>
            <th>Remaining Units</th>
            <th>Total Units Produced So Far</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {produces.map((produce) => (
            <tr key={produce._id}>
              <td>{produce.Item}</td>
              <td>{produce.Date.slice(0, 10)}</td>
              <td>{produce.TypeOfProduce}</td>
              <td>{produce.UnitsProduced}</td>
              <td>{produce.PricePerUnit}</td>
              <td>{produce.RemainingUnits}</td>
              <td>{produce.TotalUnitsProducedSoFar}</td>
              <td>
                <button onClick={() => handleEdit(produce)} className="edit-button">Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(produce._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-produce-button">
        {showForm ? 'Close' : 'Add Produce'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-produce-form">
          <div className="form-field">
            <label>Item:</label>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Type of Produce:</label>
            <input type="text" value={typeOfProduce} onChange={(e) => setTypeOfProduce(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Units Produced:</label>
            <input type="text" value={unitsProduced} onChange={(e) => setUnitsProduced(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Price per Unit:</label>
            <input type="text" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Remaining Units:</label>
            <input type="text" value={remainingUnits} onChange={(e) => setRemainingUnits(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Total Units Produced So Far:</label>
            <input type="text" value={totalUnitsProducedSoFar} onChange={(e) => setTotalUnitsProducedSoFar(e.target.value)} required />
          </div>
          <button type="submit">{editingProduceId ? 'Update Produce' : 'Add Produce'}</button>
        </form>
      )}
    </div>
  );
};

export default AddProduce;
