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
    const [privacy, setPrivacy] = useState(0)
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

	function gotoLanding (){
		history.push("/");
    }
    
    const onSubmit = () => {
        
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
                    maxSize={800000000}>
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

            <br /><br />
            <label>Title</label>
            <Input
                onChange={handleChangeTitle}
                value={title}
            />
            <br /><br />
            <label>Description</label>
            <TextArea
                onChange={handleChangeDecsription}
                value={Description}
            />
            <br /><br />

            <select onChange={handleChangeTwo}>
                {Catogory.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
	);
}

export default withRouter(UploadScreen);