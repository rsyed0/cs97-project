import React, {useContext, useState, useEffect} from "react"

import firebase from "../firebase";
import { AuthContext } from "../firebaseauth";
import { Typography, Button, Form, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone'

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// TODO setup firebase storage, link with this
// class for uploading a video

const UploadScreen = () => {
    
    const history = useHistory();
	const { Title } = Typography;
    const  { TextArea } = Input;

    const Catogory = [
        { value: 0, label: "Skating" },
        { value: 0, label: "Basketball" },
        { value: 0, label: "Nature" },
        { value: 0, label: "Soccer" },
        { value: 0, label: "Football" },
        { value: 0, label: "Hockey" },
        { value: 0, label: "Baseball" },
    ]

    const [Description, setDescription] = useState("");
    const [Categories, setCategories] = useState("")

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

	function gotoHome(){
		history.push("/home");
	}

	const { currentUser } = useContext(AuthContext);

	function uploadVideoFile(){
		// check if file matches accepted formats
		// auto-ID video, store with Firebase Storage
		// log video in posts and under user in Firestore
        // use FieldValue.increment(1) to update numVideos
    }

    //generates random firestore id
    const firestoreAutoId = () => {
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
    const onDrop = ( files ) => {
        
        const file = files[0];
        
    }

	function gotoLanding (){
		history.push("/");
    }
    

    const onSubmit = () => {
        var userLat = null, userLong = null;

        //get reference to posts collection in firestore and generate random postID
        const post_ref = firebase.firestore().collection("posts");
        const randomID = firestoreAutoId();

		// use FirebaseUser id, not random/auto
        const currentUser = firebase.auth().currentUser;
        const UID = currentUser.uid;

		if (!currentUser){
			return false;
        } 
        else {
            const time_stamp = Date.now(); // unformatted time stamp
            
            //gives formatted time
            //alert(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time_stamp));

            if (navigator.geolocation) {
                alert("F")
                navigator.geolocation.watchPosition(function(position) {
                  alert("hey");
                  alert(position.coords.latitude);
                  alert(position.coords.longitude);
                  userLat = position.coords.latitude;
                  userLong = position.coords.longitude;
                });
            }

            var postData = {
                postID: randomID,
                userId: UID,
                timestamp: time_stamp,
                lat: userLat,
                lng: userLong,
                likes: 0,
                desciption: Description,
                sport: Categories
            }

            post_ref.add(postData)
            .then(function() {
                alert("Document uploaded succesfully");
            })
            .catch(function() {
               alert("ERROR");
            });
            
            //submit button, has not been clicked yet. Video hasn't officially "posted". So we set this to false
            //!!!BELOW STILL NEEDS TO BE TESTED. message to fix signup.js
            // const user_doc = firebase.firestore().collection("users").doc(currentUser.uid);
			// user_doc.collection("videos").doc(randomID).update({
            //     postId: randomID,
            //     posted: false
            // });

            // //increase number of videos by 1
            // var vidNum;
            // user_doc.get().then(doc => {
            //     vidNum = doc.data().numVideos;
            // })

            // user_doc.set({
			// 	numVideos: vidNum
			// });
		}
        // const user_ref = firebase.firestore().collection("users");
        // const post_ref = firebase.firestore().collection("posts");

		// // use FirebaseUser id, not random/auto
		// const currentUser = firebase.auth().currentUser;
		// if (!currentUser){
		// 	return false;
		// } else {
		// 	user_ref.doc(currentUser.uid).set({
		// 		email: email,
		// 		userId: currentUser.uid,
		// 		numFollowers: 0,
		// 		numFollowing: 0,
		// 		numVideos: 0
		// 	});
		// 	ref.doc(currentUser.uid).collection("followers").add("");
		// 	ref.doc(currentUser.uid).collection("following").add("");
		// 	ref.doc(currentUser.uid).collection("videos").add("");
		// }
    }


	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                    multiple={false}
                    maxSize={800000000}
                    onDrop={onDrop}>
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
            <TextArea placeholder="video description" showCount maxLength={100}
                onChange={handleChangeDecsription}
                value={Description}
            />
           <div style={{ margin: '24px 0' }} />

            <label>Sport</label>
            <br></br>
            <select onChange={handleChangeTwo} value={Categories}>
                {Catogory.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <div style={{ margin: '40px 0' }} />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
	);
}

export default withRouter(UploadScreen);