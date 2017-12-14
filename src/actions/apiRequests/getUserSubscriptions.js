const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING_SUBS' });
  const subscriptions = await axios.get(`${REST_URL}/api/subscriptions`, {
    params: {
      id,
    },
  });
  dispatch({
    type: 'GOT_SUBS',
    subscriptions: subscriptions.data,
  });
};
