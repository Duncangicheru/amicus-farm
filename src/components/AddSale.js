import React, { useState, useEffect } from 'react';
import './AddSale.css';

const AddSale = () => {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [produceType, setProduceType] = useState('');
  const [unitsSold, setUnitsSold] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [totalUnitsSoldSoFar, setTotalUnitsSoldSoFar] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSaleId, setEditingSaleId] = useState(null);

  // Fetch sales data
  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales/sale');
      if (!response.ok) throw new Error('Failed to fetch sales data');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error.message);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the newSale object, preserving empty strings for optional fields
    const newSale = {
      Item: item,
      Date: date,
      ProduceType: produceType || '',
      UnitsSold: unitsSold || '',
      PricePerUnit: pricePerUnit || '',
      TotalSales: totalSales || '',
      TotalUnitsSoldSoFar: totalUnitsSoldSoFar || ''
    };

    try {
      const url = editingSaleId
        ? `http://localhost:5000/api/sales/sale/${editingSaleId}`
        : 'http://localhost:5000/api/sales/sale';
      const method = editingSaleId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSale)
      });

      if (response.ok) {
        alert(`Sale ${editingSaleId ? 'updated' : 'added'} successfully!`);
        resetForm();
        setEditingSaleId(null);
        fetchSales();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error ${editingSaleId ? 'updating' : 'adding'} sale:`, error.message);
      alert(`Couldn't ${editingSaleId ? 'update' : 'add'} sale: ${error.message}`);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setItem('');
    setDate('');
    setProduceType('');
    setUnitsSold('');
    setPricePerUnit('');
    setTotalUnitsSoldSoFar('');
    setTotalSales('');
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  // Handle edit
  const handleEdit = (sale) => {
    setItem(sale.Item);
    setDate(sale.Date.slice(0, 10)); // Format date for input field
    setProduceType(sale.ProduceType || '');
    setUnitsSold(sale.UnitsSold || '');
    setPricePerUnit(sale.PricePerUnit || '');
    setTotalUnitsSoldSoFar(sale.TotalUnitsSoldSoFar || '');
    setTotalSales(sale.TotalSales || '');
    setEditingSaleId(sale._id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (saleId) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/sales/sale/${saleId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Sale deleted successfully!');
          fetchSales();
        } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting sale:', error.message);
        alert(`Couldn't delete sale: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-sale-container">
      <h3>Sales Records</h3>
      <table className="sale-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Date</th>
            <th>Produce Type</th>
            <th>Units Sold</th>
            <th>Price per Unit</th>
            <th>Total Sales</th>
            <th>Total Units Sold So Far</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.Item}</td>
              <td>{sale.Date.slice(0, 10)}</td>
              <td>{sale.ProduceType}</td>
              <td>{sale.UnitsSold}</td>
              <td>{sale.PricePerUnit}</td>
              <td>{sale.TotalSales}</td>
              <td>{sale.TotalUnitsSoldSoFar}</td>
              <td>
                <button onClick={() => handleEdit(sale)} className="edit-button">Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(sale._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility} className="add-sale-button">
        {showForm ? 'Close' : 'Add Sale'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-sale-form">
          <div className="form-field">
            <label>Item:</label>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Produce Type:</label>
            <input type="text" value={produceType} onChange={(e) => setProduceType(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Units Sold:</label>
            <input type="text" value={unitsSold} onChange={(e) => setUnitsSold(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Price per Unit:</label>
            <input type="text" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Total Sales:</label>
            <input type="text" value={totalSales} onChange={(e) => setTotalSales(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Total Units Sold So Far:</label>
            <input type="text" value={totalUnitsSoldSoFar} onChange={(e) => setTotalUnitsSoldSoFar(e.target.value)} />
          </div>
          <button type="submit">{editingSaleId ? 'Update Sale' : 'Add Sale'}</button>
        </form>
      )}
    </div>
  );
};

export default AddSale;
