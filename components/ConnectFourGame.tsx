'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

const NUM_ROWS = 6;
const NUM_COLUMNS = 7;

type Player = 'human' | 'computer';
type Cell = Player | null;
type Board = Cell[][];

interface GameState {
  board: Board;
  turn: Player;
  gameOver: boolean;
  winner: Player | 'tie' | null;
  isLoading: boolean;
  aiReady: boolean;
  aiLoadError: string | null;
}

// Create empty board (column-oriented for compatibility with original logic)
function createBoard(): Board {
  return Array(NUM_COLUMNS).fill(null).map(() => []);
}

// Check if there's a winner
function checkWinner(board: Board, player: Player): boolean {
  // Convert to row-major for easier checking
  const grid: Cell[][] = Array(NUM_ROWS).fill(null).map(() => Array(NUM_COLUMNS).fill(null));
  
  for (let col = 0; col < NUM_COLUMNS; col++) {
    for (let row = 0; row < board[col].length; row++) {
      grid[NUM_ROWS - 1 - row][col] = board[col][row];
    }
  }

  // Check horizontal
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col <= NUM_COLUMNS - 4; col++) {
      if (grid[row][col] === player &&
          grid[row][col + 1] === player &&
          grid[row][col + 2] === player &&
          grid[row][col + 3] === player) {
        return true;
      }
    }
  }

  // Check vertical
  for (let row = 0; row <= NUM_ROWS - 4; row++) {
    for (let col = 0; col < NUM_COLUMNS; col++) {
      if (grid[row][col] === player &&
          grid[row + 1][col] === player &&
          grid[row + 2][col] === player &&
          grid[row + 3][col] === player) {
        return true;
      }
    }
  }

  // Check diagonal (down-right)
  for (let row = 0; row <= NUM_ROWS - 4; row++) {
    for (let col = 0; col <= NUM_COLUMNS - 4; col++) {
      if (grid[row][col] === player &&
          grid[row + 1][col + 1] === player &&
          grid[row + 2][col + 2] === player &&
          grid[row + 3][col + 3] === player) {
        return true;
      }
    }
  }

  // Check diagonal (up-right)
  for (let row = 3; row < NUM_ROWS; row++) {
    for (let col = 0; col <= NUM_COLUMNS - 4; col++) {
      if (grid[row][col] === player &&
          grid[row - 1][col + 1] === player &&
          grid[row - 2][col + 2] === player &&
          grid[row - 3][col + 3] === player) {
        return true;
      }
    }
  }

  return false;
}

// Check if board is full (tie)
function isTie(board: Board): boolean {
  return board.every(col => col.length >= NUM_ROWS);
}

// Get valid moves
function getValidMoves(board: Board): number[] {
  return board
    .map((col, idx) => col.length < NUM_ROWS ? idx : -1)
    .filter(idx => idx !== -1);
}

// Convert board to features for the neural network
// Features are: 1 for computer's pieces, -1 for human's pieces, 0 for empty
function boardToFeatures(board: Board, currentPlayer: Player): number[] {
  const features: number[] = [];
  
  // The model expects column-major order with full 6-row columns
  for (let col = 0; col < NUM_COLUMNS; col++) {
    for (let row = 0; row < NUM_ROWS; row++) {
      const cell = board[col][row] || null;
      if (cell === currentPlayer) {
        features.push(1);
      } else if (cell === null) {
        features.push(0);
      } else {
        features.push(-1);
      }
    }
  }
  
  return features;
}

// Softmax with temperature for move selection
function softmax(probs: number[], theta: number = 25): number[] {
  const maxProb = Math.max(...probs);
  const expProbs = probs.map(p => Math.exp((p - maxProb) * theta));
  const sumExp = expProbs.reduce((a, b) => a + b, 0);
  return expProbs.map(p => p / sumExp);
}

