import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { reducer } from './userDuck';

const rootReducer = combineReducers({
  user: reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = () => createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default Store;
