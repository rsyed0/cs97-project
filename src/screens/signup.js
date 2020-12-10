import React, { Component, useCallback } from "react";


import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// class for signing up new user
// from https://github.com/satansdeer/react-firebase-auth/blob/master/src/SignUp.js
const SignupScreen = () => {
	const history = useHistory();

	function createDefaultUserData(email){
		const ref = firebase.firestore().collection("users");

		// use FirebaseUser id, not random/auto
		const currentUser = firebase.auth().currentUser;
		if (!currentUser){
			return false;
		} else {
			ref.doc(currentUser.uid).set({
				email: email,
				userId: currentUser.uid,
				numFollowers: 0,
				numFollowing: 0,
				numVideos: 0
			});
			ref.doc(currentUser.uid).collection("followers").add({userId: ""});
			ref.doc(currentUser.uid).collection("following").add({userId: ""});
			ref.doc(currentUser.uid).collection("videos").add({postId: ""});
		}

		return true;
	}

	const handleSignUp = useCallback(async event => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		try {
			await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

			// create default user data in firestore
			createDefaultUserData(email.value);

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