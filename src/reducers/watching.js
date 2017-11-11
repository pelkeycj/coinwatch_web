const initialState = {
  currentUser: {},
};

//  TODO state should keep track of which are watched and which are not?
export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_WATCHING':
      console.log('added watching', action.resp.data);
      return Object.assign({}, state, {
        currentUser: action.resp.data,
      });
    case 'REMOVE_WATCHING':
      console.log('removed watching', action.resp.data);
      return {
        ...state,
        currentUser: action.resp.data,
      };
    default:
      return state;
  }
}
