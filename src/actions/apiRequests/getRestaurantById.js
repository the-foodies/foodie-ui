const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING_POST' });
  const newRestaurant = await axios.get(`${REST_URL}/api/restaurants`, {
    params: {
      id,
    },
  });
  console.log('got restaurant', newRestaurant);
  dispatch({
    type: 'GOT_POST',
    curPost: newRestaurant.data,
  });
};
