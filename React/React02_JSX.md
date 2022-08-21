### JSX란?
: A syntax extension to JavaScript
자바스크립트의 확장 문법
JavaScript + XML / HTML (자바스크립트에 XML이나 HTML을 합해서 확장한 문법)

ex.
```
const element = <h1>Hello, World</h1>;
```
왼쪽은 자바스크립트 문법이지만 오른쪽에 HTML이 같이 나옴.
이렇게 JSX는 혼합해서 사용.

### JSX의 역할
: 내부적으로 XML/HTML코드를 자바스크립트로 변환하는 과정을 거침
따라서 우리가 JSX로 작성해도 최종적으로는 자바스크립트 코드로 나옴
이 변환 역할을 해주는 함수가 createElement함수.

ex.
```
const element = (
    <h1 className = "g">
        Hello, World!
    </h1>
)

const element = React.createElement(
    'h1',
    {className: 'g'}.
    'Hello, World!'
)
```  
이 두 예제는 동일한 코드.
왜냐면 위의 JSX코드는 결국 해석하기 위해 내부적으로 createElement를 가지기 때문.


### CreateElement 파라미터  
```
React.createELement(
    type,
    [props],
    [...children]
)
```
1. type
    - h1, div, span과 같은 태그나 
    - 다른 react 컴포넌트가 들어감
2. props
3. children
    - 현재 엘리먼트가 포함하고 있는 자식 엘레먼트

### JSX 장점
1. 코드가 간결하고 가독성 있어짐
    ```
    // JSX를 사용한 경우
    <div>Hello, {name}</div>

    // JSX를 사용하지 않은 경우
    React.createElement('div', null, `Hello, ${name}`);
    ```
2. Injection Attack 방어  
리액트돔은 렌더링하기 전에 값을 모두 문자열로 변환하기 때문에 외부에서 코드를 입력해도 문자열로 해석해서 안전함

### 사용법
- XML, HTML코드를 사용하다가 자바스크립트 코드를 사용해야하는 경우 {} 중괄호로 묶어줌
- 태그의 attribute속성에 값을 넣으려면
``` 
// 1. 큰따옴표 사이에 문자열을 넣거나
const element = <div tabIndex="0"></div>

// 2. 중괄호 사이에 자바스크립트 코드를 넣음
const element = <img src={user.avatarUrl}></div>
```
- children 자식을 정의하려면
```
// 그냥 하위에 넣어줌. 
// div태그의 children으로 h1태그를 정의해준 코드
const element = (
    <div>
        <h1>안녕</h1>
    </div>
);
```