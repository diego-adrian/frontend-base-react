// constants
const initialState = {
  loggedIn: false
};
const LOGIN = 'LOGIN';
// reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn
      }
    default: 
      return state;
  }
};
// actions (actions creator)
export const setLogin = (loggedIn) => {
  return {
    type: LOGIN,
    payload: {
      loggedIn
    }
  }
};
