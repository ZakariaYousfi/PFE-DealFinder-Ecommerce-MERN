import React, { useContext, useEffect } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfile from '../components/Profile/UpdateProfile';
import LeftNav from '../components/LeftNav';
import MyPosts from '../components/Profile/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';

const Profil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {

        dispatch(getPosts());

    }, [dispatch])

    return (
        <div className="profile-p-container">
            <LeftNav />
            <div className="profil-page">
                {uid ? (<>
                    <UpdateProfile />
                    <br /><br />
                    <div className="posts-page">
                        <h1>My Posts :</h1>

                        {<MyPosts uid={uid} posts={posts} />}

                    </div>
                </>
                ) : (
                    <div className="log-container">
                        <Log signin={false} signup={true} />
                        <div className='img-container'>
                            <img src='./img/log.svg' alt='img-log' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profil;