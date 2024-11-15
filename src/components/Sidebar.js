import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the updated CSS for the top bar

const Sidebar = () => {
  // State to toggle sidebar visibility (for mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar open/close (for mobile)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Hamburger Icon on the left */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Top Bar Navigation */}
      <div className={`topbar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/addcow">Manage Cows</Link></li>
          <li><Link to="/addgoat">Manage Goats</Link></li>
          <li><Link to="/addsheep">Manage Sheep</Link></li>
          <li><Link to="/addpoultry">Manage Poultry</Link></li>
        </ul>
      </div>

      {/* Main content section */}
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
