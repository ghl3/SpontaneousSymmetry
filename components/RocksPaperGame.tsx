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

export default function RocksPaperGame(): JSX.Element {
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
      {/* Strategy Selector */}
      <div className="mb-6 flex items-center gap-3">
        <label className="text-text-secondary text-sm font-medium">Strategy:</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value as Strategy)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-surface-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150"
        >
          <option value="Random">Random</option>
          <option value="Smart">Smart (Pattern Matching)</option>
        </select>
      </div>

      {/* Scoreboard */}
      <div className="w-full max-w-md mb-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-surface">
              <th className="px-4 py-2.5 text-sm font-medium text-text-secondary border-b border-border">Games</th>
              <th className="px-4 py-2.5 text-sm font-medium text-text-secondary border-b border-border">You</th>
              <th className="px-4 py-2.5 text-sm font-medium text-text-secondary border-b border-border">Computer</th>
              <th className="px-4 py-2.5 text-sm font-medium text-text-secondary border-b border-border">Ties</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-surface-white">
              <td className="px-4 py-3 text-text-primary">{gamesPlayed}</td>
              <td className="px-4 py-3 font-semibold text-emerald-600">{scores.player}</td>
              <td className="px-4 py-3 font-semibold text-rose-600">{scores.computer}</td>
              <td className="px-4 py-3 text-text-secondary">{scores.ties}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Last Moves */}
      {lastPlayerMove && lastComputerMove && (
        <div className="mb-6 text-center p-4 bg-surface rounded-lg border border-border">
          <div className="flex justify-center gap-8">
            <div>
              <span className="text-sm text-text-secondary block mb-1">You played</span>
              <span className="text-lg font-semibold text-text-primary">{lastPlayerMove}</span>
            </div>
            <div className="w-px bg-border" />
            <div>
              <span className="text-sm text-text-secondary block mb-1">Computer played</span>
              <span className="text-lg font-semibold text-text-primary">{lastComputerMove}</span>
            </div>
          </div>
        </div>
      )}

      {/* Move Buttons */}
      <div className="mb-6">
        <p className="text-center text-sm text-text-secondary mb-3">Choose your move:</p>
        <div className="flex gap-3">
          <button
            onClick={() => play('Rock')}
            className="px-5 py-3 bg-surface-white border border-border rounded-lg font-medium text-text-primary hover:border-accent hover:shadow-sm transition-all duration-150"
          >
            🪨 Rock
          </button>
          <button
            onClick={() => play('Paper')}
            className="px-5 py-3 bg-surface-white border border-border rounded-lg font-medium text-text-primary hover:border-accent hover:shadow-sm transition-all duration-150"
          >
            📄 Paper
          </button>
          <button
            onClick={() => play('Scissors')}
            className="px-5 py-3 bg-surface-white border border-border rounded-lg font-medium text-text-primary hover:border-accent hover:shadow-sm transition-all duration-150"
          >
            ✂️ Scissors
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border my-4" />

      {/* Game Log Toggle */}
      <button
        onClick={() => setShowLog(!showLog)}
        className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
      >
        {showLog ? 'Hide' : 'Show'} Game Log
      </button>

      {showLog && gameLog.length > 0 && (
        <div className="mt-4 w-full max-w-md border border-border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-text-secondary font-medium">#</th>
                <th className="px-3 py-2 text-left text-text-secondary font-medium">You</th>
                <th className="px-3 py-2 text-left text-text-secondary font-medium">Computer</th>
              </tr>
            </thead>
            <tbody>
              {gameLog.map((log, idx) => (
                <tr key={idx} className="border-t border-border-light">
                  <td className="px-3 py-2 text-text-muted">{idx + 1}</td>
                  <td className={`px-3 py-2 ${log.result === 'player' ? 'font-semibold text-emerald-600' : 'text-text-primary'}`}>
                    {log.playerMove}
                  </td>
                  <td className={`px-3 py-2 ${log.result === 'computer' ? 'font-semibold text-rose-600' : 'text-text-primary'}`}>
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
