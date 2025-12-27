$(document).ready(function() {
  $("div#showcode").hide();
});

$(document).ready(function() {
  $("button#showcodebutton").click(function() {
    $("div#showcode").toggle("fast");
  });
});

// Circle Drawing
function drawCircle(x, y, r, color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// declare the ball class
function ball(radius, color) {
  this.x = 0;
  this.y = 0;

  this.vx = 0;
  this.vy = 0;

  this.radius = radius;
  this.color = color;
}

ball.prototype.Draw = function() {
  drawCircle(this.x, this.y, this.radius, this.color);
};

ball.prototype.Move = function() {
  this.x += this.vx;
  this.y += this.vy;
};

ball.prototype.MagV = function() {
  return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
};

ball.prototype.CosThetaV = function(OtherBall) {
  var CosTheta =
    (this.vx * OtherBall.vx + this.vy * OtherBall.vy) /
    (this.MagV() * OtherBall.MagV());
};

ball.prototype.BounceBoundary = function(WIDTH, HEIGHT) {
  if (
    this.x + this.radius + this.vx > WIDTH ||
    this.x - this.radius + this.vx < 0
  )
    this.vx = -this.vx;
  if (
    this.y + this.radius + this.vy > HEIGHT ||
    this.y - this.radius + this.vy < 0
  )
    this.vy = -this.vy;
  if (this.x + this.radius > WIDTH || this.x - this.radius < 0)
    this.vx = -this.vx;
  if (this.y + this.radius > HEIGHT || this.y - this.radius < 0)
    this.vy = -this.vy;
};

ball.prototype.BounceBall = function(OtherBall) {
  if (isTouching(this, OtherBall)) {
    // Remove the case when the velocities aren't
    // toward one another:
    //	if( this.CosThetaV( OtherBall ) > 0 ) return;

    var dx = this.x - OtherBall.x;
    var dy = this.y - OtherBall.y;

    var MagV = dx * dx + dy * dy;
    var ExpV = (2 * dx * dy) / MagV;
    var TermV = (2 * dx * dx) / MagV;

    // Velocity of CM frame
    var vxCM_frame = (this.vx + OtherBall.vx) / 2;
    var vyCM_frame = (this.vy + OtherBall.vy) / 2;

    var vx1CM = this.vx - vxCM_frame;
    var vy1CM = this.vy - vyCM_frame;

    var vx2CM = OtherBall.vx - vxCM_frame;
    var vy2CM = OtherBall.vy - vyCM_frame;

    vx1CM = (1 - TermV) * vx1CM + ExpV * vy1CM;
    vy1CM = ExpV * vx1CM + (TermV - 1) * vy1CM;

    vx2CM = (1 - TermV) * vx2CM + ExpV * vy2CM;
    vy2CM = ExpV * vx2CM + (TermV - 1) * vy2CM;

    this.vx = vx1CM + vxCM_frame;
    this.vy = vy1CM + vyCM_frame;

    OtherBall.vx = vx2CM + vxCM_frame;
    OtherBall.vy = vy2CM + vyCM_frame;
  }

  return this;
};

function isTouching(ballA, ballB) {
  var deltaX = ballA.x - ballB.x;
  var deltaY = ballA.y - ballB.y;

  var dr2 = deltaX * deltaX + deltaY * deltaY;

  var radiusDiff = ballA.radius + ballB.radius;

  if (dr2 <= radiusDiff * radiusDiff) return true;
  return false;
}

var numBalls = 28;
var ballCollection = new Array(numBalls);

var WIDTH;
var HEIGHT;
var DELTAT = 10;
var ctx;

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
  var canvas = document.getElementById("canvas");
  if (!canvas.getContext) {
    return;
  }
  ctx = canvas.getContext("2d");

  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  draw();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function InitialState() {
  // Make the initial positions of the balls
  for (var itr = 0; itr < ballCollection.length; ++itr) {
    var ColorString = "#" + Math.floor(Math.random() * 16777215).toString(16);
    ballCollection[itr] = new ball(8, ColorString);

    ballCollection[itr].x = getRandomInt(20, 500); //20 + itr*20;
    ballCollection[itr].y = 30 + itr * 20;

    ballCollection[itr].vx = getRandomArbitrary(-5, 5); //0 + itr/3;
    ballCollection[itr].vy = getRandomArbitrary(-5, 5); //1 + itr/4;
  }
}

function draw() {
  clear();

  var itr = 0;

  for (itr = 0; itr < numBalls; itr++) {
    for (oitr = 0; oitr < numBalls; ++oitr) {
      // Go through half the balls:
      if (oitr >= itr) continue;
      ballCollection[itr].BounceBall(ballCollection[oitr]);
    }
  }

  for (itr = 0; itr < numBalls; itr++) {
    ballCollection[itr].BounceBoundary(WIDTH, HEIGHT);
  }

  for (itr = 0; itr < numBalls; itr++) {
    // Advance in Space
    ballCollection[itr].Move();
    // Redraw
    ballCollection[itr].Draw();
  }
}

var Loop = null;
var IsLoopStopped = true;

function toggle_loop() {
  /*
    if(Loop==null){
	Loop = (draw, DELTAT);
	IsLoopStopped=true;
    }
*/

  if (IsLoopStopped) {
    // Restart the loop
    Loop = setInterval(draw, 10);
    IsLoopStopped = false;
  } else {
    // Stop the loop
    clearInterval(Loop);
    IsLoopStopped = true;
  }
}

$(document).ready(function() {
  // Start
  InitialState();
  init();
});
