import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { UidContext } from '../AppContext';
import Comments from './Comments';
import EditDeal from './EditDeal';
import { timestampParser } from "../Utils";
import { useDispatch } from 'react-redux';
import { addThread } from '../../actions/chatActions';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';


const ArticleDeal = ({ post, handleDeletePost, handleAddToCart, handleRemoveCart }) => {

    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const history = useHistory();

    const [updateArticle, setUpdateArticle] = useState(false);
    const [added, setAdded] = useState(false)

    const [reported, setReported] = useState(false);
    const [reportClicked, setReportClicked] = useState(false);
    const reportRef = useRef();
    var reportReason;

    useEffect(() => {
        if (post.addersToCart.includes(uid)) setAdded(true)
    }, [uid, post.addersToCart, added])

    const Messageperson = () => {

        const { posterId, posterPic, posterName } = post

        dispatch({ type: addThread, payload: { id: posterId, username: posterName, img: posterPic, lastMessage: '' } });

        history.push('/chat');

    }

    const reportPost = async (reportReason) => {
        await axios.post('/api/reports', {
            reportedData: 'post',
            reportedDataId: post._id,
            reportBody: reportReason
        })
            .then((res) => { console.log(res.data); setReported(true); })
            .catch((err) => console.log(err))
    }

    const submitReport = (e) => {
        e.preventDefault();
        reportReason = reportRef.current.value;
        setReportClicked(false);
        reportPost(reportReason);
    }

    return (
        <>
            {updateArticle && (
                <EditDeal post={post} setUpdateArticle={setUpdateArticle} />
            )}

            {
                !updateArticle && (
                    <>
                        <h2>Deal Title:</h2>
                        <p className="article-fields" type="text" >{post.title}</p>
                        {
                            uid && uid !== post.posterId && (
                                <div className="poster">
                                    <NavLink to={uid === post.posterId ? "/Profile" : "/User/" + post.posterId}>
                                        <img className="user-img" src={post.posterPic} alt="post-pic" />
                                    </NavLink>

                                    <h4 className="article-send-message" type="text" onClick={() => Messageperson()}>Message Me</h4>
                                </div>
                            )}
                        {
                            !uid && (
                                <div className="poster">
                                    <img className="user-img" src={post.posterPic} alt="post-pic" />
                                </div>
                            )
                        }
                        <br /><br />
                        {
                            post.picture && (<img className="article-img" src={post.picture} alt="post-pic" />)
                        }
                        <br /><br />
                        <h3>Description:</h3><p className="article-description" type="text" >{post.description}</p>
                        <br /><br />
                        <h3>Phone Number:</h3><p className="article-fields" type="text" >{post.phonenumber}</p>
                        <br /><br />
                        <h3>Stock:</h3><p className="article-fields" type="text" >{post.stock}</p>
                        <br /><br />
                        <h3>State:</h3><p className="article-fields" type="text" >{post.state}</p>
                        <br /><br />
                        <h3>Price:</h3><p className="article-fields" type="text" >{post.price}</p>
                        <br /><br />
                        <h3>Tags:</h3><p className="article-tags" type="text" >{post.tags}</p>
                        <br /><br />
                        <h4 style={{ float: "right" }}>{timestampParser(post.updatedAt)}</h4>
                        <br /><br />
                        {uid !== post.posterId && (
                            reportClicked ?
                                <form className="report-form" onSubmit={submitReport}>
                                    <input
                                        ref={reportRef}
                                        placeholder="Reason ?"
                                        style={{ padding: '10px' }}></input>
                                    <button>Send</button>
                                </form> :
                                <button onClick={() => setReportClicked(true)}
                                    disabled={reported ? true : false}
                                    style={reported ? { float: "right", color: "green" } :
                                        { float: "right", color: "#f23629" }}>
                                    {reported ? 'Deal has been Reported!' :
                                        'Report Deal'}</button>
                        )}
                        <br /><br />
                        {
                            uid && (
                                <>
                                    <>
                                        <div className="post-buttons">
                                            {post.posterId !== uid && (
                                                <img onClick={(e) => {
                                                    if (added) {
                                                        handleRemoveCart(e);
                                                        setAdded(false)
                                                        console.log("Removed")
                                                    } else {
                                                        handleAddToCart(e);
                                                        setAdded(true)
                                                        console.log("Added")
                                                    }
                                                }} className="addcart-post"
                                                    src={added ? "/img/icons/addedcart.png" : "/img/icons/addcart.png"}
                                                    alt="addcart-post" />
                                            )}

                                            {post.posterId === uid && (
                                                <div className="edit-trash">
                                                    <img onClick={() => { setUpdateArticle(true) }} src="/img/icons/edit.svg"
                                                        alt="add-cart" />

                                                    <img onClick={handleDeletePost} src="/img/icons/trash.svg"
                                                        alt="add-cart" />

                                                </div>
                                            )}


                                        </div>


                                    </>
                                    <br />
                                    <h3>Comments:</h3>

                                    <Comments post={post} />

                                    <br />
                                </>
                            )
                        }
                        {!uid && (
                            <>
                                <br />
                                <label>
                                    <a style={{ color: "#dd5353" }} href="/profile"
                                        target="_self"
                                        rel="nooopner noreferrer">Login
                                    </a> or <a style={{ color: "#dd5353" }} href="/profile"
                                        target="_self"
                                        rel="nooopner noreferrer">SignUp
                                    </a> to View Comments !
                                </label>
                            </>
                        )}
                    </>
                )
            }

        </>





    )
}
export default ArticleDeal