import React, {useContext} from "react"

import firebase from "../firebase";
import { AuthContext } from "../firebaseauth";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// TODO setup firebase storage, link with this
// class for uploading a video
const UploadScreen = () => {
	const history = useHistory();

	function gotoHome(){
		history.push("/home");
	}

	const { currentUser } = useContext(AuthContext);

	function uploadVideoFile(){
		// check if file matches accepted formats
		// auto-ID video, store with Firebase Storage
		// log video in posts and under user in Firestore
		// use FieldValue.increment(1) to update numVideos
	}

	function gotoLanding (){
		history.push("/");
	}


	return (
		<div>
			<h1>Upload Video</h1>
			<button onClick={uploadVideoFile}>Upload</button>
			<button onClick={gotoLanding}>Back</button>
		</div>
	);
}

export default withRouter(UploadScreen);