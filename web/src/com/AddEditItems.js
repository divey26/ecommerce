import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, Upload, message, Select } from 'antd';
import { storage, auth } from '../common/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { Option } = Select;

const ItemForm = ({ form, onFinish = () => {} }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      message.error("No file selected for upload.");
      return null;
    }

    try {
      setIsUploading(true);
      const userCredential = await signInWithEmailAndPassword(auth, "divensignature@gmail.com", "12345678");
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${file.name}`);
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
              message.success("Upload successful!");
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
      message.error(`Authentication failed: ${error.message}`);
      setIsUploading(false);
      return null;
    }
  };

  const handleSubmit = async (values) => {
    console.log('Form values before upload:', values);
    const imageURL = await handleUpload(file);
    if (imageURL) {
      console.log('Image URL:', imageURL);
      onFinish({ ...values, imageURL });
    } else {
      message.error('Image upload failed. Please try again.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="itemname"
            label="Name"
            rules={[{ required: true, message: 'Please input the item name!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' },
              {
                pattern: new RegExp(/^\d+(\.\d{1,2})?$/),
                message: 'Please enter a valid price (e.g., 10 or 10.99)',
              },
            ]}
          >
            <Input type="text"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select the item type!' }]}
          >
            <Select placeholder="Select item type">
              <Option value="bread">Bread</Option>
              <Option value="cake">Cake</Option>
              <Option value="croissant">Croissant</Option>
              <Option value="bun">Bun</Option>
              <Option value="sandwich">Sandwich</Option>
              <Option value="cookie">Cookie</Option>
            </Select>
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
            <Button>Select File</Button>
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
