// Select the elements on the page: canvas(its context:
// where we can draw 2d/3d), shake button
// Context: thing onto which drwaing will be rendeted
console.log('it works!');
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const button = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
// Setup canvas for drawing
const { height, width } = canvas;
let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
// creating random x and y as a stating point for a canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
// curly bracket: destructuring objects
function draw({ key }) {
  hue += 1;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
// function for handling keys
function handleKeys(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}
window.addEventListener('keydown', handleKeys);
// clear/shake function
function shakeSketch() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}
button.addEventListener('click', shakeSketch);
// handling arrow keys
