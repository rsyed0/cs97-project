import React, { Component } from "react"

import firebase from "../firebase";

// class for signing up new user
class SignupScreen extends React.Component {

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
        return (
        	// form for collecting username/password from user
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

export default SignupScreen;