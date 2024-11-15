import React from 'react';
import './Popup.css';  // This imports the popup styling

function Popup({ message, closePopup }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{message}</h2>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
