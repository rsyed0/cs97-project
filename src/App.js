import React, { Component } from "react"
import logo from './logo.svg';
import './App.css';

import LandingScreen from './screens/landing';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';
import UploadScreen from './screens/upload';
import ProfileScreen from './screens/profile';
import NotFoundScreen from './screens/notfound';

// TODO implement different screens with https://reactnative.dev/docs/navigation
class App {
    constructor (){
        this.state = {
            screen: "home",
        };
    }

    handleScreenChange = (newScreen) => {
        this.setState({screen: newScreen});
    }

    render (){
        if (this.screen === "landing"){
            return (
                <LandingScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.screen === "login"){
            return (
                <LoginScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.screen === "signup"){
            return (
                <SignupScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.screen === "home"){
            return (
                <HomeScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.screen === "upload"){
            return (
                <UploadScreen onChangeScreen={this.handleScreenChange} />
            );
        } else if (this.screen === "profile"){
            return (
                <ProfileScreen onChangeScreen={this.handleScreenChange} />
            );
        } else {
            return (
                <NotFoundScreen onChangeScreen={this.handleScreenChange} />
            );
        }
    }
}

export default App;
