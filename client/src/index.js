import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO implement uploads using https://nodejs.dev/learn/make-an-http-post-request-using-nodejs
// TODO implement queries using https://nodejs.dev/learn/making-http-requests-with-nodejs
// TODO use fetch() to make GET requests, code in https://reactjs.org/docs/faq-ajax.html

// FROM https://medium.com/better-programming/video-stream-with-node-js-and-html5-320b3191a6b6
// for streaming video from uploads
/* <video id="videoPlayer" controls>
	<source src="http://localhost:3000/stream-video" type="video/mp4">
</video> */
