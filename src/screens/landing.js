import React from "react"
import logo from '../logo.svg';
import '../App.css';

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// landing page
const LandingScreen = () => {
	const history = useHistory();

	function gotoSignup (){
		history.push("/signup");
	}

	function gotoLogin (){
		history.push("/login");
	}

	return (
		<div>
			<h1>Welcome to the CS 97 Project</h1>
			<button onClick={gotoSignup}>Sign Up</button>
			<button onClick={gotoLogin}>Log In</button>
		</div>
	);
}

export default withRouter(LandingScreen);