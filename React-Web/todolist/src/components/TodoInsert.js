import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input : PropTypes.string
};

const defaultProps = {
  onInsert: () => console.warn('onInsert not defined ...')
};

class TodoInsert extends Component {

    constructor(props) {
        super(props);

        this.state = {
          input : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    handleChange = (e) => {

      this.setState({

        input : e.target.value

      })

    }

    handleClick = () => {

      this.props.onInsert(this.state.input);
      this.setState({
        input : ''
      });

    }

    handleKeyPress = (e) => {

      if(e.key === 'Enter'){

        this.handleClick();

      }

    }

    render() {

        const { input } = this.state;
        const { handleChange, handleClick, handleKeyPress} = this;

        return(
            <div>
                <input
                    value={input}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleClick}>추가</button>
            </div>
        );
    }
}

TodoInsert.propTypes = propTypes;
TodoInsert.defaultProps = defaultProps;

export default TodoInsert;
