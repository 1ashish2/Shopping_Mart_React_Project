import * as types from "../actions";

export default function userReducer(state = [], action) {
  const { response, error } = action;

  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...state, response, error };
    case types.LOGIN_USER_ERROR:
      return { ...state, error, response };
    case types.LOGOUT_USER_SUCCESS:
      return { ...state, response: null, error: null };
    case types.LOGOUT_USER_ERROR:
      return { ...state, error, response };
    default:
      return state;
  }
}
