import React, { Component, useCallback } from "react";

import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// class for signing up new user
// from https://github.com/satansdeer/react-firebase-auth/blob/master/src/SignUp.js
const SignupScreen = () => {
	const history = useHistory();

	const handleSignUp = useCallback(async event => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		try {
			await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
			// TODO create default user data in firestore
			history.push("/home");
		} catch (error) {
			alert(error);
		}
	}, [history]);

	function gotoLanding (){
		history.push("/");
	}

	return (
		<div>
			<h1>Sign up</h1>
			<form onSubmit={handleSignUp}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Sign Up</button>
			</form>
			<button onClick={gotoLanding}>Back</button>
		</div>
	);
};

export default withRouter(SignupScreen);