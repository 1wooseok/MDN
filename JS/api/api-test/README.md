# 공공데이터 가져오기 연습 ( REST API )

1. OPEN API 인증키 발급 + fetch API로 DATA 가져오기
2. 'DOMParser'로 String -> XML 변환
3. 데이터 가공 및 출력
<br>
<h2>난관 ( CORS Issue )</h2>

<img width="533" alt="스크린샷 2021-09-04 오후 8 43 10" src="https://user-images.githubusercontent.com/74036731/132093807-aeeee776-816a-43b5-a09c-217e4682ec81.png">


<h3>CORS(Cross Origin Resource Sharing)</h3>
: 시스템 수준에서 타 도메인 간 자원 호출을 승인하거나 차단하는 것을 결정하는 표준규약.<br>
  보안 상의 이유로, 브라우저는 스크립트에서 시작한 교차 출처 HTTP 요청을 제한함.

<br>
<br>
<h3>해결책</h3>
: 구글 확장프로그램 'Access-Control-Allow-Origin' 확장 프로그램 설치 ( 강제로 허용 해줌 )

<br>
<br>
<br>
<h3>결과</h3>
<img width="539" alt="스크린샷 2021-09-04 오후 9 17 35" src="https://user-images.githubusercontent.com/74036731/132094162-473244f8-b530-412b-85fd-7c9b5d5ccf60.png">
<br>
<br>
<br>
<br>
출처 : https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
