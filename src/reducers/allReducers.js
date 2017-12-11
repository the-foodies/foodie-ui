import { combineReducers } from 'redux';
import modal from '../reducers/modal/modalReducer';
import auth from '../reducers/auth/authFirebaseReducer';
import app from '../reducers/app/appReducer';

const allReducers = combineReducers({ auth, modal, app });

export default allReducers;
