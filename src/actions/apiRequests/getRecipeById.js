const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING_RECIPE' });
  const newRecipe = await axios.get(`${REST_URL}/api/recipes`, {
    params: {
      id,
    },
  });
  dispatch({
    type: 'GOT_RECIPE',
    curRecipe: newRecipe.data,
  });
  return newRecipe;
};
