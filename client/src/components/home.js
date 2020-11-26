import React, { Component } from "react"

// TODO create Post class to simplify rendering
class Post extends Component {

	constructor (props){
		super(props);
	}

	onClick() {
		// TODO link to browse, send video hashid

	}

	render() {
		return (
			<div>
				<h2>{this.props.data.userid} at ({this.props.data.lat}, {this.props.data.lng})</h2>
			</div>
		);
	}

}
 
class Home extends Component {

	constructor (props){
		super(props);
		this.state = {
			isLoaded: false,
			error: null
		};
		this.props.data = null;
	}

	queryDatabase(minLat,maxLat,minLng,maxLng){
		let reqBody = "minLat=" + minLat + "&maxLat=" + maxLat + "&minLng=" + minLng + "&maxLng=" + maxLng;
		fetch("https://localhost:3000/query-video?"+reqBody)
			.then(res => res.json())
			.then(
				// store results of database query
				(data) => {
					this.setState({
						isLoaded: true
					});

					this.props.data = JSON.parse(data);
			    },
			    // Note: it's important to handle errors here
			    // instead of a catch() block so that we don't swallow
			    // exceptions from actual bugs in components.
			    (error) => {
					this.setState({
						isLoaded: true,
						error
					});
			    }
			);
	}

	render(){
		// TODO call queryDatabase() with local coordinates
		// and render feed of local video posts
		return (
			<div>
				<h1>Home</h1>
				<p>Home page body content</p>
			</div>
    	);
	}
}
 
export default Home;