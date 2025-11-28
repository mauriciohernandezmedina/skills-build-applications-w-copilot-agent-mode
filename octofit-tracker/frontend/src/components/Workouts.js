import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1 className="display-4">Workout Suggestions</h1>
        <p className="lead">Personalized workouts tailored to your fitness goals</p>
      </div>
      
      <div className="row">
        {data.length > 0 ? (
          data.map((workout) => (
            <div className="col-md-6 col-lg-4" key={workout._id}>
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{workout.name || 'Workout'}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description || 'No description available'}</p>
                  <hr />
                  <div className="mb-2">
                    <small className="text-muted">Difficulty:</small>
                    <span className="badge bg-warning text-dark ms-2">
                      {workout.difficulty || 'Medium'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Duration:</small>
                    <strong className="ms-2">{workout.duration || 30} min</strong>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Calories:</small>
                    <strong className="ms-2">{workout.calories || 0} kcal</strong>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Category:</small>
                    <span className="badge bg-info text-dark ms-2">
                      {workout.category || 'General'}
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-success w-100">Start Workout</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No workout suggestions available. Check back later for personalized recommendations!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
