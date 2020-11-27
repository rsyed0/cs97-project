import React, { Component } from "react"

import firebase from "../firebase";

// class for logging in existing user
class LoginScreen extends React.Component {

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

}

export default LoginScreen;