## Third party APIs

#### third party API란?

- 타사 서버에 있는 API


#### JS 에서 접근

- API 기능에 연결하고 페이지에서 사용할 수 있도록 해야함.

ex) 
<script>로 서버에서 사용 가능한 JS library에 연결 

<script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
<link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>


  #### API key

- Third Party API는 브라우저와 다른 권한 시스템 사용
- Developer Key를 사용하여 API기능에 접근





## RESTful API

- 특정 URL에 HTTP request를 보내 Data에 접근 ( 일반적인 패턴 )


#### API를 앱에 연결

- ex) URL에 API key를 GET parameter로 포함.


#### Data 요청

- ex) Fetch API
