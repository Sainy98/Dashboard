import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Reports from './components/Reports';
import Analytics from './components/Analytics';

import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'Leads':
        return <Leads />;
      case 'Analytics':
        return <Analytics />;
      case 'Reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen)

  }
  

  return (
    <div className="app">
      <div className="menu-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <span onClick={toggleSidebar}>&#10005;</span>
        ): (
          <span onClick={toggleSidebar}>&#9776;</span>
        )
      }
      </div>
      <Sidebar setActivePage={setActivePage} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className="content"  onClick={toggleSidebar}> 
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
