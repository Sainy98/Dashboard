import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import '../styles/Report.css';

const Reports = () => {
  const lineChartRef = useRef(null);  // Reference for Line chart
  const barChartRef = useRef(null);   // Reference for Bar chart

  const csvData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Interested' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Closed' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Not Interested' },
    { id: 5, name: 'Samuel Green', email: 'samuel@example.com', status: 'Interested' },
    { id: 6, name: 'Sophia White', email: 'sophia@example.com', status: 'Contacted' },
    { id: 7, name: 'Henry Brown', email: 'henry@example.com', status: 'Closed' },
    { id: 8, name: 'Olivia Black', email: 'olivia@example.com', status: 'Interested' },
  ];

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

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('EzyMetrics Report', 15, 20);
  
    // Create table data
    const tableData = csvData.map((lead, index) => [
      index + 1, // Serial number
      lead.name,
      lead.email,
      lead.status,
    ]);
  
    // Add table to PDF
    pdf.autoTable({
      head: [['#', 'Name', 'Email', 'Status']], // Table headers
      body: tableData, // Table data
      startY: 30, // Start position on the page
    });
  
    // Calculate the totals based on status
    const statusCount = csvData.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
  
    // Add totals summary with formatting
    let yOffset = pdf.autoTable.previous.finalY + 15; // Adjust position after the table
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold'); // Bold font for 'Summary'
    pdf.text('Summary:', 20, yOffset);
  
    yOffset += 10;
  
    // Define colors for each status
    const statusColors = {
      Interested: [75, 192, 192], // Light blue
      Contacted: [255, 206, 86],  // Yellow
      Closed: [54, 162, 235],     // Blue
      'Not Interested': [255, 99, 132], // Red
    };
  
    pdf.setFontSize(12); // Smaller font for each status summary
  
    Object.entries(statusCount).forEach(([status, count]) => {
      const [r, g, b] = statusColors[status] || [0, 0, 0]; // Default to black if status not found
      pdf.setTextColor(r, g, b); // Apply color based on status
      pdf.text(`${status}: ${count}`, 20, yOffset);
      yOffset += 10;
    });
  
    // Reset font color to black and font size
    pdf.setTextColor(0, 0, 0);
  
    // Add another page for charts
    pdf.addPage();
    const lineChartInstance = lineChartRef.current;
    const barChartInstance = barChartRef.current;
  
    if (lineChartInstance && barChartInstance) {
      const lineChartImage = lineChartInstance.toBase64Image(); // Convert to Base64
      const barChartImage = barChartInstance.toBase64Image();   // Convert to Base64
  
      // Second page: Render Charts
      pdf.text('Leads Over Time', 20, 20);
      pdf.addImage(lineChartImage, 'JPEG', 15, 30, 180, 100);
      pdf.text('Conversion Rate', 20, 140);
      pdf.addImage(barChartImage, 'JPEG', 15, 150, 180, 100);
    }
  
    // Save the PDF
    pdf.save('report.pdf');
  };
  

  return (
    <div className="reports">
      <h2>Reports</h2>
     
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((lead, index) => (
            <tr key={lead.id} className="lead-row" style={{ animationDelay: `${index * 0.1}s` }}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>
                <span className={`status-badge ${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="charts">
        <div className="chart-container">
          <h3>Leads Over Time</h3>
          <Line ref={lineChartRef} data={lineData} id="line-chart" />
        </div>
        <div className="chart-container">
          <h3>Conversion Rate</h3>
          <Bar ref={barChartRef} data={barData} id="bar-chart" />
        </div>
      </div>
      <div className="buttons">
        <button className="generate-button" onClick={generatePDF}>
          Generate PDF
        </button>
        <CSVLink data={csvData} filename={'report.csv'}>
          <button className="generate-button">Generate CSV</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default Reports;