export default function ConnectFourGame(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>({
    board: createBoard(),
    turn: 'human',
    gameOver: false,
    winner: null,
    isLoading: false,
    aiReady: false,
    aiLoadError: null,
  });
  
  const modelRef = useRef<tf.GraphModel | null>(null);

  // Load the neural network model
  useEffect(() => {
    async function loadModel(): Promise<void> {
      try {
        console.log('Loading Connect Four AI model...');
        const model = await tf.loadGraphModel('/models/connectfour/model.json');
        modelRef.current = model;
        console.log('Model loaded successfully!');
        setGameState(prev => ({ ...prev, aiReady: true }));
      } catch (error) {
        console.error('Failed to load AI model:', error);
        setGameState(prev => ({ 
          ...prev, 
          aiReady: false,
          aiLoadError: 'Failed to load AI model. Using fallback AI.',
        }));
      }
    }
    
    loadModel();
    
    return () => {
      // Cleanup model on unmount
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  // Get AI move using neural network
  const getAIMove = useCallback(async (board: Board): Promise<number> => {
    const validMoves = getValidMoves(board);
    
    if (!modelRef.current) {
      // Fallback to random move if model not loaded
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    }
    
    // Evaluate each possible move
    const moveScores: number[] = new Array(NUM_COLUMNS).fill(0);
    
    for (const col of validMoves) {
      // Make the move
      const newBoard = board.map(c => [...c]);
      newBoard[col].push('computer');
      
      // Convert to features (from computer's perspective after the move)
      const features = boardToFeatures(newBoard, 'computer');
      
      // Get prediction from model
      const inputTensor = tf.tensor2d([features], [1, 42]);
      const prediction = modelRef.current.execute(inputTensor) as tf.Tensor;
      const probs = await prediction.data();
      
      // probs[0] = win probability, probs[1] = lose probability, probs[2] = draw probability
      // We want to maximize win probability
      moveScores[col] = probs[0];
      
      // Cleanup tensors
      inputTensor.dispose();
      prediction.dispose();
    }
    
    // Use softmax to convert scores to probabilities and pick a move
    // Using greedy selection (pick best move)
    const moveProbs = softmax(moveScores);
    let bestMove = validMoves[0];
    let bestProb = moveProbs[bestMove];
    
    for (const col of validMoves) {
      if (moveProbs[col] > bestProb) {
        bestProb = moveProbs[col];
        bestMove = col;
      }
    }
    
    return bestMove;
  }, []);

  const handleColumnClick = useCallback((col: number) => {
    if (gameState.gameOver || gameState.turn !== 'human' || gameState.isLoading) {
      return;
    }

    if (gameState.board[col].length >= NUM_ROWS) {
      return; // Column is full
    }

    // Make human move
    const newBoard = gameState.board.map(c => [...c]);
    newBoard[col].push('human');

    // Check for human win
    if (checkWinner(newBoard, 'human')) {
      setGameState({
        ...gameState,
        board: newBoard,
        gameOver: true,
        winner: 'human',
      });
      return;
    }

    // Check for tie
    if (isTie(newBoard)) {
      setGameState({
        ...gameState,
        board: newBoard,
        gameOver: true,
        winner: 'tie',
      });
      return;
    }

    // Switch to computer's turn
    setGameState({
      ...gameState,
      board: newBoard,
      turn: 'computer',
      isLoading: true,
    });
  }, [gameState]);

  // Computer move effect
  useEffect(() => {
    if (gameState.turn !== 'computer' || gameState.gameOver || !gameState.isLoading) {
      return;
    }

    // Add a small delay to make it feel more natural
    const makeMove = async (): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const computerCol = await getAIMove(gameState.board);
      const newBoard = gameState.board.map(c => [...c]);
      newBoard[computerCol].push('computer');

      // Check for computer win
      if (checkWinner(newBoard, 'computer')) {
        setGameState({
          ...gameState,
          board: newBoard,
          turn: 'human',
          gameOver: true,
          winner: 'computer',
          isLoading: false,
        });
        return;
      }

      // Check for tie
      if (isTie(newBoard)) {
        setGameState({
          ...gameState,
          board: newBoard,
          turn: 'human',
          gameOver: true,
          winner: 'tie',
          isLoading: false,
        });
        return;
      }

      // Switch back to human
      setGameState({
        ...gameState,
        board: newBoard,
        turn: 'human',
        isLoading: false,
      });
    };
    
    makeMove();
  }, [gameState, getAIMove]);

  const resetGame = (): void => {
    setGameState({
      ...gameState,
      board: createBoard(),
      turn: 'human',
      gameOver: false,
      winner: null,
      isLoading: false,
    });
  };

  // Render the board
  const renderBoard = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLUMNS; col++) {
        const pieceIndex = NUM_ROWS - 1 - row;
        const piece = gameState.board[col][pieceIndex] || null;
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-700 border border-blue-800 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-150"
            onClick={() => handleColumnClick(col)}
          >
            {piece && (
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-inner ${
                  piece === 'human' 
                    ? 'bg-amber-400 border-2 border-amber-500' 
                    : 'bg-rose-500 border-2 border-rose-600'
                }`}
              />
            )}
          </div>
        );
      }
    }
    
    return cells;
  };

  const getStatusMessage = (): string => {
    if (!gameState.aiReady && !gameState.aiLoadError) {
      return 'Loading AI...';
    }
    if (gameState.winner === 'human') return '🎉 You Won!';
    if (gameState.winner === 'computer') return 'Computer Won!';
    if (gameState.winner === 'tie') return "It's a Tie!";
    if (gameState.isLoading) return 'Computer is thinking...';
    return 'Your turn — Click a column to play';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Status */}
      <div className="mb-4 text-lg font-medium text-text-primary">
        {getStatusMessage()}
      </div>
      
      {/* AI Status */}
      {gameState.aiLoadError && (
        <div className="mb-4 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
          {gameState.aiLoadError}
        </div>
      )}
      
      {gameState.aiReady && (
        <div className="mb-4 text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          🧠 Neural Network AI Active
        </div>
      )}

      {/* Game Board */}
      <div 
        className="grid gap-0 bg-blue-800 p-2 rounded-lg shadow-lg"
        style={{ gridTemplateColumns: `repeat(${NUM_COLUMNS}, 1fr)` }}
      >
        {renderBoard()}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-6 px-5 py-2 bg-text-primary text-surface-white rounded-full font-medium hover:bg-accent transition-colors duration-150"
      >
        Reset Game
      </button>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500" />
          <span>You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-rose-500 border border-rose-600" />
          <span>Computer</span>
        </div>
      </div>
    </div>
  );
}
