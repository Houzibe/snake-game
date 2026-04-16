// Grab DOM references for the game canvas and score display.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

// The size of each grid cell and how many cells fit in the canvas.
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state variables.
let snake = [{ x: 10, y: 10 }]; // Start with a short snake in the center.
let velocity = { x: 0, y: 0 }; // Current snake direction.
let food = { x: 5, y: 5 }; // Food position on the grid.
let obstacles = []; // Obstacles on the grid.
let score = 0; // Current score.
let gameOver = false; // Game-over flag.

// Reset the game state to start a new round.
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 1, y: 0 }; // Start moving right.
  food = randomFoodPosition();
  obstacles = generateObstacles();
  score = 0;
  gameOver = false;
  scoreEl.textContent = score;
}

// Create a random position for the food inside the grid.
function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

// Generate random obstacles on the grid.
function generateObstacles() {
  const obstacleList = [];
  const obstacleCount = 5; // Number of obstacles.
  
  while (obstacleList.length < obstacleCount) {
    const obstacle = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    
    // Make sure obstacle is not on the snake, food, or another obstacle.
    const isValid = !snake.some(seg => seg.x === obstacle.x && seg.y === obstacle.y) &&
                    food.x !== obstacle.x && food.y !== obstacle.y &&
                    !obstacleList.some(obs => obs.x === obstacle.x && obs.y === obstacle.y);
    
    if (isValid) {
      obstacleList.push(obstacle);
    }
  }
  
  return obstacleList;
}

// Draw the entire game state on the canvas.
function draw() {
  if (gameOver) {
    // Show the game over screen.
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('Press Enter to restart', canvas.width / 2, canvas.height / 2 + 20);
    return;
  }

  // Draw the black background.
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake.
  ctx.fillStyle = '#0f0';
  for (const segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  }

  // Draw the food.
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  // Draw obstacles as diamonds.
  ctx.fillStyle = '#ffff00';
  for (const obstacle of obstacles) {
    const centerX = obstacle.x * gridSize + gridSize / 2;
    const centerY = obstacle.y * gridSize + gridSize / 2;
    const radius = (gridSize - 2) / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius); // Top
    ctx.lineTo(centerX + radius, centerY); // Right
    ctx.lineTo(centerX, centerY + radius); // Bottom
    ctx.lineTo(centerX - radius, centerY); // Left
    ctx.closePath();
    ctx.fill();
  }
}

// Update the game state before the next frame.
function update() {
  if (gameOver) return;

  // Calculate new head position based on current direction.
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // Check for wall collisions.
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver = true;
  }

  // Check for self-collision.
  for (const segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      gameOver = true;
    }
  }

  // Check for obstacle collision.
  for (const obstacle of obstacles) {
    if (obstacle.x === head.x && obstacle.y === head.y) {
      gameOver = true;
    }
  }

  // Add the new head to the snake body.
  snake.unshift(head);

  // If the snake ate food, increase score and place new food.
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreEl.textContent = score;
    food = randomFoodPosition();

    // Make sure food does not spawn on top of the snake.
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      food = randomFoodPosition();
    }
  } else {
    // Remove the tail segment to keep the snake the same length.
    snake.pop();
  }
}

// Main game loop: update state, draw frame, and schedule next tick.
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 400); // 400ms between frames for a slower snake.
}

// Handle keyboard input to change snake direction.
window.addEventListener('keydown', (event) => {
  const { key } = event;

  if (key === 'ArrowUp' && velocity.y !== 1) {
    velocity = { x: 0, y: -1 };
  } else if (key === 'ArrowDown' && velocity.y !== -1) {
    velocity = { x: 0, y: 1 };
  } else if (key === 'ArrowLeft' && velocity.x !== 1) {
    velocity = { x: -1, y: 0 };
  } else if (key === 'ArrowRight' && velocity.x !== -1) {
    velocity = { x: 1, y: 0 };
  } else if (key === 'Enter' && gameOver) {
    resetGame();
  }
});

// Start the game.
resetGame();
gameLoop();
