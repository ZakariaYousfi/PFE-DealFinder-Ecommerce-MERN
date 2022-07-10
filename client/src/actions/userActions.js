// library that imports data from our data base
import axios from "axios";

// this will be called by userReducer() methode
// using the dispatch method , the data will be directly sent when the userReducer calls one of these keywords
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

// uid is the user id , it was imported from the data base when the user logged in
/* getUser method will be called once to get the users data from the Db and store it in our store
it will allow us to do one query get the user info to upgarde the user profile instead of 
doing querys everytime the page reloads */

export const getUser = (uid) => {
    // dispatch sends data to the reducer 
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                // sending data to reducer
                dispatch({ type: GET_USER, payload: res.data })
            }).catch(err => console.log(err));
    }
}
// uploadPicture is a method that allows the user to upload his profile picture
//when the upload pic form is submotted this method will run
// id is the user Id
// data is a formData that contains info about the profile picture
export const uploadPicture = (data, id) => {

    return (dispatch) => {
        // sending query to the DB
        return axios
            // post will update the default picture path in our DB for the user (id)
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
                } else {
                    // sending another query to the DB 
                    return axios
                        // this time we want to get the data in order to store it in our store
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        // sending data to reducer
                        .then(res => dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture }))
                        // error
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    };
}
// updateBio is a method that takes the user id and the bio after the submittion of the user
// then save it in the DB
export const updateBio = (userId, bio) => {
    return (dispatch) => {
        // sending query to the DB
        return axios
            // put will update the bio in our DB for the user (id)
            .put(`${process.env.REACT_APP_API_URL}api/user/` + userId, { bio })
            .then(res => {
                // sending data to reducer
                dispatch({ type: UPDATE_BIO, payload: bio })
            }).catch(err => console.log(err));
    }
}


export const updatePosition = (userId, position) => {
    return (dispatch) => {
        // sending query to the DB
        return axios
            // put will update the bio in our DB for the user (id)
            .put(`${process.env.REACT_APP_API_URL}api/user/position/` + userId, { position })
            .then(res => {
                // sending data to reducer
                dispatch({ type: UPDATE_POSITION, payload: position })
            }).catch(err => console.log(err));
    }
}