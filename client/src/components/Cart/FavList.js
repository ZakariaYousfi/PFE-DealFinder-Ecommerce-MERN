import React, { useState } from 'react';
import Article from '../Post/Article';

const FavList = ({ uid, posts }) => {

    const [showArticle, setShowArticle] = useState(false);
    const [postID, setPostID] = useState("");

    const handleClose = (e) => {
        e.preventDefault();
        setShowArticle(false);
    }

    return (
        <div className="vertical-menu-fav">
            {
                posts.length > 0 && posts.map((post) => {
                    if (post.addersToCart.includes(uid)) {
                        return <div key={post._id}>
                            <h3 className="cart-txt"
                                onClick={() => {
                                    setPostID(post._id);
                                    setShowArticle(true);
                                }}
                            >{post.title} by {post.posterName}
                                <img src="./img/icons/addedcart.png" alt="added-icon" /></h3>
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

export default FavList