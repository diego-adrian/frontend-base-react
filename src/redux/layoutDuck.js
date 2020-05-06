// constants
const initialState = {
  widthSidenavOpen: 0,
  widthSidenavClose: 0,
  appSidenavStatus: false
};
const SET_STATUS = 'SET_STATUS';
// reducer
export const reducerLayout = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        appSidenavStatus: action.payload.option,
        widthSidenavOpen: action.payload.widthSidenavOpen,
        widthSidenavClose: action.payload.widthSidenavClose
      };
    default:
      return state;
  }
};
// actions
export const setStatusSidenav = (option) => ({
  type: SET_STATUS,
  payload: {
    option,
    widthSidenavOpen: 250,
    widthSidenavClose: 50
  }
});
