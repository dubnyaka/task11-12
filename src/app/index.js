import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import '../styles/App.css';

import App from './containers/App.jsx';
import userReducer from './reducers/user';
import StudentsReducer from './reducers/students';

const rootReducer = combineReducers({
    user: userReducer,
    students: StudentsReducer,
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
