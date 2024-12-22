import React, { useState, useEffect } from 'react';
import { Layout, Space, Typography, Form, message, Button, Modal, Table, Image } from "antd";
import axios from 'axios'; 
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';
import ItemForm from './AddPro'; // Make sure the import path is correct

const { Title } = Typography;

const ItemPage = () => {
  const [form] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories and items
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cat');
      setCategories(response.data);
      
    } catch (error) {
      message.error('Failed to fetch categories.');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      message.error('Failed to fetch items.');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const handleCancel = () => {
    setIsAddItemModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/items', values);
      fetchItems();
      setIsAddItemModalVisible(false);
      message.success('Item added successfully!');
    } catch (error) {
      message.error('Failed to add item.');
    }
  };

  return (
    <div className="item-page">
      <LayoutNew>
        <Layout>
          <Space
            style={{
              background: "#65451F",
              color: "black",
              padding: "12px",
              borderRadius: "8px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Space>
              <StockOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <Title level={2} style={{ fontSize: "24px", marginTop: "8px", color: "black" }}>
                Items
              </Title>
            </Space>
            <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
              Add Item
            </Button>
          </Space>

          <Table
            dataSource={items}
            columns={[
              { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
              { title: 'Category', dataIndex: 'category', key: 'category' },
              { title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory' },
              { title: 'Price', dataIndex: 'price', key: 'price' },
              { title: 'Rating', dataIndex: 'rating', key: 'rating' },
              { title: 'Offer', dataIndex: 'offerName', key: 'offerName' },
              { title: 'Discount', dataIndex: 'discount', key: 'discount' },
              { title: 'Image', dataIndex: 'imageURL', key: 'imageURL', render: (imageURL) => <Image width={100} src={imageURL} /> }
            ]}
            rowKey="_id"
            style={{ marginTop: '20px' }}
          />

          <Modal
            open={isAddItemModalVisible}
            title="Add Item"
            cancelText="Cancel"
            onCancel={handleCancel}
            okText="Submit"
            onOk={() => form.validateFields().then(onFinish)}
          >
            <ItemForm form={form} onFinish={onFinish} categories={categories} />
          </Modal>
        </Layout>
      </LayoutNew>
    </div>
  );
};

export default ItemPage;
