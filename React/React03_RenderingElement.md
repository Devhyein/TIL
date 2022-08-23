### React Element
- 리액트 앱을 구성하는 가장 작은 블록들
- 실제 DOM에 존재하는 엘리먼트 => DOM Element  
React의 Virtual Dom에 존재하는 엘리먼트 => React Element  
즉, React Element는 Dom Element의 가상 표현
- 자바스크립트 객체 형태
- 결국 React Element도 createElement를 통해 생성됨.

ex. 
```js
function Button(props) {
    return (
        <button className={`bg-${props.color}`}>
            <b>
                {props.children}
            </b>
        </button>
    )
}

function ConfirmDialog(props) {
    return (
        <div>
            <p>확인 버튼을 눌러주세요.</p>
            <Button color='green'>확인</Button>
        </div>
    )
}
```

### Element의 특징 - 불변성 Immutable
- 한번 생성된 Element는 변하지 않음
- 생성 후에는 children이나 attribute를 바꿀 수 없다.
- 화면에 변경된 Element를 보여주기 위해서는 새로운 Element를 만들어서 기존 Element랑 바꿔치기 하는 것.
- React는 렌더링 속도가 빠르기 때문에 해당 부분만 바꿔치기한 후 그 부분만 렌더링 시켜주는 것.


