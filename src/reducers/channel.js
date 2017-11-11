/*
* Handles channel actions
*/

const initialState = {
  market_data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANNEL_JOIN_SUCCESS':
      return {
        ...state,
        market_data: action.resp.market_data,
      };
    case 'CHANNEL_JOIN_ERROR':
      return state;
    case 'NEW_MARKET_DATA':
      return {
        ...state,
        market_data: action.resp.market_data,
      };
    default:
      return state;
  }
}
