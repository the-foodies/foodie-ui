export default (param) => {
  return param.split('%2F').join('/');
};
