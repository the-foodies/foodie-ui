const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default async ({
  poster,
  recipe,
  restaurant,
  text,
}) => {
  const addedComment = await axios.get(`${REST_URL}/api/comment`, {
    params: {
      poster,
      recipe,
      restaurant,
      text,
    },
  });
  return addedComment;
};
