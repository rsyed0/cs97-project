import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { withRouter } from "react-router";
import firebase from "../firebase";
import { List } from 'antd';
import LikeVideo from "./helpers/LikeVideo"


class PlayVideoScreen extends React.Component {
    constructor (props){
		super(props);
		this.state = {
            url: null,
            videoID: null,
            userID: null
        };
    }
    
    componentDidMount = async () =>
    {
        console.log('postId', this.props.match.params.postId);
        const url = await this.getVideoUrl(this.props.match.params.postId);
        this.setState({ url });
    }

    //Function to grab and display files uploaded to firestore. For testing purposes
    getVideoUrl = async (postId) => {
        const currentUser = firebase.auth().currentUser;
        const UID = currentUser.uid;
        let url = this.state.url;

        console.log('UID', UID);
        console.log('postId', postId);

        this.setState({
            videoID: postId,
            userID: UID
        });

        const user_doc = firebase.firestore().collection("users").doc(UID);
        const postDoc = await (user_doc.collection("videos").doc(postId).get());
        console.log('post doc', postDoc);
        const postDocData = postDoc.data();
        console.log('postDocData', postDocData);

        if (postDocData) {
           const { fileName } = postDocData;
           const storageRef2 = firebase.storage().ref();
           const spaceRef = storageRef2.child(postId + "/" + fileName);

           url = await spaceRef.getDownloadURL();
        }
       //  user_doc.collection("videos").doc(postId).get().then(function(doc) {
       //      console.log("Doc data", doc.data());
           
       //      const fileName = doc.data().fileName;
       //      const folderName = doc.data().postId;
       //      const storageRef2 = firebase.storage().ref();
       //      const spaceRef = storageRef2.child(folderName + "/" + fileName);
       //      storageRef2.child(folderName + "/" + fileName).getDownloadURL().then((url_)=>{
       //         console.log('URL', url_);
       //          //You can use the url variable here as the url of the video 
       //         url = url_;
       //     })
       //  });

        console.log('RETURN url', url);

        return url;
    }
    
    render()
    {
        console.log('Showing video for url:', this.state.url);
        if (this.state.url !== null) {
            return (
                <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                    <ReactPlayer controls={true} url={this.state.url}/>  
                    <List.Item>
                    {/* <List.Item actions={[<LikeVideo videoId={this.state.videoID} userId={this.state.userID}/>] }>                 */}
                        <LikeVideo video videoId={this.state.videoID} userId={this.state.userID}/>
                    </List.Item>
                </div>
                
            );
        } else {
            return (
                <div>Loading...</div> 
                    // <Button type="primary" htmlType="button" onClick={this.goBack}>
                    //     Return Home
                    // </Button>
            );
        }
    }
}


export default withRouter(PlayVideoScreen); 