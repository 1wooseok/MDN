const h2 = document.querySelector('.cityName');
const para = document.querySelector('p');
const search_input = document.querySelector('.search_input');
const search_btn = document.querySelector('.search_btn');

const base_url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api';
//const api_key = 'V9hsM+3pd0KWaNCIJ82cLDqU1hJVBsaHI/nOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB/9FiDJZFs6Hlt6b0g==';
const api_key = 'V9hsM%2B3pd0KWaNCIJ82cLDqU1hJVBsaHI%2FnOwxsK1utzoE3d7HCHPYmKhD4zyUfoz2izB%2F9FiDJZFs6Hlt6b0g%3D%3D';

let myXML;

// 공공데이터 fetch
function fetchResult(evt) {
  let numOfRows = `${encodeURIComponent('numOfRows')}=${encodeURIComponent('1000')}`;
  let pageNo = `${encodeURIComponent('pageNo')}=${encodeURIComponent('1')}`;
  let url = `${base_url}?ServiceKey=${api_key}&${pageNo}&${numOfRows}`;
  
  fetch(url).then(function(result) {
        return result.text();
     }).then(function(xml) {
        strToXML(xml); // String Type
     })
}

// 공공데이터 Str -> XML(object)
function strToXML(xml) {
  let myString = xml;
  let myParser = new DOMParser();
  myXML = myParser.parseFromString(myString, "text/xml");
}

// 시군구 검색
function search() {
    let searched_city = search_input.value;
    
    display(searched_city);
}

// 종량제 봉투 정보 화면에 출력
function display(searched_city) {
  console.log(myXML);
  while(para.firstChild) {
    para.removeChild(para.firstChild);
  }

  let item = myXML.getElementsByTagName('item');

  // 도시이름 검색
  for(let i=0; i<item.length; i++) {
    let city = item[i].getElementsByTagName('signguNm')[0].textContent;
    console.log(city);
    if(searched_city === city) {
      h2.textContent = city;

      let price = item[i].getElementsByTagName('price1')[0];

      /// NODE.nextSibling 으로 가격 순회
      while(price.nodeName != 'chrgDeptNm') {
        const para2 = document.createElement('p');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');

        span1.textContent = (price.nodeName).replace('price', '') + 'ℓ : ';
        span2.textContent = price.textContent + '원';

        // 0 원이 아닌 목록 하이라이트
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
  // 해당 시군구가 없을 경우
  h2.textContent = '옳바른 도시이름을 입력 해주세요.';
  para.textContent = '';
}

function init() {
  fetchResult();
  search_btn.addEventListener('click', search);
}

init();
