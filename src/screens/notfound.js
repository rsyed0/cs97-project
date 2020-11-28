import React, { Component } from "react"
import logo from '../logo.svg';
import '../App.css';

import { useHistory } from "react-router-dom";

// 404 page
const NotFoundScreen = () => {
	const history = useHistory();

	function gotoHome (){
		history.push("/home");
	}

	return (
		<div>
			<p>Error 404 - Could not find that page.</p>
			<button onClick={this.returnHome}>Return to Home</button>
		</div>
	);

}

export default NotFoundScreen;