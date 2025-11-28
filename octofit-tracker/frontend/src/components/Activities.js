import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1 className="display-4">Activities</h1>
        <p className="lead">Track and manage all fitness activities</p>
      </div>
      
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Activity Log</h5>
          <button className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Log Activity
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((activity) => (
                  <tr key={activity._id}>
                    <td>{activity._id}</td>
                    <td><strong>{activity.user || 'N/A'}</strong></td>
                    <td>
                      <span className="badge bg-primary">{activity.activity || 'N/A'}</span>
                    </td>
                    <td>{activity.duration || 0}</td>
                    <td>{activity.distance || 0}</td>
                    <td>{activity.calories || 0}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-info btn-action">View</button>
                      <button className="btn btn-sm btn-warning btn-action">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No activities found
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

export default Activities;
