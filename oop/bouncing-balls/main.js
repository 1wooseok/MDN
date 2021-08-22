alert(' W A S D 키로 조작하여 공들을 먹어 치우세요! ')
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const h2 = document.querySelector('h2');
const modal_bg = document.querySelector('.modal_bg');
const modal_window = document.querySelector('.modal_window');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');

// Initial Counting Display
const countingText = 'Ball Counting : ';
let cnt = 3;
h2.textContent = countingText + cnt;

// Window w, h
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    return n;
}

random(0, 255);

// Define Class
class Shape {
    constructor(x, y, vx, vy, exists) {
        this.x = x;
        this.y = y;
        this.vx = vx; // 공은 위치에 속도 벡터를 추가하여 움직일 수 있게 된다.
        this.vy = vy;
        this.exists = exists; // 기본값 true
    }
}

class Ball extends Shape {
    constructor(x, y, vx, vy, exists, color, size) {
        super(x, y, vx, vy, exists);
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
            if (!(this === balls[i]) && balls[i].exsits) {
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



class EvilBall extends Shape {
    constructor(x, y, vx, vy, exists, color, size) {
        super(x, y, vx, vy, exists, color, size);
        this.color = color;
        this.size = size;
    }

    drawEvil() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = '1.5';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    updateEvil() {
        let _this = this;

        window.onkeydown = function (evt) {
            if (evt.key === 'w') {
                _this.y -= _this.vy;
            }
            if (evt.key === 's') {
                _this.y += _this.vy;
            }
            if (evt.key === 'a') {
                _this.x -= _this.vx;
            }
            if (evt.key === 'd') {
                _this.x += _this.vx;
            }
        }
    }

    evilCollisionDetect() {
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].exists) {
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const d = Math.sqrt((dx * dx) + (dy * dy));

                const tsize = this.size + balls[i].size;
                if (d < (this.size + balls[i].size)) {
                    balls[i].exists = false;
                    cnt--;
                    h2.textContent = countingText + cnt;
                }
            }
        }

        if (cnt === 0) {
            gameOver();
        }
    }
}

let balls = [];

// Create EvilBall instance
let eBall = new EvilBall(width / 2, height / 2, 15, 15, true, 'white', 10);

// Create Ball instance 
while (balls.length < cnt) {
    let size = random(10, 20);
    let myBall = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
        size
    );
    balls.push(myBall);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collitionDetect();
        }
    }
    // redraw EvalBall
    eBall.drawEvil();
    eBall.updateEvil();
    eBall.evilCollisionDetect();

    window.requestAnimationFrame(loop);
}

function gameOver() {
    // Open Modla Window
    modal_bg.classList.remove('hidden');
    modal_window.classList.remove('hidden');

    // Stop Animation Loop
    let myReq = requestAnimationFrame(loop);
    window.cancelAnimationFrame(myReq);

    yes.addEventListener('click', reStart);
    no.addEventListener('click', exit);
}

function reStart() {
    modal_bg.classList.add('hidden');
    modal_window.classList.add('hidden');

    cnt = balls.length;
    for (let i = 0; i < balls.length; i++) {
        balls[i].exists = true;
    }
}

function exit() {
    modal_bg.classList.add('hidden2');
    modal_window.classList.add('hidden2');
}

loop();




