import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1 className="display-4">Teams</h1>
        <p className="lead">Manage and compete with fitness teams</p>
      </div>
      
      <div className="row">
        {data.length > 0 ? (
          data.map((team) => (
            <div className="col-md-4" key={team._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Unnamed Team'}</h5>
                  <p className="card-text text-muted">
                    {team.description || 'No description available'}
                  </p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">Members</small>
                      <h6>{team.member_count || 0}</h6>
                    </div>
                    <div>
                      <small className="text-muted">Total Points</small>
                      <h6>{team.total_points || 0}</h6>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary btn-sm btn-action">View Team</button>
                    <button className="btn btn-success btn-sm btn-action">Join</button>
                    <button className="btn btn-outline-secondary btn-sm">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No teams found. Create your first team to get started!
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle"></i> Create New Team
        </button>
      </div>
    </div>
  );
};

export default Teams;
