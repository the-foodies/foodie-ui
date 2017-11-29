import { combineReducers } from 'redux';
import testReducer from '../reducers/testReducer';

const allReducers = combineReducers({ testReducer });

export default allReducers;
