import React, { Component } from "react"

import firebase from "../firebase";
import 'firebase/storage';
import { AuthContext } from "../firebaseauth";
import { Typography, Button, Form, Select, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone'
import { usePosition } from 'use-position';

import { withRouter } from "react-router";
const { Title } = Typography;

const { Option } = Select;

const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

// TODO setup firebase storage, link with this
// class for uploading a video

class UploadScreen extends React.Component {

    constructor (props){
        super(props);

        this.state = {
            userLat: null,
            userLng: null,
            postID: null,
            Description: "",
            Categories: "", 
            Catogory: [
                { value: 0, label: "Basketball" },
                { value: 0, label: "Nature" },
                { value: 0, label: "Soccer" },
                { value: 0, label: "Football" },
                { value: 0, label: "Hockey" },
                { value: 0, label: "Baseball" },
                { value: 0, label: "Skating" },
            ],
            TextArea: Input,
            file: null  
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }


    handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        this.setState({
            Description: event.currentTarget.value
        });
    }

    handleChangeTwo = value => {
        this.setState({
            Categories: value
        });
    }


    uploadVideoFile(){
        // check if file matches accepted formats
        // auto-ID video, store with Firebase Storage
        // log video in posts and under user in Firestore
        // use FieldValue.increment(1) to update numVideos
    }

    //generates random firestore id
    firestoreAutoId = () => {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
        let autoId = ''
    
        for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
        )
        }
        return autoId
    }
    
    //TO DO: implement check that file is a video file and matches accepted formats
    //figure out where to store video in a place where we can later retrieve it 
    onDrop = ( files ) => {
        this.setState({
            file: files[0]
        });
    }
    

    onSubmit = () => {

        //get reference to posts collection in firestore and generate random postID
        const post_ref = firebase.firestore().collection("posts");
        
        if (this.state.postID == null) {
            const randomID = this.firestoreAutoId();
            this.setState({
                postID: randomID
            });
        }

        // use FirebaseUser id, not random/auto
        const currentUser = firebase.auth().currentUser;

        if (!currentUser){
            alert("Please log in")
            return false;
        } 
        else {
            //gives formatted time
            //alert(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time_stamp));
            const currFile = this.state.file;
            if (currFile != null) {
                navigator.geolocation.getCurrentPosition( (position) => {
                    this.setState({
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude,
                    });
                
                    const time_stamp = Date.now(); // unformatted time stamp
                    const UID = currentUser.uid; //get userID
                    
                    var postData = {
                        postId: this.state.postID,
                        userId: UID,
                        timestamp: time_stamp,
                        lat: this.state.userLat,
                        lng: this.state.userLng,
                        likes: 0,
                        desciption: this.state.Description,
                        sport: this.state.Categories,
                        fileName: currFile.name
                    }
                    post_ref.doc(this.state.postID).set(postData)
                    .then(function() {
                        alert("Document uploaded succesfully");
                    })
                    .catch(function() {
                        alert("ERROR");
                    })

                    //set video post with post ID
                    const user_doc = firebase.firestore().collection("users").doc(UID);
                    user_doc.collection("videos").doc(this.state.postID).set({
                        postId: this.state.postID,
                        fileName: currFile.name,
                    });

                    //increase number of videos by 1
                    user_doc.get().then(function(doc) {
                        console.log(doc.data());
                        var vidNum = doc.data().numVideos;
                        
                        vidNum++;
                        user_doc.update({
                            numVideos: vidNum
                        });
                    });

                    //can use the code below for grabbing file. Just need to figure out how:
                    //for current user: get folderName(from postID) 
                    //1) get current user id
                    //2)look inside video folder(code above)  --> can loop through documents if needed
                    //3)get postID and filename
                    //4)search in storage
                    //store time stamp in user video document as well?
                    //loop? --> how to retrieve all posts?


                    const folderName = this.state.postID;
                    const storageRef = firebase.storage().ref(`${folderName}/${currFile.name}`)
                    var uploadTask = storageRef.put(currFile)
                    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    //     ()=>{
                    //         var downloadURL = uploadTask.snapshot.downloadURL
                    //     })
                    
                    //go back to home page
                    this.goBack()
                });
            }
            else {
                alert("Error: upload video file")
            }
        }
    }

    //Function to grab and display files uploaded to firestore. For testing purposes
    // showImage = () => {
    //     const currentUser = firebase.auth().currentUser;
    //     const UID = currentUser.uid;

    //     const user_doc = firebase.firestore().collection("users").doc(UID);
    //     user_doc.collection("videos").doc(this.state.postID).get().then(function(doc) {
    //         console.log(doc.data());
            
    //         const fileName = doc.data().fileName;
    //         const folderName = doc.data().postId;
    //         const storageRef2 = firebase.storage().ref();
    //         const spaceRef = storageRef2.child(folderName + "/" + fileName);
    //         storageRef2.child(folderName + "/" + fileName).getDownloadURL().then((url)=>{
    //             console.log(url)
    //             //You can use the url variable here as the url of the video 






    //             document.getElementById("new-img").src = url;
    //         })
    //     });
    // }
        
    goBack = () => {
        this.props.history.push("/home");
    }
    

    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Typography style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>Video Upload</Title>
            </Typography>
    
            <Form onSubmit={this.onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Dropzone 
                        multiple={false}
                        maxSize={800000000}
                        onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <UploadOutlined style={{ fontSize: '3rem' }} />
    
                            </div>
                        )}
                    </Dropzone> 
    
                    {/* {thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                        </div>
                */} 
                </div>
    
    
                <div style={{ margin: '24px 0' }} />
                <label>Description</label>
                <br></br>
                <this.state.TextArea placeholder="video description" showCount maxLength={100}
                    onChange={this.handleChangeDecsription}
                    value={this.state.Description}
                />
            <div style={{ margin: '24px 0' }} />
                
                <label>Activity</label>
                <br></br>
                <Form.Item>
                <Select placeholder="Select an activity" onChange={this.handleChangeTwo} value={this.state.Categories}>
                    {this.state.Catogory.map((item, index) => (
                        <Option key={index} value={item.label}>{item.label}</Option>
                    ))}
                </Select>
                </Form.Item>
            <div style={{ margin: '40px 0' }} />
    
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    &nbsp;&nbsp;&nbsp; 
                    <Button type="primary" htmlType="button" onClick={this.goBack}>
                        Cancel
                    </Button>
                </Form.Item>

                {/* <br></br>
                <Button onClick={this.showImage}>
                    Image
                </Button>
                <br></br>
                <img id="new-img" alt="testy"/> */}
    
            </Form>
        </div>
        );
    }

}
export default withRouter(UploadScreen);