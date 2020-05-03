import Storage from '../plugins/Storage';
// Initial State
const initialState = {
  Storage,
  Message: {
    show: false,
    message: null,
    theme: null,
    timeout: 5000
  }
};
// Constants
const GET_STORAGE = 'GET_STORAGE';
const OPEN_MESSAGE_SUCCESS = 'OPEN_MESSAGE_SUCCESS';
const OPEN_MESSAGE_INFO = 'OPEN_MESSAGE_INFO';
const OPEN_MESSAGE_WARNING = 'OPEN_MESSAGE_WARNING';
const OPEN_MESSAGE_ERROR = 'OPEN_MESSAGE_ERROR';
const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
// Reducer

export const reducerPlugins = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MESSAGE:
      return {
        ...state,
        Message: {
          ...state.Message,
          show: action.payload
        }
      };
    case OPEN_MESSAGE_SUCCESS:
      return {
        ...state,
        Message: {
          ...state.Message,
          show: true,
          message: action.payload.message,
          theme: action.payload.theme
        }
      };
    case OPEN_MESSAGE_INFO:
      return {
        ...state,
        Message: {
          ...state.Message,
          show: true,
          message: action.payload.message,
          theme: action.payload.theme
        }
      };
    case OPEN_MESSAGE_WARNING:
      return {
        ...state,
        Message: {
          ...state.Message,
          show: true,
          message: action.payload.message,
          theme: action.payload.theme
        }
      };
    case OPEN_MESSAGE_ERROR:
      return {
        ...state,
        Message: {
          ...state.Message,
          show: true,
          message: action.payload.message,
          theme: action.payload.theme
        }
      };
    default:
      return state;
  }
};

// Actions
export const getStorage = () => ({
  type: GET_STORAGE
});
export const Success = (message, theme = 'success') => ({
  type: OPEN_MESSAGE_SUCCESS,
  payload: {
    message,
    theme
  }
});
export const Info = (message, theme = 'info') => ({
  type: OPEN_MESSAGE_INFO,
  payload: {
    message,
    theme
  }
});
export const Warning = (message, theme = 'warning') => ({
  type: OPEN_MESSAGE_WARNING,
  payload: {
    message,
    theme
  }
});
export const Error = (message, theme = 'error') => ({
  type: OPEN_MESSAGE_ERROR,
  payload: {
    message,
    theme
  }
});
export const closeMessage = () => ({
  type: CLOSE_MESSAGE,
  payload: false
});
