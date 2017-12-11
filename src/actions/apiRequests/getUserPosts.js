const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default () => async function (dispatch) {
  dispatch({ type: 'GETTING POSTS' });
  const posts = await axios.get(`${REST_URL}/api/posts`);
  console.log('getting posts', posts);
  dispatch({
    type: 'GET_POSTS',
    posts: posts.data,
  });
};
