const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default displayName => async function (dispatch) {
  dispatch({ type: 'GETTING_USER' });
  const user = await axios.get(`${REST_URL}/api/users`, {
    params: {
      displayName,
    },
  });
  dispatch({
    type: 'GOT_USER',
    user: user.data,
  });
  return user.data.id;
};
