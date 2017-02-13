import React from 'react';
import styles from '../stylesheet/header.css';

class Header extends React.Component {

    constructor(){
        super();
        //this를 사용하려면 super로 부모컴포넌트를 불러와야됨
        this.state = {
            title : "타이틀입니다.",
            content : "내용입니다."
        };
    }

    render(){
        //아래와 같이 className 으로 지정해 줘야 한다.
        return(
            <div>
                <div className={styles.header}>{this.state.title}</div>
                <div className={styles.content}>{this.state.content}</div>
            </div>
        );
    }
}

class Header2 {

  getText(){
    alert("Header2");
  }

}`

// export default Header;

export {Header, Header2};
