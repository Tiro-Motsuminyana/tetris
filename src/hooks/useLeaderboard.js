import { useState, useEffect } from 'react';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (savedLeaderboard) {
      setLeaderboard(savedLeaderboard);
    } else {
      setLeaderboard(Array(5).fill({ name: 'empty', score: 0 }));
    }
  }, []);

  const addScore = (name, score) => {
    const newEntry = { name: name || 'empty', score };
    const newLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
  };

  return [leaderboard, addScore];
};