const h2 = document.querySelector('h2');
const para = document.querySelector('p');
const search = document.querySelector('.search');
const search_btn = document.querySelector('.search_btn');
let myXML;

const base_url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api';
//const api_key = 'V9hsM+3pd0KWaNCIJ82cLDqU1hJVBsaHI/nOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB/9FiDJZFs6Hlt6b0g==';
const api_key = 'V9hsM%2B3pd0KWaNCIJ82cLDqU1hJVBsaHI%2FnOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB%2F9FiDJZFs6Hlt6b0g%3D%3D';
let url;

function fetchResult(evt) {
  url = `${base_url}?ServiceKey=${api_key}`;

  fetch(url).then(function(result) {
        return result.text();
     }).then(function(xml) {
        strToXML(xml); // String Type
     })
}

function strToXML(xml) {
  const test1 = {
    age: 11,
    name: 'joy'
  };

  let myString = xml;
  let myParser = new DOMParser();
  myXML = myParser.parseFromString(myString, "text/xml");
}

function searchCity() {
  let searched_city = search.value;
  search.value = '';

  displayCityName(searched_city);
}

function displayCityName(searched_city) {
  let item = myXML.getElementsByTagName('item');

  for(let i=0; i<item.length; i++) {
    let city = item[i].getElementsByTagName('signguNm')[0].textContent;
    if(String(searched_city) === String(city)) {
      h2.textContent = city;
      return
    } 
  }
  h2.textContent = '옳바른 도시이름을 입력 해주세요.';
}

function init() {
  fetchResult();
  search_btn.addEventListener('click', searchCity);
}

init();