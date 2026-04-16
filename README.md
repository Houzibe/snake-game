# Snake Game

A classic snake game built with vanilla JavaScript, HTML, and CSS. Navigate your snake around the grid, eat food to grow longer, and avoid obstacles and walls!

## Features

- 🐍 **Classic Gameplay**: Control the snake with arrow keys to eat food and grow
- ⚠️ **Obstacles**: Navigate around randomly placed diamond-shaped obstacles
- 📊 **Score Tracking**: Track your score as you eat more food
- 🎮 **Responsive Controls**: Smooth arrow key controls with built-in collision detection
- 🎨 **Clean UI**: Simple, retro-style visuals with a dark theme

## How to Play

1. Open `snake.html` in your web browser
2. Use **arrow keys** to control the snake direction:
   - `↑` Arrow Up - Move up
   - `↓` Arrow Down - Move down
   - `←` Arrow Left - Move left
   - `→` Arrow Right - Move right
3. Eat the **red food** to grow and increase your score
4. Avoid **yellow diamond obstacles**, **walls**, and **yourself**
5. Press **Enter** after game over to restart

## Game Rules

- The snake continuously moves in the current direction
- Each food eaten adds 1 point to your score and makes the snake grow by one segment
- The game ends if the snake:
  - Hits a wall (boundary of the grid)
  - Collides with an obstacle
  - Hits its own body
- A new set of obstacles is generated for each game

## Project Structure

```
snake-game/
├── snake.html    # HTML structure and canvas element
├── snake.css     # Styling and layout
├── snake.js      # Game logic and mechanics
└── README.md     # This file
```

## Technical Details

### Technologies Used
- **HTML5 Canvas**: For rendering the game
- **Vanilla JavaScript**: Pure JS with no dependencies
- **CSS3**: Flexbox layout and styling

### Game Configuration

You can customize these values in `snake.js`:

- `gridSize`: Size of each grid cell (default: 20px)
- `obstacleCount`: Number of obstacles per game (default: 5)
- `gameLoop timeout`: Frame rate (default: 400ms)

Example:
```javascript
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const obstacleCount = 5; // in generateObstacles()
setTimeout(gameLoop, 400); // Frame timing
```

## Game States

### Active Game
- Snake is green
- Food is red
- Obstacles are yellow diamonds
- Score updates in the top-left corner

### Game Over
- Game pauses
- "Game Over" message appears
- Instructions to press Enter to restart

## Installation

No installation required! Simply clone the repository and open `snake.html` in any modern web browser.

```bash
git clone <repository-url>
cd snake-game
# Open snake.html in your browser
```

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript (arrow functions, const/let, template literals)
- CSS3 Flexbox

## Performance

The game runs at approximately **2.5 frames per second** (400ms per frame) for a balanced difficulty level. Adjust the timeout value in the `gameLoop()` function to increase or decrease speed.

## Future Enhancements

Potential improvements for future versions:
- [ ] Difficulty levels (progressive speed increase)
- [ ] High score persistence (localStorage)
- [ ] Power-ups (speed boost, invincibility)
- [ ] Multiple game modes
- [ ] Sound effects
- [ ] Mobile touch controls

## License

MIT License - Feel free to use this project for personal or educational purposes.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Enjoy!

Have fun playing! Share your high scores and let us know if you have any suggestions for improvements.
