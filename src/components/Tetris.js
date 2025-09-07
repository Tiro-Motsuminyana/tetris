'use client';

import { useState, useEffect } from 'react';

import { createStage, checkCollision } from '../lib/gameHelpers';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useWallet } from '../hooks/useWallet';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import NextPiece from './NextPiece';
import Leaderboard from './Leaderboard';
import ConnectButton from './ConnectButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [promptShown, setPromptShown] = useState(false); // Added this line

  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const [leaderboard, addScore] = useLeaderboard();
  const [walletAddress, connectWallet] = useWallet();

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows >= (level + 1) * 5) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setDropTime(1000 / (newLevel + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const hardDrop = () => {
    let dropAmount = 0;
    // Calculate maximum possible drop distance
    while (!checkCollision(player, stage, { x: 0, y: dropAmount + 1 })) {
      dropAmount++;
    }
    // Ensure piece snaps to bottom even if partially above stage
    updatePlayerPos({ 
      x: 0, 
      y: dropAmount,
      collided: true 
    });
  };

  const move = ({ keyCode, preventDefault }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 32) {
        hardDrop();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    if (gameOver && !promptShown) {
      const name = prompt('Game Over! Enter your name for the leaderboard:');
      if (name) {
        addScore(name, score);
        setPromptShown(true);
      }
    }
  }, [gameOver, addScore, score, promptShown]);

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center p-4" role="button" tabIndex="0" onKeyDown={e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      move(e);
    }} onKeyUp={keyUp}>
      <div className="flex items-start gap-8 max-w-6xl w-full">
        <div className="flex-1 min-w-0">
          <Stage stage={stage} />
        </div>
        <aside className="w-80 max-h-[calc(100vh-2rem)] overflow-y-auto bg-gray-800 p-6 rounded-lg space-y-4">
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div className="space-y-2">
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <div className="space-y-4 pt-2">
            <StartButton callback={startGame} />
            <ConnectButton connectWallet={connectWallet} walletAddress={walletAddress} />
            <NextPiece nextTetromino={nextTetromino} />
            <Leaderboard scores={leaderboard} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Tetris;