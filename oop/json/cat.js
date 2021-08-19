const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');

let motherInfo = 'The mother cats are called ';
let kittenInfo;

fetch('sample.json')
  .then(response => response.text())
  .then(text => displayCatInfo(text))

function displayCatInfo(catString) {
  let total = 0;
  let male = 0;

  // Add your code here
  const catObj = JSON.parse(catString);


  for (let i = 0; i < catObj.length; i++) {
    if (i === catObj.length - 1) {
      motherInfo += 'and' + catObj[i].name + '.';
    } else {
      motherInfo += catObj[i].name + ', ';
    }

    let kittens = catObj[i].kittens;

    for (let j = 0; j < kittens.length; j++) {
      total++;
      if (kittens[j].gender === 'm') {
        male++;
      }
    }
  }
  kittenInfo = `total = ${total}, male = ${male}, female=${total - male}`;
  // Don't edit the code below here!

  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);
