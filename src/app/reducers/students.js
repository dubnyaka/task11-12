import {
    FETCH_STUDENTS,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_ERROR,
} from '../constants/actionTypes';
import {createStore} from "redux";


const initialState = {
    cash: 5,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CASH":
            return {...state, cash: state.cash + action.payload}
        case "GET_CASH":
            return {...state, cash: state.cash - action.payload}
        default: return state;
    }
}







