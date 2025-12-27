'use client';

import { useState, useCallback } from 'react';

type Move = 'Rock' | 'Paper' | 'Scissors';
type Result = 'player' | 'computer' | 'tie';
type Strategy = 'Random' | 'Smart';

interface GameLog {
  playerMove: Move;
  computerMove: Move;
  result: Result;
}

function getWinner(playerMove: Move, computerMove: Move): Result {
  if (playerMove === computerMove) return 'tie';
  
  if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    return 'player';
  }
  
  return 'computer';
}

function beatMove(move: Move): Move {
  if (move === 'Rock') return 'Paper';
  if (move === 'Paper') return 'Scissors';
  return 'Rock';
}

function randomMove(): Move {
  const moves: Move[] = ['Rock', 'Paper', 'Scissors'];
  return moves[Math.floor(Math.random() * 3)];
}

function smartStrategy(playerMoves: Move[], patternLength: number): Move | null {
  if (playerMoves.length <= patternLength) return null;
  
  const recentPattern = playerMoves.slice(-patternLength);
  
  for (let i = 0; i <= playerMoves.length - patternLength - 1; i++) {
    const currentPattern = playerMoves.slice(i, i + patternLength);
    
    if (currentPattern.every((move, idx) => move === recentPattern[idx])) {
      // Found a matching pattern, predict next move
      return beatMove(playerMoves[i + patternLength]);
    }
  }
  
  return null;
}

function getComputerMove(playerMoves: Move[], strategy: Strategy): Move {
  if (strategy === 'Random') {
    return randomMove();
  }
  
  // Smart strategy: look for patterns
  let move = smartStrategy(playerMoves, 5);
  if (!move) move = smartStrategy(playerMoves, 4);
  if (!move) move = smartStrategy(playerMoves, 3);
  if (!move) move = smartStrategy(playerMoves, 2);
  if (!move) move = randomMove();
  
  return move;
}

export default function RocksPaperGame() {
  const [strategy, setStrategy] = useState<Strategy>('Random');
  const [playerMoves, setPlayerMoves] = useState<Move[]>([]);
  const [lastPlayerMove, setLastPlayerMove] = useState<Move | null>(null);
  const [lastComputerMove, setLastComputerMove] = useState<Move | null>(null);
  const [scores, setScores] = useState({ player: 0, computer: 0, ties: 0 });
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [showLog, setShowLog] = useState(false);

  const play = useCallback((move: Move) => {
    const computerMove = getComputerMove(playerMoves, strategy);
    const result = getWinner(move, computerMove);
    
    setPlayerMoves(prev => [...prev, move]);
    setLastPlayerMove(move);
    setLastComputerMove(computerMove);
    
    setScores(prev => ({
      player: prev.player + (result === 'player' ? 1 : 0),
      computer: prev.computer + (result === 'computer' ? 1 : 0),
      ties: prev.ties + (result === 'tie' ? 1 : 0),
    }));
    
    setGameLog(prev => [...prev, { playerMove: move, computerMove, result }]);
  }, [playerMoves, strategy]);

  const gamesPlayed = scores.player + scores.computer + scores.ties;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Rock Paper Scissors</h1>
      
      <p className="text-center mb-6">
        Play Rock Paper Scissors against a computer opponent.
      </p>

      <div className="mb-6">
        <label className="mr-2">Strategy:</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value as Strategy)}
          className="border rounded px-3 py-1"
        >
          <option value="Random">Random</option>
          <option value="Smart">Smart</option>
        </select>
      </div>

      {/* Scoreboard */}
      <table className="border mb-6 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Games</th>
            <th className="px-4 py-2 border">Player</th>
            <th className="px-4 py-2 border">Computer</th>
            <th className="px-4 py-2 border">Ties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">{gamesPlayed}</td>
            <td className="px-4 py-2 border font-bold text-green-600">{scores.player}</td>
            <td className="px-4 py-2 border font-bold text-red-600">{scores.computer}</td>
            <td className="px-4 py-2 border">{scores.ties}</td>
          </tr>
        </tbody>
      </table>

      {/* Last moves */}
      {lastPlayerMove && lastComputerMove && (
        <div className="mb-6 text-center">
          <p>Player played: <strong>{lastPlayerMove}</strong></p>
          <p>Computer played: <strong>{lastComputerMove}</strong></p>
        </div>
      )}

      {/* Move buttons */}
      <div className="mb-6">
        <p className="text-center mb-2">Your Move:</p>
        <div className="flex gap-4">
          <button
            onClick={() => play('Rock')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-lg transition-colors"
          >
            🪨 Rock
          </button>
          <button
            onClick={() => play('Paper')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-lg transition-colors"
          >
            📄 Paper
          </button>
          <button
            onClick={() => play('Scissors')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-lg transition-colors"
          >
            ✂️ Scissors
          </button>
        </div>
      </div>

      <hr className="w-full border-t my-4" />

      {/* Game log toggle */}
      <button
        onClick={() => setShowLog(!showLog)}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
      >
        {showLog ? 'Hide' : 'Show'} Game Log
      </button>

      {showLog && gameLog.length > 0 && (
        <div className="mt-4 border rounded p-4 max-h-64 overflow-y-auto">
          <table className="text-sm">
            <thead>
              <tr>
                <th className="px-2">#</th>
                <th className="px-2">Player</th>
                <th className="px-2">Computer</th>
              </tr>
            </thead>
            <tbody>
              {gameLog.map((log, idx) => (
                <tr key={idx}>
                  <td className="px-2">{idx + 1}</td>
                  <td className={`px-2 ${log.result === 'player' ? 'font-bold' : ''}`}>
                    {log.playerMove}
                  </td>
                  <td className={`px-2 ${log.result === 'computer' ? 'font-bold' : ''}`}>
                    {log.computerMove}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

