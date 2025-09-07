import React from 'react';
import { TETROMINOS } from '../lib/tetrominos';

const Cell = ({ type }) => {
  const def = TETROMINOS?.[type] || TETROMINOS[0];
  const isEmpty = type === 0 || !def?.color;

  return (
    <div
      className={`w-full h-full ${isEmpty ? '' : 'border border-gray-800 rounded-sm shadow-inner'}`}
      style={{
        backgroundColor: isEmpty ? 'transparent' : `rgba(${def.color}, 1)`,
        boxSizing: 'border-box',
      }}
    />
  );
};

export default React.memo(Cell);