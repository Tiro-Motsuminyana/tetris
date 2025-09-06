import React from 'react';

const Leaderboard = ({ scores }) => (
  <div style={{ color: 'white', marginTop: '20px' }}>
    <h2>Leaderboard</h2>
    <ol>
      {scores.map((entry, index) => (
        <li key={index}>{entry.name}: {entry.score}</li>
      ))}
    </ol>
  </div>
);

export default Leaderboard;