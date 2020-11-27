import React, { Component } from "react"
import logo from './logo.svg';
import './App.css';

// landing page
class LandingScreen extends React.Component {
	constructor (props){
		super(props);
	}

	gotoSignup = () => {
		this.props.onChangeScreen("signup");
	}

	gotoLogin = () => {
		this.props.onChangeScreen("login");
	}

	render(){
		return (
			<div>
				<h1>Welcome to the CS 97 Project</h1>
				<button onClick={this.gotoSignup}>Sign Up</button>
				<button onClick={this.gotoLogin}>Log In</button>
			</div>
		);
	}
}

export default LandingScreen;