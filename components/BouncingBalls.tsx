'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const DEFAULT_NUM_BALLS = 25;
const DEFAULT_ENERGY = 200; // Joules
const WIDTH = 500;
const HEIGHT = 500;
const MASS = 1; // 1 kg per ball

// Beautiful color palette for balls
const BALL_COLORS = [
  '#FF6B6B', // coral red
  '#4ECDC4', // teal
  '#45B7D1', // sky blue
  '#96CEB4', // sage green
  '#FFEAA7', // soft yellow
  '#DDA0DD', // plum
  '#98D8C8', // mint
  '#F7DC6F', // golden
  '#BB8FCE', // lavender
  '#85C1E9', // light blue
  '#F8B500', // amber
  '#00CED1', // dark cyan
  '#FF7F50', // coral
  '#9FE2BF', // seafoam
  '#DE3163', // cerise
];

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  flash: number; // 0-1, fades out after collision
}

interface Stats {
  totalEnergy: number;
  momentumX: number;
  momentumY: number;
  avgSpeed: number;
  stdSpeed: number;
  maxSpeed: number;
  minSpeed: number;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomColor(): string {
  return BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)];
}

function createBall(index: number, numBalls: number, vx: number, vy: number): Ball {
  const spacing = Math.min(16, (HEIGHT - 40) / numBalls);
  return {
    x: getRandomInt(20, WIDTH - 20),
    y: 20 + index * spacing,
    vx,
    vy,
    radius: 8,
    color: getRandomColor(),
    flash: 0,
  };
}

function createBallsWithZeroMomentum(numBalls: number, targetEnergy: number): Ball[] {
  const velocities: { vx: number; vy: number }[] = [];
  let totalVx = 0;
  let totalVy = 0;
  
  for (let i = 0; i < numBalls; i++) {
    const vx = getRandomFloat(-5, 5);
    const vy = getRandomFloat(-5, 5);
    velocities.push({ vx, vy });
    totalVx += vx;
    totalVy += vy;
  }
  
  const avgVx = totalVx / numBalls;
  const avgVy = totalVy / numBalls;
  
  for (const v of velocities) {
    v.vx -= avgVx;
    v.vy -= avgVy;
  }
  
  let currentEnergy = 0;
  for (const v of velocities) {
    currentEnergy += 0.5 * MASS * (v.vx * v.vx + v.vy * v.vy);
  }
  
  const scale = currentEnergy > 0 ? Math.sqrt(targetEnergy / currentEnergy) : 1;
  
  return velocities.map((v, i) => createBall(i, numBalls, v.vx * scale, v.vy * scale));
}

function bounceBoundary(ball: Ball): void {
  if (ball.x + ball.radius > WIDTH) {
    ball.x = WIDTH - ball.radius;
    ball.vx = -Math.abs(ball.vx);
  }
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx = Math.abs(ball.vx);
  }
  if (ball.y + ball.radius > HEIGHT) {
    ball.y = HEIGHT - ball.radius;
    ball.vy = -Math.abs(ball.vy);
  }
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy = Math.abs(ball.vy);
  }
}

function bounceBalls(ballA: Ball, ballB: Ball): boolean {
  const dx = ballA.x - ballB.x;
  const dy = ballA.y - ballB.y;
  const distSq = dx * dx + dy * dy;
  const radiusSum = ballA.radius + ballB.radius;
  
  if (distSq >= radiusSum * radiusSum || distSq === 0) return false;
  
  const dist = Math.sqrt(distSq);
  const nx = dx / dist;
  const ny = dy / dist;
  
  const overlap = radiusSum - dist;
  const separationX = (overlap / 2 + 0.1) * nx;
  const separationY = (overlap / 2 + 0.1) * ny;
  ballA.x += separationX;
  ballA.y += separationY;
  ballB.x -= separationX;
  ballB.y -= separationY;
  
  const dvx = ballA.vx - ballB.vx;
  const dvy = ballA.vy - ballB.vy;
  const dvn = dvx * nx + dvy * ny;
  
  if (dvn > 0) return false;
  
  ballA.vx -= dvn * nx;
  ballA.vy -= dvn * ny;
  ballB.vx += dvn * nx;
  ballB.vy += dvn * ny;
  
  // Flash both balls on collision
  ballA.flash = 1;
  ballB.flash = 1;
  
  return true;
}

function calculateStats(balls: Ball[]): Stats {
  if (balls.length === 0) {
    return {
      totalEnergy: 0, momentumX: 0, momentumY: 0,
      avgSpeed: 0, stdSpeed: 0, maxSpeed: 0, minSpeed: 0,
    };
  }
  
  let totalEnergy = 0;
  let momentumX = 0;
  let momentumY = 0;
  const speeds: number[] = [];
  
  for (const ball of balls) {
    const speedSq = ball.vx * ball.vx + ball.vy * ball.vy;
    const speed = Math.sqrt(speedSq);
    totalEnergy += 0.5 * MASS * speedSq;
    momentumX += MASS * ball.vx;
    momentumY += MASS * ball.vy;
    speeds.push(speed);
  }
  
  const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
  const variance = speeds.reduce((sum, s) => sum + (s - avgSpeed) ** 2, 0) / speeds.length;
  
  return {
    totalEnergy,
    momentumX,
    momentumY,
    avgSpeed,
    stdSpeed: Math.sqrt(variance),
    maxSpeed: Math.max(...speeds),
    minSpeed: Math.min(...speeds),
  };
}

