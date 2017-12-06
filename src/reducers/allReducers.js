import { combineReducers } from 'redux';
import modal from '../reducers/modal/modalReducer';
import auth from '../reducers/auth/authFirebaseReducer';

const allReducers = combineReducers({ auth, modal });

export default allReducers;
