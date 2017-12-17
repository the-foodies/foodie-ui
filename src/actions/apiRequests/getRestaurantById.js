const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING_RESTAURANT' });
  const newRestaurant = await axios.get(`${REST_URL}/api/restaurants`, {
    params: {
      id,
    },
  });
  dispatch({
    type: 'GOT_RESTAURANT',
    curRestaurant: newRestaurant.data,
  });
  return newRestaurant;
};
