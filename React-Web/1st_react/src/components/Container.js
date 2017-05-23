import React from 'react';

// 함수형 컴포넌트는 파라미터 값으로 props가 들어옴. ES6 문법으로 객체를 풀어서 사용가능. 함수형 컴포넌트에서는 생명주기 API를 사용할 수 없음.

const Container = ({title, children}) => {

    return(
        <div>
            <h1>{title}</h1>
            <div>
                {children}
            </div>
        </div>
    )

}

export default Container;