import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { withRouter } from "react-router";
import firebase from "../firebase";
import { List } from 'antd';
import LikeVideo from "./helpers/LikeVideo"
import { Button } from 'antd';

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
        let postId = null;
        if (this.props.postId) { // postId from props
            postId = this.props.postId
        } else { // postId from url
            postId = this.props.match.params.postId;
        }
        console.log('postId', postId);
        const url = await this.getVideoUrl(postId);
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

        //const user_doc = await firebase.firestore().collection("users").doc(UID);
        const postDoc = await (firebase.firestore().collection("posts").doc(postId).get());
        console.log('PlayVideo: Post Document: ', postDoc);
        const postDocData = postDoc.data();
        console.log('PlayVideo: Post Document Data: ', postDocData);

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

    goBack = () => {
        this.props.history.push("/home");
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
                    <div style={{ margin: '24px 0' }} />

                    {!this.props.hideShowButton && 
                    <Button type="primary" htmlType="button" onClick={this.goBack}>
                        Return Home
                    </Button>}
                    
                </div>
                
            );
        } else {
            return (
                <div>
                    <div>Loading...</div> 
                    {!this.props.hideShowButton && 
                    <Button type="primary" htmlType="button" onClick={this.goBack}>
                        Return Home
                    </Button>}
                </div>
            );
        }
    }
}


export default withRouter(PlayVideoScreen); 