import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const PUBLISH_POST = "PUBLISH_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST"
export const UPDATE_POST_PICTURE = "UPDATE_POST_PICTURE"
export const ADD_TO_CART_POST = "ADD_TO_CART_POST";
export const REMOVE_FROM_CART_POST = "REMOVE_FROM_CART_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";


export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                // sending data to reducer
                dispatch({ type: GET_POSTS, payload: res.data })
            }).catch(err => console.log(err));

    }
}

export const publishPost = (postdata) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/post/`, postdata)
            .then((res) => {
                return axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/post/`,
                }).then((res) => {
                    dispatch({ type: PUBLISH_POST, payload: res.data });
                });
            }
            )
            .catch(err => console.log(err));
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePost = (postId, title, phonenumber,
    description, price, stock,
    state, availability, tags) => {


    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: {
                title, phonenumber,
                description, price, stock, state,
                availability, tags
            },
        })
            .then((res) => {
                dispatch({
                    type: UPDATE_POST, payload: {
                        title, phonenumber,
                        description, price, stock, state,
                        availability, tags, postId
                    }
                });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePostPic = (postId, data) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/post/upload`, data)
            .then((res) => {
                return axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
                }).then((res) => {
                    dispatch({ type: UPDATE_POST_PICTURE, payload: { picture: res.data.picture, postId } });
                });
            })
            .catch((err) => console.log(err));
    };
};

export const AddToCart = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/addToCart-post/` + postId,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: ADD_TO_CART_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const removeFromCart = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/removeFromCart-post/` + postId,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: REMOVE_FROM_CART_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (postId, commenterId, text, commenterUsername) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterUsername },
        })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data: { commentId, text },
        })
            .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data: { commentId },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
            })
            .catch((err) => console.log(err));
    };
};