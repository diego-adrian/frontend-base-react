// constants
const initialState = {
  appSidenavOpen: true
};
const SET_OPEN = 'SET_OPEN';
const SET_CLOSE = 'SET_CLOSE';
// reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN:
      return {
        ...state,
        appSidenavOpen: action.payload.action
      }
    case SET_CLOSE:
      return {
        ...state,
        appSidenavOpen: action.payload.action
      }
     default:
      return state;
  }
};
// actions

