import { combineReducers } from 'redux';
import agGridReducer from './agGridReducers';
import filterReducer from './filterReducers';

const rootReducer = combineReducers({
  agGrid: agGridReducer,
  filterOptions: filterReducer
});

export default rootReducer;
