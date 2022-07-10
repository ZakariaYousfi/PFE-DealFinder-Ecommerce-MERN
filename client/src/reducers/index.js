import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postReducer from "./postReducer";
import chatReducer from './chatReducer';
import errorReducer from './errorReducer';

// method that combines reducers and exports them to be expolted by the store
// exported to the top of the app as rootReducer
export default combineReducers({
    userReducer,
    postReducer,
    chatReducer,
    usersReducer,
    errorReducer
});