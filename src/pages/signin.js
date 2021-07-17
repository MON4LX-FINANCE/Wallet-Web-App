// Sign In Page
import React, { useState } from 'react';
import axios from 'axios';
import { getUser, setUserSession } from '../helpers/auth';
import { apiUrl } from '../helpers/constants';
import { Link } from "react-router-dom";
// import logo from "../assets/images/logo.png";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function SignIn(props) {
    const email = useFormInput('');
    const password = useFormInput('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(null);

    const validateEmail = (email) => {
        const res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (res.test(String(email).toLowerCase())) {
            setEmailError(false);
            return true;
        } else {
            setEmailError(true);
            return false;
        }
    }

    const validatePassword = (password) => {
        if (password.length > 5) {
            setPasswordError(false);
            return true;
        } else {
            setPasswordError(true);
            return false;
        }
    }

    const handleLogin = () => {
        setLoading(true);
        if (validateEmail(email.value) && validatePassword(password.value)) {
            axios.post(apiUrl + '/users/login', { email: email.value, password: password.value }).then(response => {
                setLoading(false);
                // console.log('response', response);
                let data = response.data;

                if (Object.keys(data).length > 0) {
                    let userExists = getUser();
                    if (userExists) {
                        // console.log('if', userExists);
                        props.history.push({
                            pathname: '/dash',
                            state: { user: userExists }
                        });
                    } else {
                        setUserSession(response.data);
                        let newUser = getUser();
                        // console.log('else', newUser);
                        props.history.push({
                            pathname: '/dash',
                            state: { user: newUser }
                        });
                    }
                } else
                    alert("Invalid credentials! Please check your username and password.");
            }).catch(error => {
                setLoading(false);
                // console.log(error);
                alert("An error occured. Please try again later.");
            });
        } else
            setLoading(false);
    }

    const login = () => {
        setLoading(true);
        if (validateEmail(email.value) && validatePassword(password.value)) {
            setLoading(false);
            props.history.push('/dash');
        } else
            setLoading(false);
    }

    return (
        <div className="login-body">
            <main className="form-signin h-100">
                <form>
                    {/* <img className="mb-4" src={logo} alt="" width="300" height="auto" /> */}
                    <h1 className="mb-3 fw-normal text-center">Mon4lx</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" {...email} />
                        <label for="floatingInput">Email address</label>
                        {emailError ? <p className="mt-2 mb-3 text-danger">
                            Invalid email address!
                        </p> : null}
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...password} />
                        <label for="floatingPassword">Password</label>
                        {passwordError ? <p className="mt-2 mb-3 text-danger">
                            Password should be atleast 6 characters!
                        </p> : null}
                    </div>

<div className="row my-3">
                    <div className="col-6 checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <div className="col-6">
                        <Link to="page-forgot-password.html">Forgot Password?</Link>
                    </div>
</div>
                    <div className="text-center">
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={login} disabled={loading}>
                            {loading ? 'Loading... ' : 'Sign in '}
                            {loading ? <span className="spinner-border spinner-border float-end" role="status" aria-hidden="true"></span> : null}
                        </button>
                    </div>
                    <div className="new-account mt-3">
                        <p>Don't have an account? <Link className="text-primary"
                            to="./page-register.html">Sign up</Link></p>
                    </div>
                    <p className="my-3 text-center text-muted">&copy; Mon4lx 2021</p>
                </form>
            </main>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default SignIn;