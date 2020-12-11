import React, { Component, useCallback, useContext } from "react"
import { Form, Input, Button, Checkbox, Typography } from 'antd';

import firebase from "../firebase";
import { AuthContext } from "../firebaseauth";

import { useHistory } from "react-router-dom";
import { Redirect, withRouter } from "react-router";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };
  const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
  };

const { Title } = Typography;
  

// class for logging in existing user
// from https://github.com/satansdeer/react-firebase-auth/blob/master/src/Login.js
const LoginScreen = () => {
	
	const history = useHistory();

	const onFinish = useCallback(
		async values => {
		console.log('Success:', values);
		const user_email = values.email;
		const user_password = values.password;
		try {
			await firebase.auth().signInWithEmailAndPassword(user_email, user_password);
			history.push("/home");
		} catch (error) {
			alert(error);
		}
	},[history]);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return (<Redirect to="/home" />);
	}

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
                <Title>Login</Title>
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
	
		
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
				Submit
				</Button>
				<Button onClick={gotoLanding}>Back</Button>
			</Form.Item>
			</Form>
		</div>
	  );
};

export default withRouter(LoginScreen);