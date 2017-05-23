import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
  todoItems : [],
  onToggle : () => console.warn('onToggle not defind ...'),
  onRemove : () => console.warn('onRemove not defind ...')
};

class TodoItemList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
              <h1>TodoItemList</h1>
            </div>
        );
    }
}

TodoItemList.propTypes = propTypes;
TodoItemList.defaultProps = defaultProps;

export default TodoItemList;
