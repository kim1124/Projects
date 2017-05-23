import React, { Component, PropTypes } from 'react';
import shortId from 'shortid';
import TodoInsert from './components/TodoInsert';
import TodoItemList from './components/TodoItemList';

const propTypes = {

};

const defaultProps = {

};

function createItem(name){

  return {
    id : shortId.generate(),
    name,
    finished : false

  };

}

const defaultTodos = [
  '리액트 시작하기',
  '컴포넌트 이해하기',
  'props/state 사용하기',
  'LifeCycle API 알아보기'
].map(createItem);

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
          todoItems : defaultTodos
        }

        this.handleInsert = this.handleInsert.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleInsert = (name) => {

      this.setState({
        todoItems : [... this.state.todoItems, createItem(name)]
      })

    }

    handleToggle = (id) => {

      const { todoItems } = this.state;
      const index = todoItems.findIndex(item => item.id === id);
      const item = todoItems[index];

      this.setState({

        todoItems : [
          ... todoItems.slice(0, index),
          {
            ... item,
            finished : !item.finished
          },
          ... todoItems.slice(index + 1, todoItems.length)
        ]

      });

    }

    handleRemove = (id) => {

      const { todoItems } = this.state;
      const index = todoItems.findIndex(item => item.id === id);

      this.setState({

        todoItems : [
          ... todoItems.slice(0, index),
          ... todoItems.slice(index + 1, todoItems.length)
        ]

      });

    }

    handleReset = () => {

      this.setState({
        todoItems : defaultTodos
      });

    }

    render() {

        const {

          handleReset,
          handleRemove,
          handleToggle,
          handleInsert

        } = this;

        return(
            <div className="app">
              <h1>Todo List</h1>
              <TodoInsert onInsert={handleInsert}/>
              <TodoItemList items={this.state.todoItems} onToggle={handleToggle} onRemove={handleRemove}/>
            </div>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