function formatNumber(n: number, decimals: number = 2): string {
  return n.toFixed(decimals);
}

export default function BouncingBalls(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [numBalls, setNumBalls] = useState(DEFAULT_NUM_BALLS);
  const [energyLevel, setEnergyLevel] = useState(DEFAULT_ENERGY);

  const initBalls = useCallback(() => {
    ballsRef.current = createBallsWithZeroMomentum(numBalls, energyLevel);
    setStats(calculateStats(ballsRef.current));
  }, [numBalls, energyLevel]);

  const drawBalls = useCallback((ctx: CanvasRenderingContext2D) => {
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Draw solid box boundary (like a physical container)
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, WIDTH - 4, HEIGHT - 4);
    
    // Draw balls
    for (const ball of ballsRef.current) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      
      // Mix in white based on flash value for subtle brightening
      if (ball.flash > 0) {
        // Create a brighter version by mixing with white
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ball.flash * 0.5})`;
        ctx.fill();
      } else {
        ctx.fillStyle = ball.color;
        ctx.fill();
      }
      
      // Border
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const balls = ballsRef.current;

    // Fade flash values
    for (const ball of balls) {
      if (ball.flash > 0) {
        ball.flash = Math.max(0, ball.flash - 0.15);
      }
    }

    // Handle ball-ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        bounceBalls(balls[i], balls[j]);
      }
    }

    // Handle boundary collisions and move
    for (const ball of balls) {
      bounceBoundary(ball);
      ball.x += ball.vx;
      ball.y += ball.vy;
    }

    // Draw
    drawBalls(ctx);

    // Update stats
    setStats(calculateStats(balls));

    if (isRunning) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [isRunning, drawBalls]);

  useEffect(() => {
    initBalls();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawBalls(ctx);
      }
    }
  }, [initBalls, drawBalls]);

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(draw);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, draw]);

  const toggleLoop = (): void => {
    setIsRunning(!isRunning);
  };

  const reset = (): void => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    initBalls();
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawBalls(ctx);
      }
    }
  };

  const handleNumBallsChange = (value: number): void => {
    setNumBalls(value);
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleEnergyChange = (value: number): void => {
    setEnergyLevel(value);
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Description */}
      <p className="text-center text-text-secondary mb-6 max-w-md">
        Elastic collision simulation with momentum and energy conservation.
      </p>

      {/* Sliders */}
      <div className="w-full max-w-md mb-6 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        {/* Number of Balls Slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-slate-600 font-medium">Particles</label>
            <span className="text-slate-800 font-mono font-bold bg-white px-2 py-0.5 rounded">{numBalls}</span>
          </div>
          <input
            type="range"
            min="2"
            max="50"
            value={numBalls}
            onChange={(e) => handleNumBallsChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        {/* Energy Slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-slate-600 font-medium">Total Energy</label>
            <span className="text-slate-800 font-mono font-bold bg-white px-2 py-0.5 rounded">{energyLevel} J</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={energyLevel}
            onChange={(e) => handleEnergyChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={toggleLoop}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-150 shadow-md ${
            isRunning 
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200' 
              : 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-200'
          }`}
        >
          {isRunning ? '⏹ Stop' : '▶ Start'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-white border-2 border-slate-200 rounded-full font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
        >
          ↺ Reset
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="rounded shadow-sm"
      />

      {/* Stats Table */}
      {stats && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-sm font-semibold text-slate-500 mb-3 text-center uppercase tracking-wide">
            Live Statistics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
              <div className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Energy</div>
              <div className="text-lg font-bold text-slate-700 font-mono">{formatNumber(stats.totalEnergy, 1)} <span className="text-xs font-normal">J</span></div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
              <div className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Momentum</div>
              <div className="text-lg font-bold text-slate-700 font-mono text-sm">({formatNumber(stats.momentumX, 1)}, {formatNumber(stats.momentumY, 1)})</div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
              <div className="text-teal-500 text-xs font-medium uppercase tracking-wide mb-1">Avg Speed</div>
              <div className="text-lg font-bold text-teal-700 font-mono">{formatNumber(stats.avgSpeed)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
              <div className="text-amber-500 text-xs font-medium uppercase tracking-wide mb-1">Std Dev</div>
              <div className="text-lg font-bold text-amber-700 font-mono">{formatNumber(stats.stdSpeed)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-3 border border-sky-200">
              <div className="text-sky-500 text-xs font-medium uppercase tracking-wide mb-1">Min Speed</div>
              <div className="text-lg font-bold text-sky-700 font-mono">{formatNumber(stats.minSpeed)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-3 border border-rose-200">
              <div className="text-rose-500 text-xs font-medium uppercase tracking-wide mb-1">Max Speed</div>
              <div className="text-lg font-bold text-rose-700 font-mono">{formatNumber(stats.maxSpeed)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
