/**
 * Created by connor on 11/8/17.
 */

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import channel from './channel';

const appReducer = combineReducers({
  form,
  session,
  channel,
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
