import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import imageSrc from "../../Images/logo.png";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', values);
      console.log("Login Response:", response.data);
  

      const { token, userId, email, address, phone } = response.data;
  
      // Store token, userId, email, address, and phone in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', email); // Store the user's email
      localStorage.setItem('userAddress', address); // Store the user's address
      localStorage.setItem('userPhone', phone); // Store the user's phone number


     
      console.log(localStorage.getItem('userAddress'));  // Check if the address is stored correctly
      console.log(localStorage.getItem('userPhone'));    // Check if the phone is stored correctly
  
  
      // Redirect user to the home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  
    
  return (
    <div style={styles.container}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        style={styles.form}
        scrollToFirstError
      >
         <div style={{ textAlign: "center", padding: "20px 0" }}>
          <img src={imageSrc} alt="Logo" style={{ width: "80%" }} />
        </div>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Inline styles for centering and responsiveness
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgb(224, 245, 249)', // Optional form background color

  },
  form: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#004f9a', // Optional background color
    borderRadius: '8px', // Optional rounded corners
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional shadow effect
  },
  // Responsive design for smaller screens
  '@media (max-width: 768px)': {
    form: {
      padding: '15px',
    },
  },
};

export default Login;
