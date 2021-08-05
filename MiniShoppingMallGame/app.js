const item_list = document.querySelector('.item_list');
const btns = Array(document.querySelectorAll('.btn')); // Object -> Array 

function setItems(item) { // Stringify
    return `
    <li>
        <img src='${item.image}'/>
        <span>${item.categorize + ' ' + item.gender}</span>
    </li>
    `
}

function printItems() {
    const target = event.target.id;
    const items = (cloth.filter(prop => prop.categorize === target || prop.color === target)).map(x => setItems(x)).join('');
    item_list.innerHTML = items;
}

function init() {
    btns.map(x => addEventListener('click', printItems));
}

init();