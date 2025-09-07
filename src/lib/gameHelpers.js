export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let row = 0; row < player.tetromino.length; row += 1) {
    for (let col = 0; col < player.tetromino[row].length; col += 1) {
      if (player.tetromino[row][col] !== 0) {
        const nextY = player.pos.y + row + moveY;
        const nextX = player.pos.x + col + moveX;

        // Allow pieces to rotate above the stage (negative y)
        if (nextY >= STAGE_HEIGHT) return true;
        if (nextX < 0 || nextX >= STAGE_WIDTH) return true;

        // Only check stage collision if we're within visible playfield
        if (nextY >= 0) {
          const rowOnStage = stage[nextY];
          if (!rowOnStage || rowOnStage[nextX][1] !== 'clear') return true;
        }
      }
    }
  }
  return false;
};