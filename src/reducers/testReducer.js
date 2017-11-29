const testStore = function (state = {}, action) {
  switch (action.type) {
    case 'TEST':
      return {};
    default:
      return state;
  }
};

export default testStore;
