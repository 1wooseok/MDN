# Web Worker  vs  Service Worker

### Web Worker란?

: JS 연산을 Main Thread와 분리된 별도의 백그라운드 스레드에서 실행할 수 있는 기술.

###### 장점

- 무거운 작업을 분리된 스레드에서 처리하면.                Main Thread가 멈추거나 느려지지 않고 동작.

###### 제한

- DOM 직접 조작 불가.
- window 몇몇 속성 및. 메서드 사용 불가.



사용법 & Interface

https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API

<br>

### Service Worker란?

: 웹 응용 프로그램, 브라우저, 그리고 (사용 가능한 경우) 네트워크 사이의 프록시 서버 역할

  연관된 웹페이지를 통제하여 탐색과 리소스 요청을 가로채 수정하고, 리소스를 굉장히 세부적으로 캐싱할 수 있음.

  이를 통해 어떤 상황에 어떻게 동작해야 하는지 바꿀 수 있음.  ( ex. 네트워크를 사용하지 못할때 )

 

###### 장점

- 효과적인 오프라인 경험을 생성
- 네트워크 요청을 가로채 사용가능 여부에 따라 적절한 처리
- 서버 자산 업데이트
- Push알림과 백그라운드 동기화 API로의 접근 제공
- None Blocking ( 다른 스레드에서 동작 )

###### 제한

- DOM 접근 불가.
- 동기적 XHR, Web Storage 등의 API 사용 불가
- HTTPS에서만 동작 ( 보안상 이유 )



###### 사용법 & Interface

https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API