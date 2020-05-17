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

let Store;
if (process.env.NODE_ENV === 'development') {
  Store = () => createStore(rootReducer, composeEnhancers(applyMiddleware()));
} else {
  Store = () => createStore(rootReducer);
}

export default Store();
