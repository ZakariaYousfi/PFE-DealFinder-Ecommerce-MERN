import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/userActions'
import { dateParser } from '../Utils';

// this component is responsible for the update of the user profile picture
// the profile picture is retrived from our store
const UpdateProfile = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();
    // retriving data from our store
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.userError);

    const handleUpdate = () => {
        // dispatch method calls the method uploadPicture when form is submitted
        dispatch(updateBio(userData._id, bio));
        // this will hide the text area
        setUpdateForm(false);

    }

    // rendring the profile component
    // the src of the image is retrived from our store
    // the path of the profile picture is sent from the db to our store through the userReducer
    // <UploadImg /> is the profile picture form component
    return (
        <div className="profil-container">
            <h1>{userData.username}'s Profile</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Profile Picture</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>About The User</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>modify</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea type="text" defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}></textarea>
                                <button onClick={handleUpdate}>Submit Info</button>
                            </>
                        )}
                    </div>
                    <h4>Joined In : {dateParser(userData.createdAt)}</h4>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;