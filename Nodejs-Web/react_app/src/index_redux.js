import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

// Action 생성
function input(msg) {

    return {type: 'INPUT', msg: msg};

}

// 리듀서 생성
function inputReducer(state, action) {

    state = {
        msg: "기본값 입니다."
    };

    console.log("Action -> ", action);

    if (action.msg) {
        return Object.assign({}, state, {msg: action.msg});
    } else {
        return state;
    }
}

// 저장소 생성
const store = createStore(inputReducer);

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            textInput: ""
        };
    }

    inputChange(event) {
        this.setState({textInput: event.target.value});
    }

    submit() {
        let message = this.state.textInput;

        // 저장소에 input 이벤트를 발생시킨다.
        this.props.store.dispatch(input(message));
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.inputChange.bind(this)}/>
                <button onClick={this.submit.bind(this)}>입력전송</button>
            </div>
        );
    }
}

let Answer = (props) => {

    console.log("Props -> ", props);

    return (
        <h1>{props.store.getState().msg}</h1>
    );
};

let mapStateToProps = (state) => {
    return {
        msg: state.msg
    };
}

Answer = connect(mapStateToProps)(Answer);

let mapDispatchToProps = (dispatch) => {
    return {
        updateMessage : (value) => dispatch( input(value) )
    }
};

Form = connect(undefined, mapDispatchToProps)(Form);

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <Form store={store}/>
                <Answer store={store}/>
            </div>
        </Provider>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(
    <App/>, rootElement);
