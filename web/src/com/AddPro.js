import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Upload, message, Space, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'; // Import the icons
import { storage } from '../common/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const ItemForm = ({ form, onFinish = () => {}, categories }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  console.log('Selected Category ID:', selectedCategory);
  console.log('Available Subcategory Options:', subcategoryOptions);

  // Handle file selection
  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  // Update subcategories when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = categories.find(cat => cat.categoryId === selectedCategory);
      if (selectedCat) {
        setSubcategoryOptions(selectedCat.subcategories || []);
      } else {
        setSubcategoryOptions([]);
      }
      setSelectedSubcategory(null); // Clear subcategory when category changes
      form.resetFields(['subcategory']); // Reset the subcategory field in the form
    }
  }, [selectedCategory, categories, form]);
  
  
  
  // Upload image to Firebase
  const handleUpload = async (file) => {
    if (!file) {
      message.error('No file selected for upload.');
      return null;
    }

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `items/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            message.error(`Upload failed: ${error.message}`);
            setIsUploading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              message.success('Upload successful!');
              setIsUploading(false);
              resolve(downloadURL);
            } catch (error) {
              message.error(`Failed to retrieve download URL: ${error.message}`);
              setIsUploading(false);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      message.error(`Error: ${error.message}`);
      setIsUploading(false);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const imageURL = await handleUpload(file);
    if (imageURL) {
      onFinish({ ...values, imageURL, category: selectedCategory, subcategory: selectedSubcategory });
    } else {
      message.error('Image upload failed. Please try again.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: 'Please input the item name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the item price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please input the rating!' }]}
          >
            <Input type="number" max={5} min={1} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select onChange={setSelectedCategory} placeholder="Select Category">
              {categories.map((category) => (
                <Select.Option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item
  name="subcategory"
  label="Subcategory"
  rules={[{ required: true, message: 'Please select a subcategory!' }]}
>
  <Select
    value={selectedSubcategory}
    onChange={setSelectedSubcategory}
    placeholder="Select Subcategory"
    disabled={subcategoryOptions.length === 0}
  >
    {Array.isArray(subcategoryOptions) && subcategoryOptions.length > 0
      ? subcategoryOptions.map((sub) => (
          <Select.Option key={sub._id} value={sub.name}>
            {sub.name}
          </Select.Option>
        ))
      : null}
  </Select>
</Form.Item>



        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="offerName"
            label="Offer Name"
            rules={[{ required: true, message: 'Please input the offer name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true, message: 'Please input the discount!' }]}
          >
            <Input type="number" max={100} min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={file ? [{ originFileObj: file, uid: '1', name: file.name }] : []}
          >
            <Button>Select Image</Button>
          </Upload>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Button type="primary" htmlType="submit" loading={isUploading}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ItemForm;
