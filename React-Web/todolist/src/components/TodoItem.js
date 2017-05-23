import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {
  name : '기본 항목',
  id : '',
  finished : false,
  onToggle : () => console.warn('onToggle not defind ...'),
  onRemove : () => console.warn('onRemove not defind ...')
};

class TodoItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>TodoItem</div>
        );
    }
}

TodoItem.propTypes = propTypes;
TodoItem.defaultProps = defaultProps;

export default TodoItem;
