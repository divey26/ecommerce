import React, { useState, useEffect } from 'react';
import { Layout, Space, Typography, Form, message, Button, Modal, Table, Image, Select } from "antd";
import axios from 'axios'; 
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';
import ItemForm from './AddEditItems'; // Ensure the import path is correct

const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const [form] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('');  // Store selected type

  const handleCancel = () => {
    setIsAddItemModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      console.log('Entered details:', values);
      const response = await axios.post('http://localhost:5000/api/items', values);
      console.log('Form data saved:', response.data);
      fetchItems(selectedType);  // Fetch items based on selected type
      setIsAddItemModalVisible(false);
      message.success(`${values.type.charAt(0).toUpperCase() + values.type.slice(1)} item added successfully!`);
    } catch (error) {
      console.error('Error saving form data:', error.response ? error.response.data : error.message);
      message.error(`Item creation failed: ${error.response?.data?.error || 'Please try again.'}`);
    }
  };

  const fetchItems = async (type = '') => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items${type ? `?type=${type}` : ''}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchItems();  // Fetch all items by default
  }, []);

  const handleFilterChange = (value) => {
    setSelectedType(value);
    fetchItems(value);  // Fetch items based on selected type
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemname',
      key: 'itemname',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text, record) => <Image width={100} src={record.imageURL} />
    },
  ];

  const tableHeaderStyle = {
    backgroundColor: '#f0f0f0',
  };

  return (
    <div className="about">
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
              <Title
                level={2}
                style={{ fontSize: "24px", marginTop: "8px", color: "black" }}
              >
                Items
              </Title>
            </Space>
            <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
              Add Item
            </Button>
          </Space>

          {/* Filter Dropdown */}
          <Space style={{ marginTop: '20px' }}>
            <Select
              value={selectedType}
              onChange={handleFilterChange}
              style={{ width: 200 }}
              placeholder="Select Item Type"
            >
              <Option value="">All</Option>
              <Option value="bread">Bread</Option>
              <Option value="cake">Cake</Option>
              <Option value="croissant">Croissant</Option>
              <Option value="bun">Bun</Option>
              <Option value="sandwich">Sandwich</Option>
              <Option value="cookie">Cookie</Option>
            </Select>
          </Space>

          <Table
            dataSource={items}
            columns={columns}
            rowKey="_id"
            style={{ marginTop: '20px' }}
            onHeaderRow={() => {
              return {
                style: tableHeaderStyle,
              };
            }}
          />

          <Modal
            open={isAddItemModalVisible}
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  onFinish(values);
                })
                .catch((errorInfo) => {
                  console.log("Validation Failed:", errorInfo);
                });
            }}
          >
            <ItemForm form={form} onFinish={onFinish} />
          </Modal>
        </Layout>
      </LayoutNew>
    </div>
  );
};

export default Dashboard;
