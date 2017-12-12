const initialState = {
  posts: [],
  curRestaurant: {},
  curRecipe: {},
  curUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ('GETTING_POSTS'):
      return state;
    case ('GET_POSTS'):
      return Object.assign({}, state, { posts: action.posts });
    case ('GETTING_RESTAURANT'):
      return state;
    case ('GOT_RESTAURANT'):
      return Object.assign({}, state, { curRestaurant: action.curRestaurant });
    case ('GETTING_RECIPE'):
      return state;
    case ('GOT_RECIPE'):
      return Object.assign({}, state, { curRecipe: action.curRecipe });
    case ('GETTING_USER'):
      return state;
    case ('GOT_USER'):
      return Object.assign({}, state, { curUser: action.curUser });
    default:
      return state;
  }
};
