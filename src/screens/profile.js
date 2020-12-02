import React from "react"

import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

import { Redirect } from "react-router-dom";

// TODO set up firestore user data, link with this
// class for viewing profile of another user
class ProfileScreen extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			profileId: null,
			profileEmail: null,
			numFollowers: 0,
			numFollowing: 0,
			numVideos: 0,
			isLoggedUserFollowing: false,
			canFollow: false,
		};
	}

	componentDidMount(){
		// get ID of profile to be viewed from link
		var { profileId } = this.props.match.params;
		profileId = profileId.substring(1);

		// get logged in user object
		const currentUser = firebase.auth().currentUser;

		this.setState({
			profileId: profileId,
			canFollow: (profileId !== currentUser.uid),
		});

		const context = this;

		const ref = firebase.firestore().collection("users");
		ref.doc(profileId).get().then(function(doc) {
			console.log(doc.data());

			context.setState({
				profileEmail: doc.data().email,
				numFollowers: doc.data().numFollowers,
				numFollowing: doc.data().numFollowing,
				numVideos: doc.data().numVideos,
			});

			console.log(context.state);
		});

		// TODO check if logged in user is already following this user
	}

	gotoHome = e => {
		// TODO figure out how to use history in stateful component
		this.props.history.push("/home");
	}

	followUser = e => {
		// get logged in user object
		const currentUser = firebase.auth().currentUser;

		if (!currentUser){
			// this should be blocked anyway by PrivateRoute in App.js
			alert("Not logged in");
			//return false;
		} else if (currentUser.uid === this.state.profileId){
			// this should be blocked anyway
			alert("You can't follow yourself");
			//return false;
		} else {
			const ref = firebase.firestore().collection("users");

			ref.doc(currentUser.uid).collection("following").add({userId: this.state.profileId});
			ref.doc(this.state.profileId).collection("followers").add({userId: currentUser.uid});

			ref.doc(currentUser.uid).update({
				numFollowing: firebase.firestore.FieldValue.increment(1),
			});
			ref.doc(this.state.profileId).update({
				numFollowers: firebase.firestore.FieldValue.increment(1),
			});
		}
	}

	/* TODO show feed of this user's videos in "profile-posts" */
	render (){
		if (!this.state.profileId){
			return (<div></div>);
		} else {
			return (
				<div>
					<div id="profile">
						<h1>User ID: {this.state.profileId}</h1>
						<h2>User Email: {this.state.profileEmail}</h2>
						<p>{this.state.numFollowers} followers, {this.state.numFollowing} following, {this.state.numVideos} videos</p>
						{this.state.canFollow ? <button id="follow-user-btn" onClick={this.followUser}>Follow User</button> : null}
						<button id="go-home-from-profile-btn" onClick={this.gotoHome}>Back</button>
					</div>
					<div id="profile-posts">
					</div>
				</div>
			);
		}
	}
}

export default withRouter(ProfileScreen);