/* FROM https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/ */
/* TODO add multi page application functionality from https://www.golangprograms.com/how-to-create-simple-react-router-to-navigate-multiple-pages.html */
import React, { Component } from "react"
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './components/home';
import Browse from './components/browse';
import Upload from './components/upload';
 
class App extends Component {
  render() {
    return (      
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/browse" component={Browse}/>
                    <Route path="/upload" component={Upload}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

