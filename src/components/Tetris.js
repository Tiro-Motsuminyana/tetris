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
    // Check for level up before moving the piece
    if (rows >= (level + 1) * 5) {
      const newLevel = level + 1;
      setLevel(newLevel);
      // Calculate new drop time based on the new level
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
    while (!checkCollision(player, stage, { x: 0, y: dropAmount + 1 })) {
      dropAmount++;
    }
    updatePlayerPos({ x: 0, y: dropAmount, collided: true });
  };

  const move = ({ keyCode }) => {
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
    if (gameOver) {
      const name = prompt('Game Over! Enter your name for the leaderboard:');
      addScore(name, score);
    }
  }, [gameOver, addScore, score]);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden" role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <div className="flex items-start p-10 mx-auto">
        <Stage stage={stage} />
        <aside className="w-full max-w-xs block p-5">
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
          <ConnectButton connectWallet={connectWallet} walletAddress={walletAddress} />
          <Display text="Next Piece" />
          <NextPiece nextTetromino={nextTetromino} />
          <Leaderboard scores={leaderboard} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;