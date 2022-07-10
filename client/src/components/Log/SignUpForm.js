import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setcontrolPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const userNameError = document.querySelector('.username.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";
        userNameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML = "Wrong Password Confirmation"
            }
            if (!terms.checked) {
                termsError.innerHTML = "Please Read Terms and Conditions and Check the Box"
            }
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials: true,
                data: {
                    username: username,
                    email: email,
                    password: password,
                }
            }).then((res) => {
                console.log(res);
                if (res.data.errors) {
                    userNameError.innerHTML = res.data.errors.username;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);

                }

            })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    return (
        <>
            {formSubmit ? (<>
                <SignInForm />
                <h4 className="success" >Registration Successfully Submitted</h4>
            </>) : (

                <form action="" onSubmit={handleRegister} id="sign-up-form" >
                    <label htmlFor='username'>UserName</label>
                    <br />
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue=""
                    />
                    <div className='username error'></div>
                    <br />
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue=""
                    />
                    <div className='email error'></div>
                    <br />
                    <label htmlFor='password'>Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue=""
                    />
                    <div className='password error'></div>
                    <br />
                    <label htmlFor='password-conf'>Confirm Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password-conf"
                        onChange={(e) => setcontrolPassword(e.target.value)}
                        defaultValue=""
                    />
                    <div className='password-confirm error'></div>
                    <br />
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        Agree to
                        <a href="/"
                            target="_blank"
                            rel="nooopner noreferrer"> Terms and Conditions
                        </a>
                    </label>
                    <div className='terms error'></div>
                    <br />
                    <input type="submit" value="Register" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;