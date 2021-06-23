import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios';

import "../styles/login.css";

const Login = ({ setUser }) => {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [error, setError] = useState("");
	const [redirect, setRedirect] = useState(false);

	const[loginStatus, setLoginStatus] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault();
		const submitted = { email: emailInput, password: passwordInput };
		Axios.defaults.withCredentials = true;
		setError("");

		try {
			const response = await Axios.post("http://localhost:3001/login", submitted);
			setUser(response.data[0]);
			setRedirect(true);
		} catch (error) {
			setError(error);
		}
	}

	const display = () => {
		if (error) {
			return <p>Login Failed!</p>
		} else if (redirect) {
			return <Redirect to="/account"/>
		}
	}

  //check user is logged in from previous sessions
  useEffect( async () => {
    const response = await Axios.get("http://localhost:3001/login");

		if (response.data.loggedIn === true ) {
      setLoginStatus(response.data.user[0].name);
		}
  }, []);

	return (
		<div className="container-log">
			<h1>Login</h1>
			<form onSubmit={handleSubmit} className="container-form-log">
				<input type="text"
					name="email"
					placeholder="Enter your email here"
					className="bar-log"
					value={emailInput}
					onChange={(e) => { setEmailInput(e.target.value) }} />
				<input type="password"
					name="password"
					placeholder="Enter your password here"
					className="bar-log"
					value={passwordInput}
					onChange={(e) => { setPasswordInput(e.target.value) }} />
				<input type="submit" name="submit" className="form-button-log" value="Submit" />
			</form>
			{display()}
			<p className="register-text">Don't have an account yet: <Link to="/register" className="link-text">Register here!</Link></p>
		</div>
	);
}

export default Login;