import React from "react"

import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// TODO setup firebase storage, link with this
// class for uploading a video
const UploadScreen = () => {
	const history = useHistory();

	function gotoHome(){
		history.push("/home");
	}

	return (
		<div></div>
	);
}

export default withRouter(UploadScreen);