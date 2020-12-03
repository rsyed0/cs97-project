import React, { Component } from "react"
import SplitPane, { Pane } from 'react-split-pane';

import { usePosition } from 'use-position';

import { useHistory, Link } from "react-router-dom";
import { withRouter } from "react-router";
//import { Redirect, withRouter } from "react-router";

import firebase from "../firebase";

// class to represent a video post
// won't show video, just metadata, will show video on click
// child of FeedPane
/*class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    onClick(){
    }
    render(){
        return (
            <div>
                <h2></h2>
            </div>
        );
    }
}*/

// class to show feed of nearby videos
// pane is part of the HomeScreen
/*class FeedPane extends React.Component {
    render(){
        return ();
    }
}*/

/*export const UserLocation = () => {
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition();
    return (
        <code>
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}
        </code>
    );
};*/

// class to show video currently being viewed
// pane is part of the HomeScreen
class VideoPane extends React.Component {

    constructor (props){
        super(props);
    }

    render(){
        return (<div className="videoPane"></div>);
    }

}

// TODO setup auth, check if user logged in
// if so, load posts for that user
// if not, go to signup screen
class HomeScreen extends React.Component {

    constructor (props){
        super(props);

        // max distance (in lat/lng degrees) where a post will show
        this.state = {
            maxDist: 0.25, 
            posts: [], 
            userLat: 0, 
            userLng: 0,
            videoId: null
        };
    }

    logOut(){
        //this.props.history.push("/");  //should return to home screen
        firebase.auth().signOut();
    }

    loadNearbyPosts(){

        const ref = firebase.firestore().collection("posts");

        ref.onSnapshot((querySnapshot) => {

            let posts = [];
            //const userPos = UserLocation();

            querySnapshot.forEach((doc) => {

                let data = doc.data();
                console.log('snapshot data', data);

                let dist = Math.sqrt(Math.pow(Math.abs(this.state.userLat - data.lat),2) + 
                    Math.pow(Math.abs(this.state.userLng - data.lng),2));

                console.log("for post: lat: "+data.lat+", lng: "+data.lng);
                console.log("dist from post: "+dist);

                if (dist <= this.state.maxDist) {
                    posts.push(data);
                }

            });

            console.log('loadNearbyPosts', posts);

            this.setState({ posts });
        });

    }

    componentDidMount (){
        const homeScreen = this;

        navigator.geolocation.getCurrentPosition(function(position) {
            homeScreen.setState({
                userLat: position.coords.latitude, 
                userLng: position.coords.longitude
            });

            console.log("for user: lat: "+homeScreen.state.userLat+", lng: "+homeScreen.state.userLng);

            homeScreen.loadNearbyPosts();
        });
    }

    viewLoggedUserProfile = e => {
        this.props.history.push("/profile/"+firebase.auth().currentUser.uid);
    }

    uploadVideo = e => {
        this.props.history.push("/upload");
    }

    convertTime(timestamp){
        var unixSecDelay = Math.round((new Date()).getTime() / 1000) - timestamp;

        var mult = [60,60,24,7,4,12];
        var names = ['s','m','h','d','w','mo'];
        var bound = 60;
        var divider = 1;

        var i;
        for (i = 0; i < mult.length; i++) {
            if (unixSecDelay < bound){
                var delay = Math.round(unixSecDelay/divider);
                return delay.toString() + names[i];
            }
            divider = divider*mult[i];
            bound = bound*mult[i+1];
        }
        
        var delay = Math.round(unixSecDelay/31540000);
        return delay.toString() + 'yr';
    }

    // TODO use .map() method with firebase to load posts dynamically
    // from https://github.com/samfromaway/firebase-tutorial/blob/master/src/GetFirebase.js
	render(){
        return (
            <SplitPane split="horizontal" >
                <Pane minSize="60%">
                    {this.state.posts.map((post) => (
                        <div className="post" key={post.postId}>
                            <h2>
                            <Link to={"/playVideo/"+post.postId}>Video</Link> post {this.convertTime(post.timestamp)} ago 
                                by <Link to={"/profile/"+post.userId}>{post.userId}</Link> from ({post.lat},{post.lng})
                            </h2>
                            <p>{post.likes} likes</p>
                        </div>
                    ))}
                </Pane>
                <Pane minSize="40%">
                    <button onClick={this.viewLoggedUserProfile}>View My Profile</button>
                    <button onClick={this.uploadVideo}>Upload Video</button>
                    <button onClick={this.logOut}>Log Out</button>
                    <VideoPane id="video" />
                </Pane>
            </SplitPane>
        );
    }

}

export default withRouter(HomeScreen);