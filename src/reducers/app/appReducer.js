const initialState = {
  status: null,
  posts: [],
  curRestaurant: {},
  curRecipe: {},
  curUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ('GETTING_POSTS'):
      return Object.assign({}, state, {
        status: 'GETTING_API',
        posts: [],
      });
    case ('GOT_POSTS'):
      return Object.assign({}, state, {
        status: 'GOT_POSTS',
        posts: action.posts,
      });
    case ('GETTING_RESTAURANT'):
      return Object.assign({}, state, {
        status: 'GETTING_API',
        curRestaurant: {},
      });
    case ('GOT_RESTAURANT'):
      return Object.assign({}, state, {
        status: 'GOT_RESTAURANT',
        curRestaurant: action.curRestaurant,
      });
    case ('GETTING_RECIPE'):
      return Object.assign({}, state, {
        status: 'GETTING_API',
        curRecipe: {},
      });
    case ('GOT_RECIPE'):
      return Object.assign({}, state, {
        status: 'GOT_RECIPE',
        curRecipe: action.curRecipe,
      });
    case ('GETTING_USER'):
      return Object.assign({}, state, {
        status: 'GETTING_API',
        curUser: {},
      });
    case ('GOT_USER'):
      return Object.assign({}, state, {
        status: 'GOT_USER',
        curUser: action.user,
      });
    default:
      return state;
  }
};
