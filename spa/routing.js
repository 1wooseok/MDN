const main = document.querySelector('.root');
const ul = document.querySelector('ul');

// Path URL
const routes = {
    '/one' : 'data/one.json',
    '/two' : 'data/two.json',
    '/three' : 'data/three.html',
}

// AJAX 요청 함수
async function render(path) {
    try {
        const url = routes[path];
        const response = await fetch(url);

        if(!response) {
            main.innerHTML = `${response.status} Not Found`;
        } else {
            const contentType = response.headers.get('content-type');

            if(contentType.includes('application/json')) {
                const json = await response.json();
                
                main.innerHTML = `
                    <h1>${json.title}</h1>
                    <p>${json.content}</p>
                `
            } else if(contentType.includes('text/html')) {
                main.innerHTML = await response.text();
            }  
        }
    } catch(err) {
        console.log(err);
    }
}

// Routing
ul.addEventListener('click', e => {
    if(!e.target.matches('ul > li > a')) {
        return
    }
    // 서버 요청 방지
    e.preventDefault();

    const path = e.target.getAttribute('href');
    // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
    // history에 url을 추가함으로서 뒤로가기/앞으로가기 가능.
    history.pushState({ path }, null, path);
    console.log(history);

    // path에 의한 AJAX 요청
    render(path);    
})

// pjax 방식은 새로운 페이지를 요청하지 않기때문에 페이지가 갱신되지 않는다.
// popstate 이벤트로 history entry가 변경 감지
// 뒤로가기/앞으로가기 button 또는 history.back() / history.go(n) 감지
// history.pushState / history.replaceState 메서드로는 event가 발생하지 않음.
window.addEventListener('popstate', e => {
    // 이전페이지 / 다음페이지 button이 클릭되면 render를 호출
    render(e.state.path);
})

// PJAX 방식은 서버에 새로운 페이지 요청을 하지 않는다.
// 페이지마다 고유한 url이 존재해 history 관리에도 문제가 없다.
// 또한 Hash를 사용하지 않으므로 SEO에도 문제가 없다.