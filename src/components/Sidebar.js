import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ setActivePage, isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => setActivePage('Dashboard')}>Dashboard</li>
        <li onClick={() => setActivePage('Leads')}>Leads</li>
        <li onClick={() => setActivePage('Analytics')}>Analytics</li>
        <li onClick={() => setActivePage('Reports')}>Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
