const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      console.log(action.resp.data);
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
