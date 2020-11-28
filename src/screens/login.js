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
		return <Redirect to="/home" />;
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

/*class LoginScreen extends React.Component {

	constructor (props){
		super(props);

		this.state = {
			username: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		// TODO setup firebase auth, link with this
		// entered username and password are in this.state
	}

	render(){
		// form for collecting username/password from user
        return (
        	<form onSubmit={this.handleSubmit}>
	            <label for="username">Username:</label><br />
				<input type="text" id="username" name="username" value={this.state.username} /><br />

				<label for="password">Password:</label><br />
				<input type="password" id="password" name="password" value={this.state.password} /><br />

				<input type="submit" value="Submit" />
			</form>
        );
    }

}*/

//export default LoginScreen;