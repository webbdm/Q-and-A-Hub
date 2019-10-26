import { createStore } from 'redux';
import { combineReducers } from 'redux';

import appReducer from './modules/appReducer';

const rootReducer = combineReducers({
    appReducer: appReducer, 
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;