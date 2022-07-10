import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/userActions';

const UploadImg = () => {
    // setFile sets file to "urlofuploadedfile"
    const [file, setFile] = useState();
    // dispatch = store or modify data in the database
    const dispatch = useDispatch();
    // userData contains all info about the user
    const userData = useSelector((state) => state.userReducer);

    // handlePicture method will run when the upload picture form is submited 
    const handlePicture = (e) => {
        // preventDefault() will prevent errors
        // in case of errors/null form will not be submited
        e.preventDefault();

        // FormData() creats an object/array of data
        const data = new FormData();
        // here we are getting username/id/uploadedfile of the current user and puting them in the object data
        data.append("name", userData.username);
        data.append("userId", userData._id);
        data.append("file", file);

        // dispatch method calls the method uploadPicture when form is submitted
        dispatch(uploadPicture(data, userData._id));
    };
    return (
        // Profile picture upload form
        // file input(have to be .jpg/.jpeg/.png)
        // onChange catchs the file url when uploaded and setFile sets file to "urlofuploadedfile"
        // submit
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Select You Profile Picture</label>
            <input type="file" id="file" name="file" accept=".jpg, .jpeg , .png"
                onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <input type="submit" value="Submit" />
        </form>

    );
};

export default UploadImg;