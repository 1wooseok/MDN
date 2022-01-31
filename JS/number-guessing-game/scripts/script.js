const submit_btn = document.querySelector('.submit-btn');
const modal_bg = document.querySelector('.modal_bg');

let answer = Math.floor(Math.random() * 100) + 1;
let trial = 0;
let answer_list = []

function checkNumber() {
    const input_box = document.querySelector('.input-box');
    let guess = input_box.value;
    let message = '';


    if (isNaN(guess)) {
        console.log(`'${guess}' is Not a Number`);
        //message = `'${guess}' is Not a Number`;
    } else {
        answer_list.push(guess);
        trial++;

        if (trial == 10) {
            gameOver();
        }

        if (guess == answer) {
            message = 'Good!';
            setTimeout(() => gameOver(), 500);
        } else if (guess <= answer) {
            message = 'Too Low';
        } else {
            message = 'Too high';
        }
        display(message);
    }

    input_box.value = ''
    input_box.focus();
}

function gameOver() {
    modal_bg.classList.remove('hidden');
}

function reset() {
    modal_bg.classList.add('hidden');
    trial = 0;
    answer = Math.floor(Math.random() * 100) + 1;
    answer_list = [];
    display('');
}

function exit() {
    modal_bg.classList.add('hidden');
    submit_btn.disabled = true;
    window.close(); ``
}

function display(message) {
    const trial_container = document.querySelector('.trial');
    const answer_list_container = document.querySelector('.answer-list');
    const message_box = document.querySelector('.message-box');

    message_box.innerHTML = message;
    trial_container.innerHTML = trial;
    answer_list_container.innerHTML = answer_list;
}

function init() {
    const restart_btn = document.querySelector('.restart_btn');
    const gameover_btn = document.querySelector('.gameover_btn');

    submit_btn.addEventListener('click', checkNumber);
    restart_btn.addEventListener('click', reset);
    gameover_btn.addEventListener('click', exit);
}

init();