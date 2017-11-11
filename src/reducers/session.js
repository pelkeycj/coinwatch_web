const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.resp.data,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.resp.data,
      };
    case 'SIGNOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      };
    case 'SIGNIN':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.resp.data,
      };
    default:
      return state;
  }
}
