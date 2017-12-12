const initialState = {
  posts: [],
  curPost: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ('GETTING_POSTS'):
      return state;
    case ('GET_POSTS'):
      return Object.assign({}, state, { posts: action.posts });
    case ('GETTING_POST'):
      return state;
    case ('GOT_POST'):
      return Object.assign({}, state, { curPost: action.curPost });
    default:
      return state;
  }
};
