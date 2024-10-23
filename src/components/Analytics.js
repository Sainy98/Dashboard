import React from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import '../styles/Analytics.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement, RadialLinearScale);

const Analytics = () => {
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Leads Acquired',
        data: [30, 50, 45, 60, 70, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        barThickness: 30,
        borderRadius: 10, 
      },
    ],
  };

  const pieData = {
    labels: ['Interested', 'Contacted', 'Closed', 'Not Interested'],
    datasets: [
      {
        label: 'Lead Status',
        data: [60, 20, 10, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 3,
        hoverOffset: 10,
        hoverBorderWidth: 5,
      
      },
    ],
  };

  // New chart: Line Chart for Revenue Growth
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [5000, 7000, 6500, 8000, 9000, 11000],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Interested', 'Contacted', 'Closed', 'Not Interested'],
    datasets: [
      {
        label: 'Lead Status',
        data: [50, 30, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Lead Status Distribution',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        bodySpacing: 6,
        padding: 10,
      },
    },
  };
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        bodySpacing: 6,
        padding: 10,
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  const barOptions = {
    ...chartOptions,
    title: { ...chartOptions.title, text: 'Leads Acquired Over Time' },
  };

  const pieOptions = {
    ...chartOptions,
    title: { ...chartOptions.title, text: 'Lead Status Breakdown' ,  text: 'Lead Status Distribution' },
  };

  const lineOptions = {
    ...chartOptions,
    title: { ...chartOptions.title, text: 'Monthly Revenue Growth' },
  };



  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <div className="chart-container">
        {/* Bar chart */}
        <div className="chart">
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie chart */}
        <div className="chart">
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* Line chart */}
        <div className="chart">
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="chart">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
      </div>
    </div>
  );
};

export default Analytics;
