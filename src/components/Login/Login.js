/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/kgp-logo.png";
import userAPI from "../../apis/userAPI";
import { USER_TOKEN, USER_NAME, USER_ID } from "../../constants/appConstants";
import "./Login.css";

const Login = () => {
	const history = useHistory();
	const [username, setUserName] = useState([]);
	const [password, setPassword] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const token = localStorage.getItem(USER_TOKEN);
		if (token) {
			history.replace("/");
		} else {
			history.replace("/login");
		}
	}, []);

	const handleChangeUserName = (event) => {
		const value = event.target.value;
		setUserName(value);
	};

	const handleChangePassword = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const handleSubmitLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await userAPI.login(username, password);
			console.log(response);
			if (response.data) {
				localStorage.setItem(USER_TOKEN, response.data.token);
				localStorage.setItem(USER_NAME, response.data.user.firstName);
				localStorage.setItem(USER_ID, response.data.user._id);
				history.replace("/");
				setMessage("");
			} else {
				setMessage(response.data.message);
				console.log(message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="Login">
			<div className="header">
				<img src={logo} alt="logo" />
			</div>
			<div className="body">
				<div className="form-login">
					<form autoComplete="on">
						<label>User name</label>
						<input
							type="text"
							placeholder="Email Address"
							name="username"
							onChange={handleChangeUserName}
						/>
						<label>Password</label>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChangePassword}
						/>
						<input
							type="submit"
							value="LOGIN"
							onClick={handleSubmitLogin}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
