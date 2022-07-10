import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = (props) => {

    const [signUpModal, setSignUpModel] = useState(props.signup);
    const [signInModal, setSignInModel] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignUpModel(true);
            setSignInModel(false);
        } else if (e.target.id === "login") {
            setSignUpModel(false);
            setSignInModel(true);
        }
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul className='log-list'>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>SignUp</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>SignIn</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;