import React from 'react';
import Cell from './Cell';
import { STAGE_WIDTH } from '../lib/gameHelpers';

const CELL_SIZE = 24;

const Stage = ({ stage }) => (
  <div
    className="mx-auto border-2 border-gray-600 bg-gray-900 rounded-lg grid relative overflow-hidden"
    style={{
      gridTemplateRows: `repeat(${stage.length}, ${CELL_SIZE}px)`,
      gridTemplateColumns: `repeat(${STAGE_WIDTH}, ${CELL_SIZE}px)`,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
      backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
      width: 'fit-content'
    }}
    role="grid"
    aria-label="Tetris stage"
  >
    {stage.map((row, y) =>
      row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />)
    )}
  </div>
);

export default Stage;