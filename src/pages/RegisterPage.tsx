import React, {FormEvent, useState} from "react";
import {TextField} from "../components/TextField";
import "../scss/account/loginAndRegister.scss";
import axios from "axios";

export const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>();

    const tryRegistering = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_LINK}/merger/register`, {
            username,
            email,
            password
        }).catch((err) => {
            if (err.response.status as number === 400) return setErrorMsg(err.response.data.message);
            return console.error(err);
        })
    }

    return (
        <div id="form-window">
            <img src="/images/mergericon.png"/>
            <h2>Sign up to Merger</h2>
            <form onSubmit={tryRegistering}>
                <h6>E-mail</h6>
                <TextField placeholder={"yourname@email.com"} type={"text"} value={email} onChange={setEmail}/>
                <h6>Username</h6>
                <TextField placeholder={"username"} type={"text"} value={username} onChange={setUsername}/>
                <h6>Password</h6>
                <TextField placeholder={"password"} type={"password"} value={password} onChange={setPassword}/>
                <input id="submit-btn" type="submit" value="Sign Up"/>
            </form>
            <div style={errorMsg ? {display: "block"} : {display: "none"}} id="response-box">
                <h4>{errorMsg}</h4>
            </div>
        </div>
    )
}