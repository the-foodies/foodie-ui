const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ('GETTING_POSTS'):
      return state;
    case ('GET_POSTS'):
      return Object.assign({}, state, { posts: action.posts });
    default:
      return state;
  }
};
