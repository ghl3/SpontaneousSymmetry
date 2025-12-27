'use client';

import { useState, useCallback, useEffect } from 'react';

type Move = 'Rock' | 'Paper' | 'Scissors';
type Result = 'player' | 'computer' | 'tie';
type Strategy = 'Random' | 'Smart';

interface GameLog {
  playerMove: Move;
  computerMove: Move;
  result: Result;
}

interface RoundState {
  phase: 'idle' | 'revealing' | 'result';
  playerMove: Move | null;
  computerMove: Move | null;
  result: Result | null;
}

const MOVE_ICONS: Record<Move, string> = {
  Rock: '🪨',
  Paper: '📄',
  Scissors: '✂️',
};

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

// Result Display Component
function ResultDisplay({ round }: { round: RoundState }): JSX.Element | null {
  if (round.phase === 'idle') return null;
  
  const isRevealing = round.phase === 'revealing';
  
  return (
    <div className="mb-6 p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
      <div className="flex items-center justify-center gap-6">
        {/* Player Move */}
        <div className="text-center">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2">You</span>
          <div className="w-16 h-16 rounded-xl bg-white border-2 border-amber-400 flex items-center justify-center text-3xl shadow-sm">
            {round.playerMove && MOVE_ICONS[round.playerMove]}
          </div>
          <span className="text-sm font-medium text-slate-700 mt-2 block">{round.playerMove}</span>
        </div>
        
        {/* VS */}
        <div className="text-slate-400 font-bold text-lg">vs</div>
        
        {/* Computer Move */}
        <div className="text-center">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2">Computer</span>
          <div className={`w-16 h-16 rounded-xl bg-white border-2 flex items-center justify-center text-3xl shadow-sm transition-all duration-200 ${
            isRevealing ? 'border-slate-300 animate-pulse' : 'border-rose-400'
          }`}>
            {isRevealing ? '?' : round.computerMove && MOVE_ICONS[round.computerMove]}
          </div>
          <span className="text-sm font-medium text-slate-700 mt-2 block">
            {isRevealing ? '...' : round.computerMove}
          </span>
        </div>
      </div>
      
      {/* Result Banner */}
      {round.phase === 'result' && round.result && (
        <div className={`mt-4 py-2 px-4 rounded-lg text-center font-semibold ${
          round.result === 'player' 
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
            : round.result === 'computer'
              ? 'bg-rose-100 text-rose-700 border border-rose-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {round.result === 'player' ? '🎉 You Win!' : round.result === 'computer' ? 'Computer Wins' : "It's a Tie"}
        </div>
      )}
    </div>
  );
}

export default function RocksPaperGame(): JSX.Element {
  const [strategy, setStrategy] = useState<Strategy>('Random');
  const [playerMoves, setPlayerMoves] = useState<Move[]>([]);
  const [scores, setScores] = useState({ player: 0, computer: 0, ties: 0 });
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [showLog, setShowLog] = useState(false);
  const [round, setRound] = useState<RoundState>({
    phase: 'idle',
    playerMove: null,
    computerMove: null,
    result: null,
  });

  // Handle reveal animation
  useEffect(() => {
    if (round.phase === 'revealing') {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(playerMoves, strategy);
        const result = getWinner(round.playerMove!, computerMove);
        
        setPlayerMoves(prev => [...prev, round.playerMove!]);
        setScores(prev => ({
          player: prev.player + (result === 'player' ? 1 : 0),
          computer: prev.computer + (result === 'computer' ? 1 : 0),
          ties: prev.ties + (result === 'tie' ? 1 : 0),
        }));
        setGameLog(prev => [...prev, { playerMove: round.playerMove!, computerMove, result }]);
        
        setRound({
          phase: 'result',
          playerMove: round.playerMove,
          computerMove,
          result,
        });
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [round.phase, round.playerMove, playerMoves, strategy]);

  const play = useCallback((move: Move) => {
    setRound({
      phase: 'revealing',
      playerMove: move,
      computerMove: null,
      result: null,
    });
  }, []);

  const gamesPlayed = scores.player + scores.computer + scores.ties;
  const winRate = gamesPlayed > 0 ? Math.round((scores.player / gamesPlayed) * 100) : 0;

  return (
    <div className="flex flex-col items-center">
      {/* Strategy Selector */}
      <div className="mb-6">
        <label className="text-text-secondary text-xs font-medium uppercase tracking-wide block text-center mb-2">
          Computer Strategy
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setStrategy('Random')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
              strategy === 'Random'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            🎲 Random
          </button>
          <button
            onClick={() => setStrategy('Smart')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
              strategy === 'Smart'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            🧠 Pattern Matching
          </button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="w-full max-w-md mb-6">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-2xl font-bold text-slate-700">{gamesPlayed}</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Games</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">{scores.player}</div>
            <div className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Wins</div>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
            <div className="text-2xl font-bold text-rose-600">{scores.computer}</div>
            <div className="text-xs text-rose-600 font-medium uppercase tracking-wide">Losses</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-2xl font-bold text-slate-500">{scores.ties}</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Ties</div>
          </div>
        </div>
        
        {/* Win Rate Bar */}
        {gamesPlayed > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Win Rate</span>
              <span className="font-medium">{winRate}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Move Buttons */}
      <div className="mb-6">
        <p className="text-center text-sm text-text-secondary mb-3">Choose your move:</p>
        <div className="flex gap-3">
          {(['Rock', 'Paper', 'Scissors'] as Move[]).map((move) => (
            <button
              key={move}
              onClick={() => play(move)}
              disabled={round.phase === 'revealing'}
              className={`
                group px-5 py-4 bg-white border-2 rounded-xl font-medium text-text-primary 
                transition-all duration-150 
                hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5
                active:translate-y-0 active:shadow-sm
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
              `}
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform duration-150">
                {MOVE_ICONS[move]}
              </span>
              <span className="text-sm">{move}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay round={round} />

      {/* Divider */}
      <div className="w-full h-px bg-border my-4" />

      {/* Game Log Toggle */}
      <button
        onClick={() => setShowLog(!showLog)}
        className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center gap-2"
      >
        <span>{showLog ? '▼' : '▶'}</span>
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
                <th className="px-3 py-2 text-left text-text-secondary font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {[...gameLog].reverse().map((log, idx) => (
                <tr key={gameLog.length - 1 - idx} className="border-t border-border-light">
                  <td className="px-3 py-2 text-text-muted">{gameLog.length - idx}</td>
                  <td className="px-3 py-2 text-text-primary">
                    {MOVE_ICONS[log.playerMove]} {log.playerMove}
                  </td>
                  <td className="px-3 py-2 text-text-primary">
                    {MOVE_ICONS[log.computerMove]} {log.computerMove}
                  </td>
                  <td className={`px-3 py-2 font-medium ${
                    log.result === 'player' ? 'text-emerald-600' : log.result === 'computer' ? 'text-rose-600' : 'text-slate-500'
                  }`}>
                    {log.result === 'player' ? 'Win' : log.result === 'computer' ? 'Loss' : 'Tie'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showLog && gameLog.length === 0 && (
        <div className="mt-4 text-sm text-text-muted">
          No games played yet
        </div>
      )}
    </div>
  );
}
