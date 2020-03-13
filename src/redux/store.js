import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducer } from './userDuck';
import { reducerLayout } from './layoutDuck';

const rootReducer = combineReducers({
  user: reducer,
  layout: reducerLayout
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = () => createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default Store;
