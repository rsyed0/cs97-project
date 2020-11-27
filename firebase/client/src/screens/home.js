import React, { Component } from "react"
import SplitPane, { Pane } from 'react-split-pane';

// class to represent a video post
// won't show video, just metadata
// child of FeedPane
class Post extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <div>

            </div>
        );
    }
}

// class to show feed of nearby videos
// pane is part of the HomeScreen
class FeedPane extends React.Component {

}

// class to show video currently being viewed
// pane is part of the HomeScreen
class VideoPane extends React.Component {

}

// TODO setup auth, check if user logged in
// if so, load posts for that user in FeedPane
// if not, go to signup screen
class HomeScreen extends React.Component {

	render(){
        return (
            <SplitPane split="horizontal" >
                <Pane minSize="60%">
                    <FeedPane />
                </Pane>
                <Pane minSize="40%">
                    <VideoPane />
                </Pane>
            </SplitPane>
        );
    }

}

export default HomeScreen;