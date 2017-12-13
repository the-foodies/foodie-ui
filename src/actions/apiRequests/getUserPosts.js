const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default id => async function (dispatch) {
  dispatch({ type: 'GETTING POSTS' });
  const posts = await axios.get(`${REST_URL}/api/posts`, {
    params: {
      id,
    },
  });
  dispatch({
    type: 'GOT_POSTS',
    posts: posts.data,
  });
};
