import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import '../styles/App.css';
import userReducer from './reducers/user';

import App from './containers/App.jsx';

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export default () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
