import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, UPDATE_POSITION } from "../actions/userActions";
// initial State : null at first
const initialState = {};

// userReducer method will store the data sent by the userActions/one of the methods in it in our store
// state will contain the current and the previous data in the store
export default function userReducer(state = initialState, action) {
    // the loaded data will be accesble by all the componets in our app

    switch (action.type) {
        case GET_USER:
            // loading the user data in our store
            return action.payload
        case UPLOAD_PICTURE:
            // loading the previous data and our picture path in the store
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            // loading the previous data and our updated bio in the store
            return {
                ...state,
                bio: action.payload
            }
        case UPDATE_POSITION:
            // loading the previous data and our updated position in the store
            return {
                ...state,
                position: action.payload
            }
        default:
            return state
    }
}