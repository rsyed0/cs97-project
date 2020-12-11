import React, { Component } from "react"
import SplitPane, { Pane } from 'react-split-pane';
import ReactPlayer from 'react-player';
import PlayVideoScreen from "./playVideo";
import Comments from "../components/Comments";
import { usePosition } from 'use-position';
import { Button } from 'antd';

import { useHistory, Link } from "react-router-dom";
import { withRouter } from "react-router";
//import { Redirect, withRouter } from "react-router";

import firebase from "../firebase";

// import GoogleMapReact from 'google-map-react';

// const google = window.google

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
            maxDist: 100, 
            posts: [], 
            userLat: 0, 
            userLng: 0,
            videoId: null
        };
    }

    logOut = e => {
        this.props.history.push("/");  //should return to landing screen
        firebase.auth().signOut();
    }

    loadNearbyPosts(){
        const ref = firebase.firestore().collection("posts");

        ref.onSnapshot((querySnapshot) => {

            let posts = [];
            //const userPos = UserLocation();

            querySnapshot.forEach((doc) => {

                let post = doc.data();
                console.log('snapshot data', post);

                let dist = Math.sqrt(Math.pow(Math.abs(this.state.userLat - post.lat),2) + 
                    Math.pow(Math.abs(this.state.userLng - post.lng),2));

                console.log("for post: lat: "+post.lat+", lng: "+post.lng);
                console.log("dist from post: "+dist);

                if (dist <= this.state.maxDist) { // display if the post is within the max distance
                    posts.push(post);
                }

            });

            console.log("POSTS: ", posts);

            this.setState({
                posts: posts 
            });
        });

    }

    componentDidMount (){
        const homeScreen = this;
       
        navigator.geolocation.getCurrentPosition(function(position) { // gets the user location
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

    // convertToLocation(lat, lng){
    //     var latlng = new google.maps.LatLng(lat, lng);
    //     // This is making the Geocode request
    //     var geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    //     if (status !== google.maps.GeocoderStatus.OK) {
    //         alert(status);
    //     }
    //     // This is checking to see if the Geoeode Status is OK before proceeding
    //     var address = "temp"
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         console.log(results);
    //         address = (results[0].formatted_address);
    //     }
    //     return address;
    // });

    // }

    // use .map() method with firebase to load posts dynamically
    // from https://github.com/samfromaway/firebase-tutorial/blob/master/src/GetFirebase.js
	render(){
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button type="primary" onClick={this.viewLoggedUserProfile}>View My Profile</Button>
                    &nbsp;&nbsp;&nbsp; 
                    <Button type="primary" onClick={this.uploadVideo}>Upload Video</Button>
                    &nbsp;&nbsp;&nbsp; 
                    <Button type="primary" onClick={this.logOut}>Log Out</Button>
                    <div style={{ margin: '30px 0' }} />
                </div>

                <VideoPane id="video" />

                <div>
                    {this.state.posts.map((post) => (
                        <div className="post" key={post.postId}>
                            <h2>
                                {post.sport} post {this.convertTime(post.timestamp)} days ago
                                by <Link to={"/profile/" + post.userId}>{post.userEmail}</Link> from ({post.lat},{post.lng})
                            </h2>
                            <PlayVideoScreen postId={post.postId} hideShowButton={true} />
                            <Comments post={post}/>
                            <div style={{ margin: '100px 0' }} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

export default withRouter(HomeScreen);