import React from "react"

import firebase from "../firebase";

import { useHistory, Link } from "react-router-dom";
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
			canFollow: false,
			profilePosts: [],
		};
	}

	componentWillMount(){
		// get ID of profile to be viewed from link
		var { profileId } = this.props.match.params;

		// get logged in user object
		const currentUser = firebase.auth().currentUser;

		this.setState({
			profileId: profileId,
			canFollow: (profileId !== currentUser.uid),
		});

		//console.log("PROFILE ID: "+this.state.profileId);

		const ref = firebase.firestore().collection("users");
		ref.doc(profileId).get().then((doc) => {
			//console.log(doc.data());

			this.setState({
				profileEmail: doc.data().email,
				numFollowers: doc.data().numFollowers,
				numFollowing: doc.data().numFollowing,
				numVideos: doc.data().numVideos,
			});

			//console.log(this.state);
		});

		// check if logged in user is already following this user
		ref.doc(currentUser.uid).collection("following").onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if (doc.data().userId === profileId){
					this.setState({
						canFollow: false,
					});
				}
			});
		});

		const userRef = firebase.firestore().collection("users").doc(profileId).collection("videos");
		const postRef = firebase.firestore().collection("posts");

		const context = this;

        userRef.onSnapshot((querySnapshot) => {

            querySnapshot.forEach((doc) => {
				let postId = doc.data().postId;
				console.log(postId)

            	if (postId !== ""){
	            	postRef.doc(postId).onSnapshot((postSnapshot) => {
						console.log(postSnapshot.data())
	            		context.state.profilePosts.push(postSnapshot.data());
	            	});
	            }
            });

        });
	}

	gotoHome = e => {
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

	convertTime(timestamp){
        //Date.now() returns the number of milliseconds since January 1, 1970 00:00:00 UTC
        //Therefore I calculate the days since the post by getting the current date, converting it to days
        //Then convert the date of the post to days, then subtract the 2
        var total_seconds = parseInt(Math.floor(timestamp / 1000));
        var total_minutes = parseInt(Math.floor(total_seconds / 60));
        var total_hours = parseInt(Math.floor(total_minutes / 60));
        var days = parseInt(Math.floor(total_hours / 24));

        var current_date = Date.now()
        var total_seconds2 = parseInt(Math.floor(current_date/ 1000));
        var total_minutes2 = parseInt(Math.floor(total_seconds2 / 60));
        var total_hours2 = parseInt(Math.floor(total_minutes2 / 60));
        var current_date_in_days = parseInt(Math.floor(total_hours2 / 24));

        var days_since_post = current_date_in_days - days;
        return days_since_post
    }

    convertDist(lat, lng){
        let dist = Math.sqrt(Math.pow(Math.abs(this.state.userLat - lat),2) + 
            Math.pow(Math.abs(this.state.userLng - lng),2));

        let distStr = (69*dist + '').substring(0,5);

        return distStr + "mi";
    }

	/* TODO show feed of this user's videos in "profile-posts" */
	render (){
		console.log(this.state.profilePosts)
		if (!this.state.profileId){
			return (
				<div>
					<h2>Couldn't find that user</h2>
					<button id="go-home-from-profile-btn" onClick={this.gotoHome}>Back</button>
				</div>
			);
		} 
		 else if (this.state.profilePosts[0] !== undefined) {
			console.log(this.state.profilePosts)
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
						{
						this.state.profilePosts.map(post => (
	                        <div className="post" key={post.postId}>
	                            <h2>
	                                {post.sport} video from {this.convertDist(post.lat,post.lng)} away
	                            </h2>
	                            <h3><i>
	                                posted {this.convertTime(post.timestamp)} days ago by <Link to={"/profile/:"+post.userId}>{this.state.profileEmail}</Link>
	                            </i></h3>
	                            <p>{post.likes} likes</p>
	                        </div>
	                    ))}
					</div>
				</div>
			);
		} 
		else {
			return (
				<div>
					<div id="profile">
						<h1>User ID: {this.state.profileId}</h1>
						<h2>User Email: {this.state.profileEmail}</h2>
						<p>{this.state.numFollowers} followers, {this.state.numFollowing} following, {this.state.numVideos} videos</p>
						{this.state.canFollow ? <button id="follow-user-btn" onClick={this.followUser}>Follow User</button> : null}
						<button id="go-home-from-profile-btn" onClick={this.gotoHome}>Back</button>
					</div>
					<div style={{ margin: '30px 0' }} />
				</div>
			);
		}
	}
}

export default withRouter(ProfileScreen);