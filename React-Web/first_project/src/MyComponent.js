import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  job: PropTypes.string,
  favoriteNumber: PropTypes.number
};

const defaultProps = {
  job: '개발자'
};

class MyComponent extends Component {

  constructor(props) {

    super(props);

    this.state = {
      lastName: '',
      firstName: '',
      names: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  handleClick = (e) => {
    const {lastName, firstName, names} = this.state;

    this.setState({
      lastName: '',
      firstName: '',
      names: [...names, `${lastName} ${firstName}`]
    })

    this.inputkim.focus();

  }

  handleKeyPress = (e) => {

    if (e.key === 'Enter') {

      this.handleClick();

    }

  }

  render() {

    const {handleClick, handleChange, handleKeyPress} = this;
    const {lastName, firstName, names} = this.state;

    return (
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="성"
          onChange={handleChange}
          value={lastName}
          ref={
              ref => {
                  this.inputkim = ref
              }
          }
        />
        <input
          type="text"
          name="firstName"
          placeholder="이름"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={firstName}
        />
        <button onClick={handleClick}>등록</button>
        <h2>{lastName} {firstName}</h2>
        {names.map((name, index) => <h3 key={index}>{name}</h3>)}
      </div>
    );
  }
}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;
