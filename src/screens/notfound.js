import React, { Component } from "react"
import logo from '../logo.svg';
import '../App.css';

// 404 page
class NotFoundScreen extends React.Component{

	constructor (props){
		super(props);
	}

	returnHome = () => {
		this.props.onChangeScreen("home");
	}

	render(){
		return (
			<div>
				<p>Error 404 - Could not find that page.</p>
				<button onClick={this.returnHome}>Return to Home</button>
			</div>
		);
	}
}

export default NotFoundScreen;