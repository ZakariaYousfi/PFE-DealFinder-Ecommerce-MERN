import React, { useState } from 'react';
import Article from '../Post/Article';
import { timestampParser } from "../Utils";
import deal from "../../assets/deal.png";
import service from "../../assets/service.png";

const MyPosts = ({ uid, posts }) => {

    const [showArticle, setShowArticle] = useState(false);
    const [postID, setPostID] = useState("");

    const handleClose = (e) => {
        e.preventDefault();
        setShowArticle(false);
    }

    return (
        <div className="vertical-menu">
            {
                posts.length > 0 && posts.map((post) => {
                    if (post.posterId === uid) {
                        return <div key={post._id}>
                            <h3 className="cart-txt"
                                onClick={() => {
                                    setPostID(post._id);
                                    setShowArticle(true)
                                }}
                            >{post.title} &emsp; last updated: {timestampParser(post.updatedAt)}
                                {
                                    (post.postType === "deal") ? (<img src={deal} alt="deal-icon" />) : (<img src={service} alt="service-icon" />)
                                }
                            </h3>
                            {
                                showArticle && postID === post._id && (
                                    <Article postId={post._id} handleArticleClose={handleClose} />
                                )
                            }
                        </div>
                    } else {
                        return <li key={post._id}></li>
                    }

                })
            }
        </div>
    )
}

export default MyPosts