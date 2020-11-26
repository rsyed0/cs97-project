import React, { Component } from "react"
 
class Browse extends Component {
	render(){
		return (
			<div>
				<h1>Browse</h1>
				<p>Browse page body content</p>
			</div>
    	);
	}
}
 
export default Browse;

// FROM https://medium.com/better-programming/video-stream-with-node-js-and-html5-320b3191a6b6
// for streaming video from uploads
/* <video id="videoPlayer" controls>
	<source src="http://localhost:3000/stream-video?videoId=[testhash]" type="video/mp4">
</video> */