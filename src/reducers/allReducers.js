import { combineReducers } from 'redux';
import modal from '../reducers/modalReducer';
import auth from '../reducers/auth/authReducer';

const allReducers = combineReducers({ auth, modal });

export default allReducers;
