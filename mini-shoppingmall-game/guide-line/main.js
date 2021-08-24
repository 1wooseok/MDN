function loadItems() {
    return fetch('./data.json')
        .then(response => response.json())
        .then(json => json.cloth);
}

function displayItems(clothes) {
    const item_list = document.querySelector('.item_list');
    item_list.innerHTML = clothes.map(cloth => createHTMLElement(cloth));
}

function createHTMLElement(clothes) {
    return `
    <li>
        <img src="${clothes.image}" alt="${clothes.categorize}">
        <span>${clothes.categorize + ' ' + clothes.gender
        }</span >
    </li>
    `
}

function setEventListener() {
    const shirt_btn = document.querySelector('#shirt');
    const hat_btn = document.querySelector('#hat');
    const socks_btn = document.querySelector('#socks');

    shirt_btn.addEventListener('click',);
}
// main
loadItems()
    .then(clothes => displayItems(clothes));