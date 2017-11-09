const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.resp.data,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
