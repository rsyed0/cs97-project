import React, { Component } from "react"
import SplitPane, { Pane } from 'react-split-pane';

import { usePosition } from 'use-position';

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

// class to show video currently being viewed
// pane is part of the HomeScreen
class VideoPane extends React.Component {

    constructor (props){
        super(props);
    }

    render(){
        return ();
    }

}

// TODO setup auth, check if user logged in
// if so, load posts for that user
// if not, go to signup screen
class HomeScreen extends React.Component {

    constructor (props){
        super(props);

        // max distance (in lat/lng degrees) where a post will show
        this.state = {maxDist: 0.1, posts: null};
    }

    getUserLocation(){
        const {
            latitude,
            longitude,
            speed,
            timestamp,
            accuracy,
            error,
        } = usePosition();

        return {lat: latitude, lng: longitude};
    }

    loadNearbyPosts(){

        const ref = firebase.firestore().collection("posts");

        ref.onSnapshot((querySnapshot) => {

            let posts = [];
            const userPos = getUserLocation();

            querySnapshot.forEach((doc) => {

                if (Math.pow(Math.abs(userPos.lat - doc.lat),2) + 
                    Math.pow(Math.abs(userPos.lng - doc.lng),2) <= this.state.maxDist)
                    posts.push(doc.data());

            });

            this.setState({posts: posts});
        });

    }

    componentDidMount (){
        loadNearbyPosts();
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