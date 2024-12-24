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
      const response = await axios.post('http://localhost:5000/api/login', values);
      console.log("Login Response:", response.data); // Log the response to debug
  
      const { token, userId } = response.data;
  
      // Store token and userId
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
  
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
    backgroundColor: '#f0f2f5', // Optional background color
  },
  form: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff', // Optional form background color
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



