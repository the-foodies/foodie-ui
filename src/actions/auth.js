import * as firebase from 'firebase';
import auth from '../auth';

export const listenToAuth = () => (dispatch, getState) => {
  auth.onAuthStateChanged((authData) => {
    if (authData) {
      dispatch({
        type: 'AUTH_LOGIN',
        uid: authData.uid,
        username: authData.providerData[0].displayName,
      });
      dispatch({
        type: 'HIDE_MODAL',
      });
    } else if (getState().auth.status !== 'AUTH_ANONYMOUS') {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  });
};

export const openAuthWithProvider = testProvider => (dispatch) => {
  dispatch({ type: 'AUTH_OPEN' });
  // change this when figure out signup auth
  let provider = firebase.auth;
  if (testProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } else if (testProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  console.log('logging in with provider: ', testProvider);
  auth.signInWithPopup(provider).catch((error) => {
    dispatch({
      type: 'FEEDBACK_DISPLAY_ERROR',
      error: `Login failed! ${error}`,
    });
    dispatch({ type: 'AUTH_LOGOUT' });
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'AUTH_LOGOUT' });
  auth.signOut();
};
