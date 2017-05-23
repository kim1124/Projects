import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

class NamePrint extends Component{

    componentWillReceiveProps(nextProps){

        console.log("Props -> ", nextProps);

    }

    shouldComponentUpdate(nextProps, nextState){

        console.log("Next props -> ", nextProps);
        console.log("Next State -> ", nextState);

        return true;

    }

    render(){

        const { arr_names } = this.props;

        return (
            <div>
                <ul>
                    {
                        arr_names.map((name, idx) => {
                            
                            let arr_list = [];

                            arr_list.push(<li key={uuid()}>{idx}번째 이름 : {name}</li>);

                            return arr_list;

                        })
                    }
                </ul>
            </div>
        );

    }

}

NamePrint.PropTypes = {
    arr_names : PropTypes.array
}

NamePrint.DefaultProps = {

    name : 'Default Name ...'

};

export default NamePrint;