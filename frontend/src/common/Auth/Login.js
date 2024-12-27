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
          <img src={imageSrc} alt="Logo" style={{ width: "45%" }} />
        </div>

        <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#F3C623",
              textAlign: "center", // Add centering for the title
              paddingBottom: "20px", // Adjust spacing between title and form
            }}
          >
            HALO

            </div>
      
      <div style={{marginBottom:"8px",fontSize:"18px",color:"wheat",paddingTop:"15px",borderTop:"2px solid wheat"}}>Enter the Email</div>
        <Form.Item
          name="email"
          labelCol={{ span: 24 }} // Full-width label
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>
        
        <div style={{marginBottom:"8px",fontSize:"18px",color:"wheat"}}>Enter the </div>
        <Form.Item
          name="password"
          labelCol={{ span: 24 }} // Full-width label
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <br/>
        <br/>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%',backgroundColor:"#F3C623",color:"blue",fontSize:"20px" }}>Login</Button>
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
    backgroundColor: 'rgb(76, 149, 163)', // Optional form background color

  },
  form: {
    maxWidth: '500px',
    width: '100%',
    padding: '60px',
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
