const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING_RECIPE' });
  const newRestaurant = await axios.get(`${REST_URL}/api/recipes`, {
    params: {
      id,
    },
  });
  console.log('got recipe', newRestaurant);
  dispatch({
    type: 'GOT_RECIPE',
    curRecipe: newRestaurant.data,
  });
};
