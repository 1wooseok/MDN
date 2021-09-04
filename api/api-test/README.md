# 공공데이터 가져오기 연습 ( REST API )

1. OPEN API 인증키 발급 + fetch API로 DATA 가져오기
2. 'DOMParser'로 String -> XML 변환
3. 데이터 가공 및 출력



난관 ( CORS )

![스크린샷 2021-09-04 오후 8.43.10](/Users/1wooseok/Desktop/스크린샷 2021-09-04 오후 8.43.10.png)

CORS(Cross Origin Resource Sharing) : 시스템 수준에서 타 도메인 간 자원 호출을 승인하거나 차단하는 것을 결정하는 표준규약. 

보안 상의 이유로, 브라우저는 스크립트에서 시작한 교차 출처 HTTP 요청을 제한함.



해결책 : 구글 확장프로그램 'Access-Control-Allow-Origin' 확장 프로그램 설치 ( 강제로 허용 해줌 )



출처 : https://developer.mozilla.org/ko/docs/Web/HTTP/CORS