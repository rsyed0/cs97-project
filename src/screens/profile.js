import React from "react"

import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// TODO set up firestore user data, link with this
// class for viewing profile of another user
const ProfileScreen = () => {
	const history = useHistory();

	function gotoHome(){
		history.push("/home");
	}

	return (
		<div></div>
	);
}

export default withRouter(ProfileScreen);