const h2 = document.querySelector('.cityName');
const para = document.querySelector('p');
const search = document.querySelector('.search');
const search_btn = document.querySelector('.search_btn');
let myXML;

const base_url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api';
//const api_key = 'V9hsM+3pd0KWaNCIJ82cLDqU1hJVBsaHI/nOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB/9FiDJZFs6Hlt6b0g==';
const api_key = 'V9hsM%2B3pd0KWaNCIJ82cLDqU1hJVBsaHI%2FnOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB%2F9FiDJZFs6Hlt6b0g%3D%3D';
let url;

// 공공데이터 fetch
function fetchResult(evt) {
  url = `${base_url}?ServiceKey=${api_key}`;

  fetch(url).then(function(result) {
        return result.text();
     }).then(function(xml) {
        strToXML(xml); // String Type
     })
}

// 공공데이터 Str -> XML(object)
function strToXML(xml) {
  const test1 = {
    age: 11,
    name: 'joy'
  };

  let myString = xml;
  let myParser = new DOMParser();
  myXML = myParser.parseFromString(myString, "text/xml");
}

// 시군구 검색
function searchCity() {
  let searched_city = search.value;
  search.value = '';

  displayCity(searched_city);
}

// 종량제 봉투 정보 화면에 출력
function displayCity(searched_city) {
  console.log(myXML);
  
  let item = myXML.getElementsByTagName('item');

  // nextNode 이런걸로 가격 뽑기
  for(let i=0; i<item.length; i++) {
    let city = item[i].getElementsByTagName('signguNm')[0].textContent;
    if(searched_city === city) {
      h2.textContent = city;

      let price = item[0].getElementsByTagName('price1')[0];

      //let k = 0;
      while(price.nodeName != 'chrgDeptNm') {
        const para2 = document.createElement('p');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');

        let myPrice = (price.nodeName).replace('price', '') + 'ℓ : ';

        span1.textContent = myPrice;
        span2.textContent = price.textContent + '원';

        if(price.textContent != 0) {
          para2.style.backgroundColor = 'tomato';
        }

        para2.appendChild(span1);
        para2.appendChild(span2);

        para.appendChild(para2);

        price = price.nextSibling;
      }
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