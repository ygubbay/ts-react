import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import App from './containers/app';
import { Provider } from "react-redux";
import store from "./store";

require('./styles/ts-styles.less');


render(<Provider store={store}>
            <Router>
                <Route path="/" component={App} />
            </Router>
       </Provider>, document.getElementById('app'));