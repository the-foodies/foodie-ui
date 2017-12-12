import * as axios from 'axios';
import { getPosts } from './';

axios.defaults.withCredentials = true;
const REST_URL = process.env.REST_URL || 'http://localhost:4420';

export default (email, displayName) => async function (dispatch) {
  await axios.post(`${REST_URL}/signup`, { email, displayName });
  dispatch(getPosts());
};
