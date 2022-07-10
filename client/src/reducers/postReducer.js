import {
    GET_POSTS, PUBLISH_POST,
    DELETE_POST, UPDATE_POST,
    UPDATE_POST_PICTURE, ADD_TO_CART_POST,
    REMOVE_FROM_CART_POST, EDIT_COMMENT,
    DELETE_COMMENT
} from "../actions/postActions";

const initialState = {};


export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case GET_POSTS:
            return action.payload;

        case PUBLISH_POST:
            return action.payload;

        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);

        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        title: action.payload.title,
                        phonenumber: action.payload.phonenumber,
                        description: action.payload.description,
                        price: action.payload.price,
                        stock: action.payload.stock,
                        state: action.payload.state,
                        availability: action.payload.availability,
                        tags: action.payload.tags,
                    };
                } else return post;
            });

        case UPDATE_POST_PICTURE:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        picture: action.payload.picture,
                    };
                } else return post;
            });

        case ADD_TO_CART_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        addersToCart: [action.payload.userId, ...post.addersToCart],
                    };
                }
                return post;
            });

        case REMOVE_FROM_CART_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        addersToCart: post.addersToCart.filter((id) => id !== action.payload.userId),
                    };
                }
                return post;
            });

        case EDIT_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text,
                                };
                            } else {
                                return comment;
                            }
                        }),
                    };
                } else return post;
            });

        case DELETE_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(
                            (comment) => comment._id !== action.payload.commentId
                        ),
                    };
                } else return post;
            });

        default:
            return state;
    }
}