import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost } from '../../actions/postActions';
import { UidContext } from '../AppContext';


const Deal = ({ handleClose }) => {

    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("In Stock");
    const [state, setState] = useState("New");
    const [tags, setTags] = useState("");
    const [err, setErr] = useState([]);
    const [errors, setErrors] = useState(false);


    const handlePost = async (e) => {

        e.preventDefault();

        const dealdata = new FormData();

        dealdata.append("postType", "deal");
        dealdata.append("posterName", userData.username);
        dealdata.append("posterId", userData._id);
        dealdata.append("posterPic", userData.picture);
        dealdata.append("file", file);
        dealdata.append("title", title);
        dealdata.append("cord", userData.position);
        dealdata.append("phonenumber", phonenumber);
        dealdata.append("description", description);
        dealdata.append("price", price);
        dealdata.append("stock", stock);
        dealdata.append("state", state);
        dealdata.append("availability", "availability");
        dealdata.append("tags", tags);

        setErr([]);
        // show the value of the array before sending it
        for (const [key, value] of dealdata) {
            if (value === "") {
                err.push(key);
            }
        }

        if (err.length !== 0) {
            setErrors(true);
        }

        if (err.length === 0 && uid) {
            setErrors(false);
            await dispatch(publishPost(dealdata));
            await handleClose();

        }

    }

    return (
        <>
            <form action="" onSubmit={handlePost} className="user-post">
                <br />
                <label htmlFor="file">Select Item Picture</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg , .png" onChange={(e) => setFile(e.target.files[0])}
                />
                <br /><br />
                <input placeholder="Deal Title" className="post-input" type="text" id="title" name="title"
                    onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input placeholder="Phone Number" className="post-input" type="text" id="phoneNumber" name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                <br /><br />
                <textarea placeholder="Description" className="disc-input" type="text" id="description" name="description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <br /><br />
                <input placeholder="Price" className="post-input" type="text" id="price" name="price"
                    onChange={(e) => setPrice(e.target.value)} />
                <br /><br />
                <select className="post-input" id="stock" name="stock" onChange={(e) => setStock(e.target.value)} >
                    <option name="instock">In Stock</option>
                    <option name="singleitem">Single Item</option>
                </select>
                <br /><br />
                <select className="post-input" id="state" name="state" onChange={(e) => setState(e.target.value)} >
                    <option name="new">New</option>
                    <option name="unew">Used Like New</option>
                    <option name="used">Used</option>
                </select>
                <br /><br />
                <input placeholder="Tags separated by comma" className="post-input" type="text" id="tags" name="tags"
                    onChange={(e) => setTags(e.target.value)} />
                <br /><br />
                {
                    errors && <h4 style={{ color: "#f23629" }} >{"Please fill out this field !"}</h4>
                }
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Deal