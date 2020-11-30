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
	
	function goToUpload (){
		history.push("/upload");
	}

	function goToHome (){
		history.push("/home");
	}

	function goToProfile (){
		history.push("/profile");
	}

	return (
		<div id="landing-page-content">
			<h1>Welcome to the CS 97 Project</h1>
			<button onClick={gotoSignup}>Sign Up</button>
			<button onClick={gotoLogin}>Log In</button>
			<button onClick={goToUpload}>Upload</button>
			<button onClick={goToProfile}>Profile</button>
			<button onClick={goToHome}>Home</button>
		</div>
	);
}

export default withRouter(LandingScreen);