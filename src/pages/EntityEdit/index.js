import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import withAuthorities from 'decorators/withAuthorities';
import reducer from './reducers/reducer';
import EntityEdit from "./containers/EntityEdit";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    reducer,
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export default withAuthorities(props => (
    <Provider store={store}>
        <EntityEdit {...props} />
    </Provider>
));
