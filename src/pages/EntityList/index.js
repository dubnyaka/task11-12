import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import withAuthorities from 'decorators/withAuthorities';
import reducer from './reducers/reducer';
import studentsReducer from '../../app/reducers/students';
import EntityList from "./containers/EntityList";

const rootReducer = combineReducers({
    reducer,
    studentsReducer,
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export default withAuthorities(props => (
    <Provider store={store}>
        <EntityList {...props} />
    </Provider>
));
