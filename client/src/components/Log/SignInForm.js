import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        e.preventDefault();

        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            console.log(res);
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = "/";
            }

        })
            .catch((err) => {
                console.log(err);
            });

    }

    return (

        <form action="" onSubmit={handleLogin} id="sign-up-form" >
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
            <input type="submit" value="Login" />

        </form>

    );
};

export default SignInForm;