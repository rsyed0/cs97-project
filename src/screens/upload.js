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
    
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Categories, setCategories] = useState("Film & Animation")

    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

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
    const onDrop = ( files ) => {
        
        const file = files[0];
        const post_ref = firebase.firestore().collection("posts");
        const user_ref = firebase.firestore().collection("users");
        
        const randomID = firestoreAutoId();

		// use FirebaseUser id, not random/auto
        const currentUser = firebase.auth().currentUser;
        const UID = currentUser.uid;

		if (!currentUser){
			return false;
        } 
        else {
            alert('jawn a')

            var postData = {
                postID: randomID,
                userId: UID,
                timestamp: null,
                lat: null,
                lng: null,
                likes: 0,
                desciption: null,
                sport: null
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
			user_ref.doc(currentUser.uid).collection("videos").doc(randomID).update({
                postId: randomID,
                posted: false
            });
		}
    }

	function gotoLanding (){
		history.push("/");
    }
    
    function showPosition(position) {
        var userLat = position.coords.latitude;
        alert(userLat);
       
      }

    const onSubmit = () => {
        var userLat = null, userLong = null;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            alert("hi")
          } else {
           alert("Geolocation is not supported by this browser.");
          }
        
        // alert(userLat);
        // alert(userLong);


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
            <label>Title</label>
            <br></br>
            <Input size="small" placeholder="video title" 
                onChange={handleChangeTitle}
                value={title}
            />
            <div style={{ margin: '24px 0' }} />

            <label>Description</label>
            <TextArea placeholder="video description" showCount maxLength={100}
                onChange={handleChangeDecsription}
                value={Description}
            />
           <div style={{ margin: '24px 0' }} />

            <select onChange={handleChangeTwo} value={Categories}>
                {Catogory.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <div style={{ margin: '24px 0' }} />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
	);
}

export default withRouter(UploadScreen);