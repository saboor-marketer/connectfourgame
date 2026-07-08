# Connect Four Game

A fully-featured Connect Four game built with HTML, CSS, and JavaScript. Play against a friend or challenge the computer opponent!

## Features

### Core Gameplay
- **Two-Player Mode**: Play against a friend on the same device with alternating turns
- **Computer Opponent**: Challenge an AI opponent with basic strategy
- **Win Detection**: Automatic detection of wins (horizontal, vertical, and diagonal)
- **Draw Detection**: Recognizes when the board is full with no winner

### User Experience
- **Game Rules**: Built-in rules modal explaining how to play
- **Responsive Design**: Optimized layout for desktop, tablet, and mobile devices
- **Animations**: Smooth disc drop animations and winning cell highlights
- **Accessibility**: Full keyboard support and ARIA labels for screen readers

### Visual Design
- Modern gradient background
- Clean, intuitive interface
- Hover and focus states on all interactive elements
- Color-coded players (Red vs Yellow)
- Winning cells pulse animation

## How to Play

### Objective
Be the first player to connect four of your colored discs in a row (horizontally, vertically, or diagonally).

### Controls
- **Mouse**: Click on any column to drop your disc
- **Keyboard**: 
  - Tab to navigate between columns
  - Enter or Space to drop a disc in the selected column
  - Escape to close the rules modal

### Game Modes
1. **2 Players**: Take turns with a friend on the same device
2. **vs Computer**: Play against an AI opponent that:
   - Tries to win if possible
   - Blocks your winning moves
   - Prefers the center column for strategic advantage
   - Makes random moves when no strategic move is available

## File Structure

```
connect-four-game/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Game logic and interactivity
└── README.md       # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start playing!

No build process or dependencies required - just open and play!

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- CSS Animations
- ES6 JavaScript
- Flexbox

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technical Details

### Game Logic
- Board size: 6 rows × 7 columns (standard Connect Four)
- Win condition: 4 consecutive discs in any direction
- AI uses a simple heuristic algorithm for move selection

### Code Architecture
- Object-oriented JavaScript with a `ConnectFour` class
- Separation of concerns (HTML structure, CSS styling, JS logic)
- Event-driven architecture for user interactions
- Accessibility-first approach with semantic HTML and ARIA attributes

## Customization

You can easily customize the game by modifying:
- **Colors**: Edit CSS variables in `styles.css` (e.g., `--player1-color`, `--player2-color`)
- **Board Size**: Modify `this.rows` and `this.cols` in `script.js`
- **AI Difficulty**: Enhance the `getBestMove()` method in `script.js`

## Future Enhancements

Potential improvements for future versions:
- Multiple difficulty levels for computer opponent
- Score tracking across multiple games
- Sound effects for moves and wins
- Undo move functionality
- Online multiplayer support
- Custom board sizes

## License

This project is open source and available for educational purposes.

## Credits

Built as a demonstration of vanilla JavaScript game development and responsive web design.
