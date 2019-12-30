import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  user: null
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: 
      return {
        user: action.payload.user
      }
    case actionTypes.CLEAR_USER: 
      return {
        ...state
      }
    default:
      return state
  }
};

const rootReducer = combineReducers({
  user: user_reducer
});

export default rootReducer;