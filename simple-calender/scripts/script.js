const month = document.querySelector('#month');
const theme = document.querySelector('#theme');
const h1 = document.querySelector('h1');
const days_container = document.querySelector('.days-container')

function setTheme() {
    const body = document.querySelector('body');
    let selected_color = theme.value;

    body.style.backgroundColor = selected_color;

}

function setDate() {
    let selected_month = month.value;
    let days = 31;
    if (selected_month == 'Feburary') {
        days = 28
    } else if (selected_month == 'April' || selected_month == 'June' || selected_month == 'September' || selected_month == 'November') {
        days = 30;
    }

    createCalender(days, selected_month);
}

function createCalender(days, month) {
    h1.innerText = month;

    for (let i = 1; i <= days; i++) {
        const listItem = document.createElement('li');
        listItem.innerText = i;
        days_container.appendChild(listItem);
    }
}

month.addEventListener('change', setDate);
theme.addEventListener('change', setTheme);