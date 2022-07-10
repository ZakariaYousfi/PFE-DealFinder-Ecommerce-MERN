import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import { UidContext } from '../components/AppContext';
import FavList from '../components/Cart/FavList';
import LeftNav from '../components/LeftNav';



const Chart = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const uid = useContext(UidContext);

    useEffect(() => {

        dispatch(getPosts());

    }, [dispatch])



    return (
        <div className="cart-p-container">
            <LeftNav />
            <div className="cart-page">
                <h1>Your Cart :</h1>
                <div className="cart-container">
                    <FavList uid={uid} posts={posts} />
                </div>
            </div>
        </div>

    )
};

export default Chart;