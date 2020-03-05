// constants
const initialState = {
  widthSidenavOpen: 240,
  widthSidenavClose: 55,
  appSidenavStatus: true
};
const SET_STATUS = 'SET_STATUS';
// reducer
export const reducerLayout = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        appSidenavStatus: action.payload
      }
     default:
      return state;
  }
};
// actions
export const setStatusSidenav = (option) => {
  return {
    type: SET_STATUS,
    payload: option
  }
};

