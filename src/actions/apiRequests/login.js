import * as axios from 'axios';
import { getPosts } from './';

axios.defaults.withCredentials = true;
const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default (email, displayName, profileImageUrl) => async function () {
  axios.post(`${REST_URL}/signup`, { email, displayName, profileImageUrl });
  // dispatch(getPosts());
};
