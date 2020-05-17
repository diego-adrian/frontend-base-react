// Initial State
const initialState = {
  Alert: {
    show: false,
    text: null,
    width: null
  },
  Confirm: {
    show: false,
    text: null,
    width: null,
    textOk: null,
    textCancel: null,
    callbackOk: () => {},
    callbackCancel: () => {}
  },
  Message: {
    show: false,
    message: null,
    theme: null,
    timeout: 5000
  },
  Waiting: {
    show: false,
    text: null
  }
};

// Constants
const OPEN_MESSAGE_SUCCESS = 'OPEN_MESSAGE_SUCCESS';
const OPEN_MESSAGE_INFO = 'OPEN_MESSAGE_INFO';
const OPEN_MESSAGE_WARNING = 'OPEN_MESSAGE_WARNING';
const OPEN_MESSAGE_ERROR = 'OPEN_MESSAGE_ERROR';
const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

const OPEN_CONFIRM = 'OPEN_CONFIRM';
const CLOSE_CONFIRM = 'CLOSE_CONFIRM';

const OPEN_ALERT = 'OPEN_ALERT';
const CLOSE_ALERT = 'CLOSE_ALERT';

const OPEN_WAITING = 'OPEN_WAITING';
const CLOSE_WAITING = 'CLOSE_WAITING';

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
    case OPEN_CONFIRM: {
      return {
        ...state,
        Confirm: {
          ...state.Confirm,
          show: true,
          text: action.payload.text,
          width: action.payload.width,
          textOk: action.payload.textOk,
          textCancel: action.payload.textCancel,
          callbackOk: action.payload.callbackOk,
          callbackCancel: action.payload.callbackCancel
        }
      };
    }
    case CLOSE_CONFIRM: {
      return {
        ...state,
        Confirm: {
          ...state.Confirm,
          show: false
        }
      };
    }
    case OPEN_ALERT: {
      return {
        ...state,
        Alert: {
          ...state.Alert,
          show: true,
          text: action.payload.text,
          width: action.payload.width
        }
      };
    }
    case CLOSE_ALERT: {
      return {
        ...state,
        Alert: {
          ...state.Alert,
          show: false
        }
      };
    }
    case OPEN_WAITING: {
      return {
        ...state,
        Waiting: {
          ...state.Waiting,
          show: true,
          text: action.payload.text
        }
      };
    }
    case CLOSE_WAITING: {
      return {
        ...state,
        Waiting: {
          ...state.Waiting,
          show: false
        }
      };
    }
    default:
      return state;
  }
};

// Actions
export const openAlert = (text = 'Alerta...', width = 360) => ({
  type: OPEN_ALERT,
  payload: {
    text,
    width
  }
});

export const closeAlert = () => ({
  type: CLOSE_ALERT
});

export const openConfirm = (text = 'Mensaje...', callbackOk = null, callbackCancel = null, textOk = 'Aceptar', textCancel = 'Cancelar', width = 360) => ({
  type: OPEN_CONFIRM,
  payload: {
    text,
    callbackOk: typeof callbackOk === 'function' ? callbackOk : null,
    callbackCancel: typeof callbackCancel === 'function' ? callbackCancel : null,
    textOk,
    textCancel,
    width
  }
});

export const closeConfirm = () => ({
  type: CLOSE_CONFIRM
});

export const openWaiting = (text = 'Espere unos segundos, por favor ...') => ({
  type: OPEN_WAITING,
  payload: {
    text
  }
});

export const closeWaiting = () => ({
  type: CLOSE_WAITING
});

export const MessageSuccess = (message, theme = 'success') => ({
  type: OPEN_MESSAGE_SUCCESS,
  payload: {
    message,
    theme
  }
});
export const MessageInfo = (message, theme = 'info') => ({
  type: OPEN_MESSAGE_INFO,
  payload: {
    message,
    theme
  }
});
export const MessageWarning = (message, theme = 'warning') => ({
  type: OPEN_MESSAGE_WARNING,
  payload: {
    message,
    theme
  }
});
export const MessageError = (message, theme = 'error') => ({
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
