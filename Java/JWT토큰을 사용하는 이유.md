### JWT란?
  - JSON Web Token
  - 전자 서명 된 URL-safe의 JSON형태
  - HMAC알고리즘을 사용하여 비밀키 / RSA를 이용한 Public, Private 키 쌍으로 서명 가능
  
### JWT의 구성
  ![jwt](https://user-images.githubusercontent.com/29700816/93211947-e3fa1e00-f79c-11ea-8fd9-7ae7c4eb96be.png)
  - JWT는 header, payload, signature 세 부분으로 구성
  - 세 파트는 각각 .으로 구분
  - Header : 토큰의 타입과 해시 암호화 알고리즘
  - Payload : 토큰에 담을 클레임 정보 
  - Signature : secret key를 포함하여 암호화

### 사용하는 경우
  1. API 서버가 여러개가 되었기 때문에
  2. 모바일 환경일 때
   - 들어갈 때 마다 로그인하면 귀찮, 세션기반 인증방법 쓰면 앱이 백그라운드 들어가면 연결 끊어져서 매번 다시 인증
   - 토큰(JWT)를 보관해놓으면 매번 로그인하지 않아도 됨

참고 블로그 : https://velopert.com/2389
