import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './components/Home';

import {Router, Route, browserHistory, IndexRoute} from 'react-router';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
    </Route>
</Router>, rootElement);
