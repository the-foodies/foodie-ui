import { combineReducers } from 'redux';
import testReducer from '../reducers/testReducer';
import modal from '../reducers/modalReducer';

const allReducers = combineReducers({ testReducer, modal });

export default allReducers;
