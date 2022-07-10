import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost } from '../../actions/postActions';
import { UidContext } from '../AppContext';

const Service = ({ handleClose }) => {


    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [phonenumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("Highly Available");
    const [tags, setTags] = useState("");
    const [err, setErr] = useState([]);
    const [errors, setErrors] = useState(false);

    const handlePost = async (e) => {

        e.preventDefault();

        const servicedata = new FormData();

        servicedata.append("postType", "service");
        servicedata.append("posterName", userData.username);
        servicedata.append("posterId", userData._id);
        servicedata.append("posterPic", userData.picture);
        servicedata.append("file", file);
        servicedata.append("title", title);
        servicedata.append("cord", userData.position);
        servicedata.append("phonenumber", phonenumber);
        servicedata.append("description", description);
        servicedata.append("price", price);
        servicedata.append("stock", "stock");
        servicedata.append("state", "state");
        servicedata.append("availability", availability);
        servicedata.append("tags", tags);

        setErr([]);
        // show the value of the array before sending it
        for (const [key, value] of servicedata) {
            if (value === "") {
                err.push(key);
            }
        }
        console.log(err);
        if (err.length !== 0) {
            setErrors(true);
        }

        if (err.length === 0 && uid) {
            setErrors(false);
            await dispatch(publishPost(servicedata));
            await handleClose();

        }


    }



    return (
        <>
            <form action="" onSubmit={handlePost} className="user-post">
                <br />
                <label htmlFor="file">Select Service Picture</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg , .png" onChange={(e) => setFile(e.target.files[0])}
                />
                <br /><br />
                <input placeholder="Service Title" className="post-input" type="text" id="title" name="title"
                    onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input placeholder="Phone Number" className="post-input" type="text" id="phoneNumber" name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                <br /><br />
                <textarea placeholder="Description" className="disc-input" type="text" id="description" name="description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <br /><br />
                <input placeholder="Price/hour" className="post-input" type="text" id="price" name="price"
                    onChange={(e) => setPrice(e.target.value)} />
                <br /><br />
                <select className="post-input" id="availability" name="availability" onChange={(e) => setAvailability(e.target.value)} >
                    <option name="Highly Available">Highly Available</option>
                    <option name="Available">Available</option>
                    <option name="Hardly  Available">Hardly  Available</option>
                </select>
                <br /><br />
                <input placeholder="Tags separated by comma" className="post-input" type="text" id="tags" name="tags"
                    onChange={(e) => setTags(e.target.value)} />
                <br /><br />
                {err !== "" &&
                    errors && <h4 style={{ color: "#f23629" }} >{"Please fill out this field !"}</h4>
                }
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Service