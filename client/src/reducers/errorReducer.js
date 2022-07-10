import { GET_POST_ERRORS } from "../actions/postActions";
import { GET_USER_ERRORS } from "../actions/userActions";

const initialState = { userError: [], postError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: []
      }
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: []
      }
    default:
      return state;
  }
}