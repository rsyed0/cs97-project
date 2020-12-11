import React, { Component, useCallback } from "react";
import { Form, Input, Button, Checkbox, Typography } from 'antd';

import firebase from "../firebase";

import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";


const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };
  const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
  };

const { Title } = Typography;
  

// class for signing up new user
// from https://github.com/satansdeer/react-firebase-auth/blob/master/src/SignUp.js
const SignupScreen = () => {
	const history = useHistory();

	function createDefaultUserData(email){
		const ref = firebase.firestore().collection("users");

		// use FirebaseUser id, not random/auto
		const currentUser = firebase.auth().currentUser;
		if (!currentUser){
			return false;
		} else {
			ref.doc(currentUser.uid).set({
				email: email,
				userId: currentUser.uid,
				numFollowers: 0,
				numFollowing: 0,
				numVideos: 0
			});
			ref.doc(currentUser.uid).collection("followers").add({userId: ""});
			ref.doc(currentUser.uid).collection("following").add({userId: ""});
			ref.doc(currentUser.uid).collection("videos").add({postId: ""});
		}

		return true;
	}

	// const handleSignUp = useCallback(async event => {
	// 	event.preventDefault();
	// 	const { email, password } = event.target.elements;
	// 	try {
	// 		await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

	// 		// create default user data in firestore
	// 		createDefaultUserData(email.value);

	// 		history.push("/home");
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// }, [history]);

	const onFinish = useCallback(
		async values => {
		console.log('Success:', values);
		const user_email = values.email;
		const user_password = values.password;
		try {
			await firebase.auth().createUserWithEmailAndPassword(user_email, user_password);
			
			// create default user data in firestore
			createDefaultUserData(user_email);
			history.push("/home");
		} catch (error) {
			alert(error);
		}
	},[history]);


	function gotoLanding (){
		history.push("/");
	}
	return (
		
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<Form
			{...layout}
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			>
			<div style={{ margin: '180px 0' }} />
			<Typography style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>Sign Up</Title>
            </Typography>
			<Form.Item
				label="Email"
				name="email"
				placeholder="Email"
				rules={[{ required: true, message: 'Please input your email!' }]}
			>
				<Input input name="email" type="email" placeholder="Email" />
			</Form.Item>
		
			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password name="password" type="password" placeholder="Password"/>
			</Form.Item>
		
			<Form.Item {...tailLayout} name="remember" valuePropName="checked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>
		
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
				Sign Up
				</Button>
				<Button onClick={gotoLanding}>Cancel</Button>
			</Form.Item>
			</Form>
		</div>
	  );
};

export default withRouter(SignupScreen);