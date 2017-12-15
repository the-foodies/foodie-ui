const axios = require('axios');

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default async ({
  poster,
  recipe,
  restaurant,
  comment,
}) => {
  const addedComment = await axios.post(`${REST_URL}/api/comment`, {
    poster,
    recipe,
    restaurant,
    comment,
  });
  return addedComment;
};
