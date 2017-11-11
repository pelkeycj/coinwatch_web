const initialState = {
  currentUser: {},
  watched: [],
};

// This is no longer necessary
export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_WATCHING':
      return {
        ...state,
        currentUser: action.resp.data,
        watched: action.resp.data.markets,
      };
    case 'REMOVE_WATCHING':
      return {
        ...state,
        currentUser: action.resp.data,
        watched: action.resp.data.markets,
      };
    default:
      return state;
  }
}
