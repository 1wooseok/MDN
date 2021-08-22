// 현재 보여지는 메인 이미지
const displayedImage = document.querySelector('.displayed-img');
// 하단 이미지 인덱스
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i < 6; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/pic${i}.jpg`);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', function (evt) {
    const target = evt.target;

    if (target && target.nodeName === 'IMG') {
        console.log(target);
        displayedImage.setAttribute('src', target.getAttribute('src'));
    }
})
/* Wiring up the Darken/Lighten button */

function changeSomething() {
    let currentClass = btn.getAttribute('class');
    if (currentClass === 'dark') {
        btn.innerText = 'Lighten';
        btn.setAttribute('class', 'light');
        btn.style.color = 'white';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else if (currentClass === 'light') {
        btn.innerText = 'Darken';
        btn.setAttribute('class', 'dark');
        btn.style.color = 'black';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}

btn.addEventListener('click', changeSomething);

/* Looping through images */


/* Wiring up the Darken/Lighten button */

btn.onclick = function () {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
