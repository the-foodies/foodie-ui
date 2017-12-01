import axios from 'axios';

export default () => {
  console.log('testing api');
  const URL = 'http://localhost';

  axios.get(`${URL}:4420`)
    .then((res) => {
      console.log('success: ', res);
    }).catch((err) => {
      console.log('error: ', err);
    });

  return {
    type: 'TEST_API',
    payload: {},
  };
};
