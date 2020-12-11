import React from "react"
import logo from '../logo.svg';
import '../App.css';

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

import { Typography, Button } from 'antd';
const { Title } = Typography;

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
			<div style={{ margin: '180px 0' }} />
			<Typography style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>Welcome to Activ</Title>
            </Typography>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
				<Button type="primary" onClick={gotoSignup}>Sign Up</Button>
				&nbsp;&nbsp;&nbsp; 
				<Button  type="primary" onClick={gotoLogin}>Log In</Button>
			</div>
			{/* <button onClick={goToUpload}>Upload</button>
			<button onClick={goToProfile}>Profile</button>
			<button onClick={goToHome}>Home</button> */}
		</div>
	);
}

export default withRouter(LandingScreen);