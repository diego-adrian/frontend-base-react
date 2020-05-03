import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducerUser } from './userDuck';
import { reducerPlugins } from './pluginsDuck';
import { reducerLayout } from './layoutDuck';

const rootReducer = combineReducers({
  user: reducerUser,
  layout: reducerLayout,
  plugins: reducerPlugins
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = () => createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default Store;
