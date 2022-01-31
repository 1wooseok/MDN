# SPA & Routing

## SPA

single page Application(SPA)는 기본적으로 단일 페이지로 구성되며

link를 사용해 새 페이지를 요청하는 전통적인 방법과 다르게 

필요한 모든 정적 리소스를 최초에 한번만 다운로드 한다.

<br>

새 페이지 요청 시, 필요한 데이터만을 전달받아 페이지를 갱신하므로

전체적인 트래픽을 감소할 수 있고, 보다 나은 사용자 경험을 제공한다.

<br>

## 단점
1. 초기 구동 속도

   필요한 리소스를 최초에 한번만 받아오므로 초기 구동 속도가 느리다.
   하지만 웹페이지 보다 어플리케이션에 적합한 기술이므로, 트래픽의 감소와 속도, 사용성, 반응성의 향상 등 장점을 생각하면 결정적인 단점은 아니다.
   
2. SEO(검색엔진 최적화) 문제

   페이지마다 고유한 url을 갖고있지 않아 SEO문제가 발생함.
   SPA FrameWork는 서버 렌더링을 지원하는 SEO대응 기술이 이미 존재하고 있어 선별적 SEO대응이 가능하므로 결정적인 단점은 아니다.	


<br>

## Routing

출발지에서 목적지까지의 경로를 결정하는 기능.

application에서 라우팅은, 화면에서 다른 화면으로 전환하는 내비게이션을 관리하기 위한 기능을 의미한다.

일반적으로 사용자가 요청한 URL, 이벤트를 해석하고 새 페이지로 전환하기 위해 서버에 필요 데이터를 요청하고 화면을 전환하는 것을 말한다.

<br>

### 브라우저가 화면을 전환하는 경우
1. url입력
2. 링크 클릭
3. 뒤로가기, 앞으로가기

<br>
Ajax 요청으로 데이터를 응답받아 화면을 생성하는 경우, URL은 변경되지 않는다. 

이는 history를 관리할 수 없음을 의미하며, SEO이슈의 발생 원인이기도 하다.

<br>

## SPA의 Routing (PJAX)

HTML5 History API인 pushState() 와

popstate 이벤트를 활용해서 구현 할 수 있다.


<br>

### pushState

AJAX 요청은 주소창의 url을 변경시키지 않아 history를 관리할 수 없게 되는데,

이때 pushState() 메서드를 사용한다.

pushState() 메서드는 주소창의 URL을 변경시키고 history entry로 추가하지만 실제 요청은 하지 않는다. 

이렇게 함으로써 페이지마다 고유의 URL이 존재하므로 history 관리에 문제가 없다.
```
ELEM.addEventListener('click', e => {
    if(!e.target.matches('nav > ul > li > a')) {
        return
    }
    e.preventDefault();
    const path = e.target.getAttribute('href');
    
    //////////////
    // history 추가
    window.history.pushState({path}, '', path);
    
    // url변경후 ajax요청
    render(path);
    //////////////
})
```

<br>

### popstate (event)

History에 변화가 있을때 발생한다.

뒤로가기/앞으로가기 버튼을 눌렀을때, history.back()/history.go(n)에의해 이벤트가 발생한다.

이벤트가 발생했을때 state속성의 path로 AJAX요청을 하면 뒤로가기/앞으로가기 기능을 구현할 수 있다.
```

window.addEventListener('popstate', e => {
    // Ajax Request
    render(e.state.path);
})
```

<br>

#### * 새로고침

하지만 새로고침을 했을때에는 현재 페이지 URL이 서버에 요청된다. 

따라서 요청에 응답하는 기능이 서버에 추가되어야 한다.
