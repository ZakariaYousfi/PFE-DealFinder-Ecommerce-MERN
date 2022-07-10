import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, deletePost, removeFromCart } from '../../actions/postActions';
import { UidContext } from '../AppContext';
import ArticleService from './ArticleService';
import ArticleDeal from './ArticleDeal';

const Article = ({ postId, handleArticleClose }) => {


    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const posts = useSelector((state) => state.postReducer);

    const handleDeletePost = (e) => {
        e.preventDefault();
        dispatch(deletePost(postId));
        handleArticleClose();
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(AddToCart(postId, uid));
    }

    const handleRemoveCart = (e) => {
        e.preventDefault();
        dispatch(removeFromCart(postId, uid));
    }

    return (
        <div className="article-popup-box">
            <div className="article-box">
                <span className="article-close-icon" onClick={handleArticleClose}>x</span>

                {
                    posts.length > 0 && posts.map((post) => {
                        if (post._id === postId) {
                            if (post.postType === "service") {
                                return <ul className="article-wrapper" key={post._id} >
                                    <ArticleService post={post}
                                        handleDeletePost={handleDeletePost}
                                        handleAddToCart={handleAddToCart}
                                        handleRemoveCart={handleRemoveCart} />
                                </ul>
                            } else {
                                return <ul className="article-wrapper" key={post._id} >
                                    <ArticleDeal post={post}
                                        handleDeletePost={handleDeletePost}
                                        handleAddToCart={handleAddToCart}
                                        handleRemoveCart={handleRemoveCart} />
                                </ul>

                            }
                        } else {
                            return <ul key={post._id}></ul>
                        }
                    })
                }


            </div>
        </div>
    );
}

export default Article