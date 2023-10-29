import { combineReducers } from 'redux';
import agGridReducer from './agGridReducers';

const rootReducer = combineReducers({
  agGrid: agGridReducer,
});

export default rootReducer;
