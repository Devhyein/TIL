### MVC 패턴이란?
 - Model - View - Controller의 약자
 - 사용자 인터페이스와 비즈니스 로직을 분리 -> 개발자와 디자이너의 분업, 유지보수 
 - Model : 데이터베이스와 상호작용하면 비즈니스 로직을 처리
 - View : 사용자에게 화면을 보여줌
 - Controller : 들어온 요청을 판단하고 해당 로직을 실행시켜줌

### 종류
 - MVC1 : 클라이언트의 요청을 JSP가 받아 처리하고 보여줌
   JSP파일에 Java코드와 HTML코드가 섞여 유지보수가 어려움

 - MVC2 : 서블릿이 요청을 받아 처리하고 처리된 결과를 JSP가 보여줌
   스프링 MVC가 이 방식을 사용

### 처리 과정

![mvc2](https://user-images.githubusercontent.com/29700816/92309519-56bb0a80-efe1-11ea-906c-3f45d5bf8b02.png)

 1. DispathcerServlet이 사용자 요청을 받음
 2. handlerMapping을 이용해 해당 Controller실행
 3. Service호출
 4. DAO호출
 5. MyBatis를 이용해 작업
 6. 처리 결과를 반환
 7. ViewResolver는 알맞은 JSP파일을 찾아서 화면을 보여줌
