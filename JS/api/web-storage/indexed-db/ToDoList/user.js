const name_input = document.querySelector('.name_input');
const name_btn = document.querySelector(".name_btn");
const del_name_btn = document.querySelector('.del_name_btn');
//const edit_name_btn = document.querySelector('.edit_name_btn');

const name_span = document.querySelector('.name_span');

// 사용자 이름 
function getUserName() {
    let userName = window.localStorage.getItem('userName');
    
    if(userName === 'null') {
        name_span.textContent = ' ';

        showBtn();
    } else {
        name_span.textContent = userName;

        hideBtn();
    }
}

function setUserName() {
    let newUser = name_input.value;
    if(newUser != '') {
        name_input.value = '';
        window.localStorage.setItem('userName', newUser);
        getUserName();
    } else {
        alert('Enter Correct Name');
    }
}

function editUserName() {
    let userName = window.localStorage.getItem('userName');

    if(userName != null) {
        let editedUserName = name_input.value;
        window.localStorage.setItem('userName', editedUserName);
        getUserName();
    }
}

function deleteUserName() {
    window.localStorage.setItem('userName', null);
    getUserName();
}

function showBtn() {
    name_input.classList.remove('hidden');
    name_btn.classList.remove('hidden');
    del_name_btn.classList.add('hidden');
}

function hideBtn() {
    name_input.classList.add('hidden');
    name_btn.classList.add('hidden');
    del_name_btn.classList.remove('hidden');
}

function init() {
    getUserName();
    name_btn.addEventListener('click', setUserName);
    del_name_btn.addEventListener('click', deleteUserName);
}

init();
