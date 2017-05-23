import React, { Component } from 'react';
import Mycomponent from './MyComponent';
import Container from './Container';

class App extends Component {
  render() {

    const name = 'kim1124'
    const style = {

      color : 'aqua',
      backgroundColor : 'black'

    }

    return (
      <Container title="Container Title">
        <Mycomponent title="kim1124"/>
      </Container>
    );
  }
}

export default App;
