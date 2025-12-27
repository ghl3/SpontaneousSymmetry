'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const NUM_BALLS = 28;
const WIDTH = 500;
const HEIGHT = 500;

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function createBall(index: number): Ball {
  return {
    x: getRandomInt(20, WIDTH - 20),
    y: 30 + index * 20,
    vx: getRandomFloat(-5, 5),
    vy: getRandomFloat(-5, 5),
    radius: 8,
    color: getRandomColor(),
  };
}

function isTouching(ballA: Ball, ballB: Ball): boolean {
  const dx = ballA.x - ballB.x;
  const dy = ballA.y - ballB.y;
  const distSq = dx * dx + dy * dy;
  const radiusSum = ballA.radius + ballB.radius;
  return distSq <= radiusSum * radiusSum;
}

function bounceBoundary(ball: Ball): void {
  if (ball.x + ball.radius + ball.vx > WIDTH || ball.x - ball.radius + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  if (ball.y + ball.radius + ball.vy > HEIGHT || ball.y - ball.radius + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
}

function bounceBalls(ballA: Ball, ballB: Ball): void {
  if (!isTouching(ballA, ballB)) return;

  const dx = ballA.x - ballB.x;
  const dy = ballA.y - ballB.y;
  const magV = dx * dx + dy * dy;
  const expV = (2 * dx * dy) / magV;
  const termV = (2 * dx * dx) / magV;

  // Velocity in CM frame
  const vxCM = (ballA.vx + ballB.vx) / 2;
  const vyCM = (ballA.vy + ballB.vy) / 2;

  let vx1CM = ballA.vx - vxCM;
  let vy1CM = ballA.vy - vyCM;
  let vx2CM = ballB.vx - vxCM;
  let vy2CM = ballB.vy - vyCM;

  // Apply collision transformation
  const newVx1CM = (1 - termV) * vx1CM + expV * vy1CM;
  const newVy1CM = expV * vx1CM + (termV - 1) * vy1CM;
  const newVx2CM = (1 - termV) * vx2CM + expV * vy2CM;
  const newVy2CM = expV * vx2CM + (termV - 1) * vy2CM;

  ballA.vx = newVx1CM + vxCM;
  ballA.vy = newVy1CM + vyCM;
  ballB.vx = newVx2CM + vxCM;
  ballB.vy = newVy2CM + vyCM;
}

export default function BouncingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const initBalls = useCallback(() => {
    ballsRef.current = Array.from({ length: NUM_BALLS }, (_, i) => createBall(i));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const balls = ballsRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

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

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    }

    if (isRunning) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [isRunning]);

  useEffect(() => {
    initBalls();
    // Draw initial state
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        for (const ball of ballsRef.current) {
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ball.color;
          ctx.fill();
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }, [initBalls]);

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

  const toggleLoop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    initBalls();
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (const ball of ballsRef.current) {
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ball.color;
          ctx.fill();
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Bouncing Balls</h1>
      
      <p className="text-center mb-6">
        A simple JavaScript program demonstrating animation<br />
        and basic physics simulation.
      </p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleLoop}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          Reset
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border-2 border-black"
      />
    </div>
  );
}


