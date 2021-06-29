import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/authReducer';
import memoryReducer from './reducers/memoryReducer';

const reducer = combineReducers({
      userReducer, memoryReducer
});

const enhanceMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, enhanceMiddleware(applyMiddleware(thunk)));
export default store;
