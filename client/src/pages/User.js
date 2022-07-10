import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../actions/postActions';
import { getUsers } from '../actions/usersActions';
import LeftNav from '../components/LeftNav';
import UserProfileInfo from '../components/User/UserProfileInfo';
import MyPosts from '../components/Profile/MyPosts';

const User = () => {

    let params = useParams();
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.usersReducer);
    const posts = useSelector((state) => state.postReducer);


    useEffect(() => {
        dispatch(getUsers());
        dispatch(getPosts());
    }, [dispatch]);


    return (
        <div className="profile-p-container">
            <LeftNav />
            <div className="profil-page">
                {
                    usersData.length > 0 && (
                        usersData.map((user) => {
                            if (user._id === params.userId) {
                                return <UserProfileInfo key={user._id} user={user} />
                            } else return <li key={user._id}></li>
                        })
                    )
                }
                <br /><br />
                <div className="posts-page">
                    <h1>Users Posts :</h1>

                    <MyPosts uid={params.userId} posts={posts} />

                </div>
            </div>
        </div>
    )
}

export default User