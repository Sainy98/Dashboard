import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for chart.js
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [widgets] = useState([
    { id: 1, name: 'Total Leads', value: '200' },
    { id: 2, name: 'Conversion Rate', value: '5%' },
    { id: 3, name: 'Monthly Revenue', value: '₹50,000' },
    { id: 4, name: 'New Clients', value: '30' },
  ]);

  // Data for charts
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Leads Over Time',
        data: [50, 75, 60, 90, 100, 120],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [3, 4, 5, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="widgets">
        {widgets.map(widget => (
          <div key={widget.id} className="widget">
            <h3>{widget.name}</h3>
            <p>{widget.value}</p>
          </div>
        ))}
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Leads Over Time</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-container">
          <h3>Conversion Rate Per Week</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
