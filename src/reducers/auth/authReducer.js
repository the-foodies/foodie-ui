const initialState = {
  currently: 'ANONYMOUS',
  username: null,
  uid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ATTEMPTING_LOGIN':
      return {
        currently: 'AWAITING_AUTH_RESPONSE',
        username: null,
        uid: null,
      };
    case 'LOGOUT':
      return {
        currently: 'ANONYMOUS',
        username: 'guest',
        uid: null,
      };
    case 'LOGIN_USER':
      return {
        currently: 'LOGGED_IN',
        username: action.username,
        uid: action.uid,
      };
    default: return state;
  }
};

