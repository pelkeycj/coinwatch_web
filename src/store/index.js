/**
 * Created by connor on 11/8/17.
 */

// import reducers and applies middleware

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleWare = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
