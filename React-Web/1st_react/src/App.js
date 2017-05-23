import React, { Component } from 'react';
import Container from './components/Container';
import MyComponent from './components/MyComponent';

class App extends Component {

  // LifeCycle : BoxReady
  constructor(props){

    super(props);

    console.log("Call constructor !!");

    this.handleTest = this.handleTest.bind(this);

  }
  // LifeCycle : BeforRenderer
  componentWillMount(){

    console.log("Call componentWillMount !!");

  }

  // LifeCycle : AfterRenderer
  componentDidMount(){

    console.log("Call componentDidMount !!");

  }

  handleTest(){

    alert("MyComponent handler !!");

  }
  
  // LifeCycle : Renderer
  render(){

    return (
      <div>
        <h1 className="app_head">Welcome to ReactJS</h1>
        <Container title="이름 등록 APP">
          <MyComponent onclick={this.handleTest}/>
        </Container>
      </div>
    );

  }

}

export default App;
