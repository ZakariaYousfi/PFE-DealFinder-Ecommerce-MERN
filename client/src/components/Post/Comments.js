import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts, deleteComment, editComment } from '../../actions/postActions';
import { timestampParser } from "../Utils";
import { UidContext } from '../AppContext';

const Comments = ({ post }) => {

    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const [edit, setEdit] = useState("");
    const [editText, setEditText] = useState("");

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.username))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(post._id, commentId))
    }

    const handleEditComment = (e, commentId) => {
        e.preventDefault();

        dispatch(editComment(post._id, commentId, editText));
        setEdit("");
        setEditText("");

    }

    return (
        <div className="comments-container">
            {
                post.comments.length > 0 && post.comments.map((comment) => {
                    if (edit === comment._id) {
                        return <form key={comment._id}
                            onSubmit={(e) => {
                                handleEditComment(e, comment._id)
                            }}
                            className="edit-form">
                            <input
                                type="text"
                                name="text"
                                onChange={(e) => setEditText(e.target.value)}
                                value={editText}
                                placeholder="Leave a new comment here ..."
                            />
                            <br />
                            <input type="submit" value="Edit" />
                        </form>
                    } else {
                        return <div className={
                            comment.commenterId === userData._id
                                ? "comment-container client"
                                : "comment-container"
                        } key={comment._id}>
                            <div className="left-part">
                                <NavLink to={uid === comment.commenterId ? "/Profile" : "/User/" + comment.commenterId}>
                                    <img
                                        src={
                                            usersData.length > 0 &&
                                            usersData.map((user) => {
                                                if (user._id === comment.commenterId) return user.picture;
                                                else return null;
                                            })
                                                .join("")
                                        }
                                        alt="commenter-pic"
                                    />
                                </NavLink>
                            </div>
                            <div className="right-part">
                                <div className="comment-header">
                                    <div className="uname">
                                        <h3>{comment.commenterUsername}</h3>
                                    </div>
                                </div>
                                <p>{comment.text}</p>
                                <div className="wrap-me">
                                    <div className="comment-date">{
                                        timestampParser(comment.timestamp)
                                    }</div>
                                    <div className="cmt-icons">
                                        {
                                            comment.commenterId === userData._id && (
                                                <>
                                                    <img onClick={() => { setEdit(comment._id) }} src="/img/icons/edit.svg"
                                                        alt="add-cart" />
                                                    <img onClick={() => { handleDeleteComment(comment._id) }}
                                                        src="/img/icons/trash.svg"
                                                        alt="add-cart" />
                                                </>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                })
            }
            {userData._id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Leave a comment here ..."
                    />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            )}
        </div>
    )
}

export default Comments