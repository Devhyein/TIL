## 특징

- 객체 지향 프로그래밍 언어
- JVM에 의해 바이트 코드를 해석하여 실행 → 운영체제에 상관없이 실행 가능하지만 느림
- 메모리 관리를 JVM의 Garbage Collection이 해줌
- 다이아몬드 문제로 인해 단일 상속만 가능

## 자바의 동작 과정

.java파일을 javac라는 컴파일러가 .class라는 바이트 코드로 변환 → JVM의 클래스 로더가 클래스 파일을 찾음 → 바이트 코드 검증기로 검증 → 인터프리터가 해석하며 실행

## JVM이란?

- 자바를 실행하기 위한 가상 머신
- 자바의 바이트 코드를 해석해서 실행해줌을써 자바가 운영체제에 구애받지 않고 사용되게 해줌
- 갈비지 컬렉션을 통해 자동 메모리 관리를 해줌

## 종류

- Java SE : 가장 보편적으로 사용되는 플랫폼
- Java EE : Java SE에 웹 어플리케이션 서버에서 동작하기 위한 기능이 추가됨 JSP, Servlet과 같은 기능을 제공
- Java ME : 제한된 자원을 가진 휴대폰이나 셋탑박스 등에서 Java 프로그래밍 언어를 지원하기 위해 만들어진 플랫폼.

    임베디드를 위한 자바 플랫폼
