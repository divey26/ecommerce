import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message, Select, Table } from 'antd';
import axios from 'axios';
import { storage } from '../../common/firebaseConfig'; // Import storage from firebaseConfig
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase storage functions

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // To track the upload state
  const [layout, setLayout] = useState('default'); // Default layout value
  const [cards, setCards] = useState([]); // To store the fetched cards from the backend

  // Columns for the Table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Card" style={{ width: '100px' }} />,
    },
    {
      title: 'Layout',
      dataIndex: 'layout',
      key: 'layout',
    },
  ];

  // Fetch stored cards
  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/card'); // Adjust endpoint as per your backend
      setCards(response.data);
    } catch (error) {
      console.log('Failed to fetch cards')
    }
  };

  // UseEffect to fetch cards when the component mounts
  useEffect(() => {
    fetchCards();
  }, []);

  // Handle image file upload
  const handleImageUpload = async (file) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Add more as needed
    if (!supportedTypes.includes(file.type)) {
      message.error('Unsupported file type');
      return;
    }

    try {
      setIsUploading(true);  // Set uploading state to true
      const storageRef = ref(storage, `cards/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors
          message.error('Failed to upload image');
          setIsUploading(false);  // Set uploading state to false
        },
        async () => {
          // When upload is successful, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImage(downloadURL); // Set the image URL state
          setIsUploading(false);  // Set uploading state to false
          message.success('Image uploaded successfully');
        }
      );
    } catch (error) {
      message.error('Failed to upload image');
      setIsUploading(false);  // Set uploading state to false
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!title || !description || !image || !layout) {
      message.error('Please fill all fields');
      return;
    }
  
    const data = { title, description, image, layout };
  
    try {
      console.log('Sending data to backend:', data);  // Add this log to check data
      const response = await axios.post('http://localhost:5000/api/card', data);
      console.log('Backend response:', response);  // Check the response
      message.success('Card saved successfully');
      
      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setLayout('default'); // Reset layout selection
      fetchCards(); // Refresh the list of cards

    } catch (error) {
      console.log('Error during form submission:', error);  // Log error if any
      message.error('Failed to save card');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Title" name="title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item label="Layout" name="layout">
          <Select value={layout} onChange={(value) => setLayout(value)} style={{ width: '100%' }}>
            <Select.Option value="Right">Right card</Select.Option>
            <Select.Option value="M1">M1 card</Select.Option>
            <Select.Option value="M2">M2 card</Select.Option>
            <Select.Option value="M3">M3 card</Select.Option>
            <Select.Option value="Left">Left card</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Image">
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            accept="image/*"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isUploading}>
          Save
        </Button>
      </Form>

      <div style={{ marginTop: '20px' }}>
        <Table
          columns={columns}
          dataSource={cards} // Display the fetched data here
          rowKey="_id" // Assuming your card model has an _id field
        />
      </div>
    </div>
  );
};

export default AdminPage;
