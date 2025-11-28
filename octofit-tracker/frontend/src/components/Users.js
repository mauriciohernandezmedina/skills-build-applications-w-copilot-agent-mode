import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1 className="display-4">Users</h1>
        <p className="lead">Manage all registered users in the Octofit Tracker</p>
      </div>
      
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">User Directory</h5>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.first_name || 'N/A'}</td>
                    <td>{user.last_name || 'N/A'}</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info btn-action">View</button>
                      <button className="btn btn-sm btn-warning btn-action">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
