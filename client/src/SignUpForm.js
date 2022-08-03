import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { useState, useRef } from 'react';
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function SignUpForm() {

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    function formHandler(e) {
        e.preventDefault();
        const validUserName = USER_REGEX.test(user);
        const validPwd = PWD_REGEX.test(pwd);
        if (!validUserName || !validPwd) {
            setErrMsg("Invalid Entry")
            return;
        }
        console.log("SUBMITTED");
        // axios.post('http://localhost:5000/sign-up', user)
        //     .then(data => console.log(data))
        //     .catch(e => console.log(e));
        // setUser({
        //     username: '',
        //     password: ''
        // });
        // navigate('/blogs');
    }

    return (
        <Container className='mt-3'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'>{errMsg}</p>
            <h1>Register</h1>
            <Form onSubmit={formHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        ref={userRef}
                        value={user}
                        minLength={1}
                        required
                        name="username"
                        placeholder="Username"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        onChange={(e) => setUser(e.target.value)} />
                    <p className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        required
                        minLength={5}
                        name="password"
                        placeholder="Password"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        onChange={(e) => setPwd(e.target.value)} />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </Form.Group>
                <Button variant="primary" size='lg' type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default SignUpForm