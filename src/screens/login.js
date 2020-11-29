import React, { Component, useCallback, useContext } from "react"

import firebase from "../firebase";
import { AuthContext } from "../firebaseauth";

import { useHistory } from "react-router-dom";
import { Redirect, withRouter } from "react-router";

// class for logging in existing user
// from https://github.com/satansdeer/react-firebase-auth/blob/master/src/Login.js
const LoginScreen = () => {
	const history = useHistory();

	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
				history.push("/home");
			} catch (error) {
				alert(error);
			}
		},[history]);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return (<Redirect to="/home" />);
	}

	function gotoLanding (){
		history.push("/");
	}

	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={handleLogin}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Log in</button>
				<button onClick={gotoLanding}>Back</button>
			</form>
		</div>
	);
};

export default withRouter(LoginScreen);