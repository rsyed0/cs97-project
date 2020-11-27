import React, { Component } from "react"
import SplitPane, { Pane } from 'react-split-pane';

//import { usePosition } from 'use-position';

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
        this.state = {maxDist: 0.25, posts: [], userLat: 0, userLng: 0};
    }

    loadNearbyPosts(){

        const ref = firebase.firestore().collection("posts");

        ref.onSnapshot((querySnapshot) => {

            let posts = [];
            //const userPos = UserLocation();

            querySnapshot.forEach((doc) => {

                let data = doc.data();
                console.log(data);

                let dist = Math.sqrt(Math.pow(Math.abs(this.state.userLat - data.lat),2) + 
                    Math.pow(Math.abs(this.state.userLng - data.lng),2));

                console.log("for post: lat: "+data.lat+", lng: "+data.lng);
                console.log("dist from post: "+dist);

                if (dist <= this.state.maxDist)
                    posts.push(data);

            });

            this.setState({posts: posts});
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

    // TODO use .map() method with firebase to load posts dynamically
    // from https://github.com/samfromaway/firebase-tutorial/blob/master/src/GetFirebase.js
	render(){
        return (
            <SplitPane split="horizontal" >
                <Pane minSize="60%">
                    {this.state.posts.map((post) => (
                        <div className="post" key={post.videoId}>
                            <h1>Video post by {post.userId} at {post.timestamp} from ({post.lat},{post.lng})</h1>
                            <p>{post.likes} likes</p>
                        </div>
                    ))}
                </Pane>
                <Pane minSize="40%">
                    <VideoPane id="video" />
                </Pane>
            </SplitPane>
        );
    }

}

export default HomeScreen;
