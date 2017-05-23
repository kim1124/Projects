import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NamePrint from './Name';

class MyComponent extends Component {

    constructor(props){

        super(props);

        this.state = {

            number : 1124,
            object : {
                car : 'aveo',
                engin : 16
            },
            first_name : 'first name',
            last_name : 'last_name',
            arr_names : []

        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e){

        console.log("Handle Change !!")

        this.setState({
            [e.target.name] : e.target.value
        })

    }

    handleClick(e){

        this.setState({
            last_name : '',
            first_name : '',
            arr_names : [
                ...this.state.arr_names,
                `${this.state.first_name} ${this.state.last_name}`
            ]
        });

        this.lastname.focus();

    }

    handleKeyPress(e){

        if(e.key == 'Enter'){

            this.handleClick();

        }

    }

    render(){

        const { number, object } = this.state;
        const { handleClick, handleChange, handleKeyPress } = this;

        return (
            <div className="app_mycomponent">
                <h2>Number : {number}</h2>
                <h3>Object Car : {object.car}</h3>
                <h4>Object engin : {object.engin}</h4>
                <NamePrint arr_names={this.state.arr_names}/>
                <input 
                    onChange={handleChange}
                    ref={ref=>this.lastname = ref}
                    type="text"
                    name="last_name"
                    placeholder="LastName ..."
                    value={this.state.list_name}
                />
                <input 
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    placeholder="FirstName ..."
                    onKeyPress={handleKeyPress}
                    value={this.state.first_name}
                />
                {/* ReactJS 이벤트는 DOM 요소에서만 등록이 가능하며, 카멜 케이스의 형태로 작성한다. */}
                <button onClick={handleClick}>Register</button>
            </div>
        )

    }

}

MyComponent.defaultProps = {

    title : "Default Component Title",
    name : "Default Developer Name"

}

MyComponent.propTypes = {
    name : PropTypes.string,
    title : PropTypes.string
}

export default MyComponent;