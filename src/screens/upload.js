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

	function uploadVideoFile(){
		// check if file matches accepted formats
		// auto-ID video, store with Firebase Storage
		// log video in posts and under user in Firestore
		// use FieldValue.increment(1) to update numVideos
	}

	return (
		<div></div>
	);
}

export default withRouter(UploadScreen);