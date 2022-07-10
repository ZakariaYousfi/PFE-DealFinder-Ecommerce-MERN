import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, updatePostPic } from '../../actions/postActions';


const EditDeal = ({ post, setUpdateArticle }) => {

    const dispatch = useDispatch();

    const [file, setFile] = useState();
    const newPicData = new FormData();
    newPicData.append("postId", post._id);
    newPicData.append("file", file);

    const [title, setTitle] = useState(post.title);
    const [price, setPrice] = useState(post.price);
    const [phonenumber, setPhoneNumber] = useState(post.phonenumber);
    const [description, setDescription] = useState(post.description);
    const [stock, setStock] = useState(post.stock);
    const [state, setState] = useState(post.state);
    var availability = post.availability;
    const [tags, setTags] = useState(post.tags);


    const handleEditPost = async (e) => {

        e.preventDefault();

        dispatch(updatePost(post._id, title, phonenumber,
            description, price, stock, state,
            availability, tags))

        dispatch(updatePostPic(post._id, newPicData))

        setUpdateArticle(false)

    }

    return (
        <div style={{ textAlign: "center", marginRight: "25px" }}>
            <label style={{ color: "red" }}>Empty Fields Are Not Going to be Edited !</label>
            <form action="" onSubmit={handleEditPost} className="user-post">
                <br />
                <label htmlFor="file">Edit Item Picture</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg , .png" onChange={(e) => setFile(e.target.files[0])}
                />
                <br /><br />
                <input placeholder="Edit Deal Title" className="post-input" type="text" id="title" name="title"
                    onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input placeholder="Edit Phone Number" className="post-input" type="text" id="phoneNumber" name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                <br /><br />
                <textarea placeholder="Edit Description" className="disc-input" type="text" id="description" name="description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <br /><br />
                <input placeholder="Edit Price" className="post-input" type="text" id="price" name="price"
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
                <input placeholder="Edit Tags separated by comma" className="post-input" type="text" id="tags" name="tags"
                    onChange={(e) => setTags(e.target.value)} />
                <br /><br />
                <input onClick={handleEditPost} style={{ marginRight: "40px", width: "150px" }} type="submit" value="Edit" />
                <input onClick={() => setUpdateArticle(false)} style={{ marginLeft: "40px", width: "150px" }} type="submit" value="Back" />
            </form>
        </div>
    )
}

export default EditDeal