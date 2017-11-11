const initialState = {
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_WATCHING':
      console.log('added watching', action.resp);
      return {
        ...state,
        currentUser: action.resp.data,
      };
    case 'REMOVE_WATCHING':
      console.log('removed watching', action.resp);
      return {
        ...state,
        currentUser: action.resp.data,
      };
    default:
      return state;
  }
}
