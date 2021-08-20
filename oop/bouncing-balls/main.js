const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    return n;
}

random(0, 255);


class Ball {
    constructor(x, y, vx, vy, color, size) {
        this.x = x;
        this.y = y;
        this.vx = vx; // 공은 위치에 속도 벡터를 추가하여 움직일 수 있게 된다.
        this.vy = vy;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x - this.size <= 0) {
            this.vx = -this.vx;
        }
        if (this.x + this.size >= width) {
            this.vx = -this.vx;
        }
        if (this.y - this.size <= 0) {
            this.vy = -this.vy;
        }
        if (this.y + this.size >= height) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;

    }

    collitionDetect() {
        for (let i = 0; i < balls.length; i++) {
            if (!(this === balls[i])) {
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const d = Math.sqrt((dx * dx) + (dy * dy));

                if (d < (this.size + balls[i].size)) {
                    balls[i].color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
                }
            }
        }
    }
}

class EvilBall extends Ball {
    constructor(x, y, vx, vy, color, size) {
        super(x, y, vx, vy, color, size);
    }

    drawEvil() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    updateEvil(evt) {
        const px = 10;

        if (evt.key === 'w') {
            this.y -= px;
        }
        if (evt.key === 's') {
            this.y += px;
        }
        if (evt.key === 'a') {
            this.x -= px;
        }
        if (evt.key === 'd') {
            this.x += px;
        }
    }

    evilCollisionDetect() {
        for (let i = 0; i < balls.length; i++) {
            if (!(this === balls[i])) {
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const d = Math.sqrt((dx * dx) + (dy * dy));

                if (d < this.size + balls[i].size) {
                    balls.push(balls[i]);
                }
            }
        }
    }
}

let balls = [];
// Create EvilBall instance
let eBall = new EvilBall(width / 2, height / 2, 5, 5, 'white', 10);

// Create Ball instance 
while (balls.length < 25) {
    let size = random(10, 20);
    let myBall = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
        size
    );

    balls.push(myBall);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collitionDetect();
    }
    // reDraw EvalBall
    eBall.drawEvil();

    window.requestAnimationFrame(loop);
}

eBall.drawEvil();

window.addEventListener('keypress', function (evt) {
    eBall.updateEvil(evt);
})

loop();




