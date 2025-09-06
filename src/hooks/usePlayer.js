import { useState, useCallback, useEffect } from 'react';

import { TETROMINOS, randomTetromino } from '../lib/tetrominos';
import { STAGE_WIDTH, checkCollision } from '../lib/gameHelpers';

export const usePlayer = () => {
  const [nextTetromino, setNextTetromino] = useState(TETROMINOS[0]);
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // Transpose the matrix
    const rotatedTetro = matrix[0].map((_, colIndex) =>
      matrix.map(row => row[colIndex])
    );
    // Reverse each row to get the rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    // Reverse the matrix for counter-clockwise rotation
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: nextTetromino.shape,
      collided: false,
    });
    setNextTetromino(randomTetromino());
  }, [nextTetromino]);

  useEffect(() => {
    setNextTetromino(randomTetromino());
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino];
};