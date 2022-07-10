import LeftNav from '../components/LeftNav';
import Maps from '../components/Home/Maps';
import SearchBox from '../components/Home/SearchBox';
import { useContext, useEffect, useState } from 'react';
import Post from '../components/Post/Post';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/postActions';
import { UidContext } from '../components/AppContext';


const Home = () => {


    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [postActive, setPostAcive] = useState(false);
    const [loadPost, setLoadPost] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleClose = () => { setPostAcive(false) };


    useEffect(() => {
        if (loadPost === true) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [searchValue, postActive, loadPost, dispatch])

    return (
        <div className="home-p-container">
            <LeftNav />
            <div className="home">
                <div className="home-content">
                    <Maps postActive={postActive} searchValue={searchValue} />
                    <SearchBox placeholder="Look for a deal !"
                        setSearchValue={setSearchValue} />
                    {
                        uid && (
                            <button className="post-button" onClick={() => {
                                navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                                    if (result.state === "denied" || result.state === "prompt") {
                                        alert("Please Turn On The Geolocation !");
                                    } else {
                                        setPostAcive(true)
                                    }
                                })
                            }} >Post</button>
                        )
                    }
                </div>
            </div>
            {
                postActive === true && uid !== null && (
                    <Post handleClose={handleClose} />
                )
            }
        </div>
    );
};

export default Home;
