import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
  };

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h1 className="display-4">🏆 Leaderboard</h1>
        <p className="lead">Top performers in the Octofit Tracker community</p>
      </div>
      
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Rankings</h5>
          <div className="btn-group" role="group">
            <button className="btn btn-outline-primary active">All Time</button>
            <button className="btn btn-outline-primary">This Month</button>
            <button className="btn btn-outline-primary">This Week</button>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Points</th>
                <th>Activities</th>
                <th>Achievements</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((entry, idx) => (
                  <tr key={entry._id || idx}>
                    <td>
                      <span className={`leaderboard-rank ${getRankClass(idx + 1)}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td><strong>{entry.team || 'N/A'}</strong></td>
                    <td>{entry.team_name || 'No Team'}</td>
                    <td>
                      <span className="badge bg-primary">{entry.points || 0} pts</span>
                    </td>
                    <td>{entry.activity_count || 0}</td>
                    <td>
                      <span className="badge bg-warning text-dark">{entry.achievements || 0} 🏅</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No leaderboard data available
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

export default Leaderboard;
