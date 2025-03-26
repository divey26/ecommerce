import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    sellerId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    shopName: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [form] = Form.useForm();  // Initialize the form instance

  // Fetch the seller ID when the component mounts
  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sellers/getSellerId'); // Add the appropriate route for getting the seller ID
        const data = await response.json();
        if (response.ok) {
          setFormData((prevData) => ({
            ...prevData,
            sellerId: data.sellerId, // Set the sellerId to the fetched value
          }));
          form.setFieldsValue({ sellerId: data.sellerId }); // Set the form value directly
        } else {
          setError(data.message);
          message.error(data.message);
        }
      } catch (error) {
        setError('Error fetching seller ID');
        message.error('Error fetching seller ID');
      }
    };

    fetchSellerId();
  }, [form]); // Added 'form' as a dependency to avoid stale closures

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/sellers/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        message.success('Seller registered successfully!');
        // Redirect or reset the form
      } else {
        setError(result.message);
        message.error(result.message);
      }
    } catch (error) {
      setError('Error during signup.');
      message.error('Error during signup.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Card
        title="Seller Signup"
        bordered={false}
        style={{ width: 400, padding: '32px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <Form
          form={form} // Pass the form instance to the Form component
          name="sellerSignup"
          onFinish={handleSubmit}
          initialValues={formData}
          layout="vertical"
        >
          <Form.Item
            label="Seller ID"
            name="sellerId"
            rules={[{ required: true, message: 'Please input your Seller ID!' }]}
          >
            <Input name="sellerId" value={formData.sellerId} disabled onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input name="email" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input name="phone" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input name="address" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Shop Name"
            name="shopName"
            rules={[{ required: true, message: 'Please input your shop name!' }]}
          >
            <Input name="shopName" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
            hasFeedback
          >
            <Input.Password name="confirmPassword" onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SellerSignup;
