import React, { useState } from 'react';
import '../styles/Leads.css';

const Leads = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Interested' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Closed' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Not Interested' },
    { id: 5, name: 'Samuel Green', email: 'samuel@example.com', status: 'Interested' },
    { id: 6, name: 'Sophia White', email: 'sophia@example.com', status: 'Contacted' },
    { id: 7, name: 'Henry Brown', email: 'henry@example.com', status: 'Closed' },
    { id: 8, name: 'Olivia Black', email: 'olivia@example.com', status: 'Interested' },
  ]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter leads based on status
  const filteredLeads = leads.filter(
    (lead) => (statusFilter === '' || lead.status === statusFilter)
  );

  // Sort leads based on sortKey (name, email, status)
  const sortedLeads = filteredLeads.sort((a, b) => {
    const result = a[sortKey]?.localeCompare(b[sortKey]);
    return sortOrder === 'asc' ? result : -result;
  });

  // Count leads based on status
  const statusCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    {}
  );

 
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="leads-container">
      <h2>Leads</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All</option>
          <option value="Interested">Interested</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
          <option value="Not Interested">Not Interested</option>
        </select>
      </div>

      {/* Leads Table */}
      <table className="lead-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortKey === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {sortKey === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead, index) => (
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

      {/* Status Summary 3D Div */}
      <div className="status-summary">
        <div className="status-card" style={{ '--card-color': '#3498db' }}>
          <h3>Interested</h3>
          <p>{statusCounts.Interested || 0}</p>
        </div>
        <div className="status-card" style={{ '--card-color': '#f39c12' }}>
          <h3>Contacted</h3>
          <p>{statusCounts.Contacted || 0}</p>
        </div>
        <div className="status-card" style={{ '--card-color': '#2ecc71' }}>
          <h3>Closed</h3>
          <p>{statusCounts.Closed || 0}</p>
        </div>
        <div className="status-card" style={{ '--card-color': '#e74c3c' }}>
          <h3>Not Interested</h3>
          <p>{statusCounts['Not Interested'] || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Leads;
