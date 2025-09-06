import React from 'react';
import { TETROMINOS } from '../lib/tetrominos';

const NextPiece = ({ nextTetromino }) => {
  const stageWidth = 4;
  const stageHeight = 4;

  const stage = Array.from(Array(stageHeight), () => Array(stageWidth).fill([0, 'clear']));

  if (nextTetromino) {
    const yOffset = Math.floor((stageHeight - nextTetromino.shape.length) / 2);
    const xOffset = Math.floor((stageWidth - nextTetromino.shape[0].length) / 2);

    nextTetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          stage[y + yOffset][x + xOffset] = [value, 'clear'];
        }
      });
    });
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${stageHeight}, 1fr)`,
        gridTemplateColumns: `repeat(${stageWidth}, 1fr)`,
        gridGap: '1px',
        border: '2px solid #333',
        width: '100%',
        maxWidth: '10vw',
        background: '#111',
      }}
    >
      {stage.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              width: '100%',
              paddingBottom: '100%',
              backgroundColor: `rgba(${TETROMINOS[cell[0]].color}, 0.8)`,
              border: cell[0] ? '1px solid #333' : 'none',
            }}
          />
        ))
      )}
    </div>
  );
};

export default NextPiece;