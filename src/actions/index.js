import * as actionTypes from './types';

export const setStorage = (key, value) => {
  return {
    type: actionTypes.SET_STORAGE,
    payload: {
      key,
      value
    }
  }
};

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      user
    }
  }
};

export const cleanUser = () => {
  return  {
    type: actionTypes.CLEAR_USER
  }
};