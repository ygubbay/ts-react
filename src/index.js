import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { Provider } from "react-redux";
import store from "./store";

require('./styles/ts-styles.less');

ReactDOM.render(
<Provider store={store}><App />
</Provider>, document.getElementById('app'));