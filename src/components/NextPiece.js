import React from 'react';
import { TETROMINOS } from '../lib/tetrominos';
import Display from './Display';

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
    <div className="space-y-2">
      <Display text="Next Piece" />
      <div 
        className="grid bg-gray-800 rounded p-2" 
        style={{
          gridTemplateRows: `repeat(${stageHeight}, 1fr)`,
          gridTemplateColumns: `repeat(${stageWidth}, 1fr)`,
          gap: '1px',
        }}
      >
        {stage.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                backgroundColor: `rgba(${TETROMINOS[cell[0]].color}, 0.8)`,
                border: cell[0] ? '1px solid #333' : 'none',
                aspectRatio: '1/1'
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPiece;