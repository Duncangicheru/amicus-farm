import React from 'react';
import Sidebar from './Sidebar'; // Import and use without changes
import './LivestockManagement.css';

const LivestockManagement = () => {
  return (
    <div className="livestock-management-container">
      <Sidebar /> {/* Sidebar component used without modification */}

      <div className="content">
        {/* Breeds Section - Content begins with paragraph */}
        <div className="breeds-section">
          <p>
            Our farm proudly hosts a variety of breeds of livestock to cater to the diverse agricultural needs. 
            Below are the main breeds we currently have:
          </p>

          <h2>Breeds of Livestock</h2>
          <ul>
            <li><strong>Cows:</strong> We primarily raise <em>Holstein</em> and <em>Jersey</em> cows, known for their excellent milk production.</li>
            <li><strong>Goats:</strong> Our farm is home to <em>Saanen</em> goats, famous for their high milk yield.</li>
            <li><strong>Sheep:</strong> We raise <em>Merino</em> sheep, known for their high-quality wool and meat.</li>
            <li><strong>Poultry:</strong> We breed <em>Rhode Island Red</em> chickens for their hardy nature and consistent egg-laying capabilities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LivestockManagement;
