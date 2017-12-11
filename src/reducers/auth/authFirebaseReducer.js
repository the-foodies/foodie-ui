const initialState = {
  status: 'AUTH_ANONYMOUS',
  displayName: 'guest',
  email: 'temp',
  photoURL: 'temp',
  uid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_OPEN':
      return {
        status: 'AUTH_AWAITING_RESPONSE',
        displayName: 'guest',
        email: 'temp',
        photoURL: 'temp',
        uid: null,
      };
    case 'AUTH_LOGIN':
      return {
        status: 'AUTH_LOGGED_IN',
        displayName: action.displayName,
        email: action.email,
        photoURL: action.photoURL,
        uid: action.uid,
      };
    case 'AUTH_LOGOUT':
      return {
        status: 'AUTH_ANONYMOUS',
        displayName: 'guest',
        email: 'temp',
        photoURL: 'temp',
        uid: null,
      };
    default: return state;
  }
};

