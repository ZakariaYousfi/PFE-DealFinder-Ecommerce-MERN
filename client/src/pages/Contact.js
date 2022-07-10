import { useState, useRef } from 'react';
import axios from '../axios';
import LeftNav from '../components/LeftNav';

const Contact = () => {

    const [contacted, setContacted] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const bodyRef = useRef();

    const apiCall = (e) => {

        e.preventDefault();

        const contactName = nameRef.current.value;

        const contactEmail = emailRef.current.value;

        const contactBody = bodyRef.current.value;

        axios.post('/api/contacts/', { contactName, contactEmail, contactBody })
            .then((res) => res.data ? setContacted(true) : console.log('no response'))
            .catch(err => console.log(err));

        nameRef.current.value = '';
        emailRef.current.value = '';
        bodyRef.current.value = '';

    }

    return (
        <div className="contact-p-container">
            <LeftNav />
            <div className="contact-page">
                {contacted ? <h1>Thank You For Your Message</h1> :
                    <div >
                        <br />
                        <h1>Contact Us :</h1>
                        <form className="message-form" onSubmit={apiCall}>
                            <br /><br />
                            <input className="message-fields" placeholder='Enter Your Full Name' ref={nameRef} ></input>
                            <br /><br />
                            <input className="message-fields" placeholder='Enter Your Contact Email' ref={emailRef}  ></input>
                            <br /><br />
                            <textarea className="message" placeholder='Enter Your Message Here' ref={bodyRef} ></textarea>
                            <br /><br />
                            <button disabled={contacted}>CONTACT</button>
                        </form>
                    </div>}
            </div>
        </div>
    )

}

export default Contact;