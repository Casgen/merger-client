import React, { FormEvent, useState } from "react";
import { TextField } from "../components/TextField";
import "../scss/account/loginAndRegister.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {

	const history = useHistory()

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");

	const tryLoggingIn = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (email.length === 0 || password.length === 0) return setErrorMsg("some required fields are empty! please fill all the given fields.");

		/*It has to be set with credentials, otherwise the cookie (which was generated from the backend) wont be sent to the
		 back-end server.*/
		axios.post(`${process.env.REACT_APP_API_LINK}/merger/login`, {
			email,
			password
		}, { withCredentials: true }).then((res) => {
			history.push("/");
			history.go(0);
		}).catch((err) => {
			if (err.response.status as number === 403) return setErrorMsg(err.response.data.message);
		})
	}

	return (
		<div id="login-forms">
			<div id="form-window">
				<img src="/images/mergericon.png" alt="Merger icon" />
				<h2>Login to Merger</h2>
				<form onSubmit={tryLoggingIn}>
					<h6>E-mail</h6>
					<TextField placeholder={"yourname@email.com"} type={"text"} value={email} onChange={setEmail} />
					<h6>Password</h6>
					<TextField placeholder={"password"} type={"password"} value={password} onChange={setPassword} />
					<input id="submit-btn" type="submit" value="Login" />
				</form>
				<div style={errorMsg ? { display: "block" } : { display: "none" }} id="response-box">
					{errorMsg}
				</div>
			</div>
			<div id="spotify-login">
				<img src="/images/spotify.png" alt="Spotify img" />
				<p>
				<a href={`${process.env.REACT_APP_API_LINK}/spotify/auth/login`}>Login</a> with Spotify
				</p>
			</div>
		</div>
	)
}
