let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let x = 50;
var y = 50;
const size = 30;

function drawCircle(x, y, size) {
    console.log(x, y);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

drawCircle(x, y, size);

// Add your code here
function moveTo(evt) {
    if (evt.key === 'w') {
        y--;
        drawCircle(x, y, size);
    } else if (evt.key === 's') {
        y++;
        drawCircle(x, y, size);
    } else if (evt.key === 'a') {
        x--;
        drawCircle(x, y, size);
    } else if (evt.key === 'd') {
        x++;
        drawCircle(x, y, size);
    }
}

canvas.addEventListener('keypress', moveTo, false);