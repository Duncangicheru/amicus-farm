// src/SimpleSubmit.js
import React, { useState } from 'react';

const SimpleSubmit = () => {
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!itemName) {
      setError('Item name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit item');
      }

      const data = await response.json();
      setSuccessMessage(`Item "${data.name}" added successfully!`);
      setItemName(''); // Clear the input field
    } catch (error) {
      setError('Failed to submit item: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Submit an Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SimpleSubmit;
