import React from 'react';
import Header from './header';

class App extends React.Component {
    render(){

        return (
          <div>
            <Header.Header title="Header title ..." />
            <h1>Hello React JS </h1>
          </div>
        );
    }
}

export default App;
