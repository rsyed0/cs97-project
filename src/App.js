import React, { Component } from "react"
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./firebaseauth";
import ReactPlayer from 'react-player'

import LandingScreen from './screens/landing';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';
import UploadScreen from './screens/upload';
import ProfileScreen from './screens/profile';
import NotFoundScreen from './screens/notfound';
import PlayVideoScreen from './screens/playVideo';

/*class App extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            screen: "home",
        };
    }

    // method to navigate to new screen
    handleScreenChange = (newScreen) => {
        this.setState({screen: newScreen});
        console.log("set screen to "+this.state.screen);
    }

    // route to different screens
    render (){
        console.log("rendering "+this.state.screen);
        if (this.state.screen === "landing"){
            return (
                <LandingScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.state.screen === "login"){
            return (
                <LoginScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.state.screen === "signup"){
            return (
                <SignupScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.state.screen === "home"){
            return (
                <HomeScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.state.screen === "upload"){
            return (
                <UploadScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.state.screen === "profile"){
            return (
                <ProfileScreen onChangeScreen={this.handleScreenChange} />
            );
        } else {
            return (
                <NotFoundScreen onChangeScreen={this.handleScreenChange} />
            );
        }
    }
}*/

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path="/home" component={HomeScreen} />
                    <Route exact path="/upload" component={UploadScreen} />
                    <Route exact path="/profile/:profileId" component={ProfileScreen} />
                    <Route exact path="/notfound" component={NotFoundScreen} />
                    <Route exact path="/" component={LandingScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/signup" component={SignupScreen} />
                    <Route exact path ="/playVideo/:postId" component={PlayVideoScreen} />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
