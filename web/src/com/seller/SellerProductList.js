import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, message, Modal, Input } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SellerProductsList = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hideDiscount, setHideDiscount] = useState(false);

  // Calculate dynamic discount percentage based on stock levels
  const calculateDynamicDiscount = (values) => {
    const { initialStocks, currentStocks } = values;
    const stockPercentage = (currentStocks / initialStocks) * 100;

    if (stockPercentage > 75) return 0; // No discount
    if (stockPercentage > 50) return 5; // 5% discount
    if (stockPercentage > 25) return 8; // 8% discount
    if (stockPercentage > 15) return 10; // 10% discount
    return 12; // 12% discount
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/seller/${sellerId}`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        message.error('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]); // Trigger the effect when the sellerId changes

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = await axios.put(
        `http://localhost:5000/api/products/${editingProduct.productId}`,
        editingProduct
      );

      setProducts(products.map((p) => (p.productId === updatedProduct.data.product.productId ? updatedProduct.data.product : p)));
      setIsEditing(false);
      setEditingProduct(null);
      message.success('Product updated successfully');
    } catch (error) {
      message.error('Error updating product');
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product.productId !== productId));
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Error deleting product');
    }
  };

  const handleCurrentStockChange = (e) => {
    const updatedProduct = { ...editingProduct, currentStocks: e.target.value };
    updatedProduct.discount = calculateDynamicDiscount(updatedProduct);
    setEditingProduct(updatedProduct);
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Dis',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => `${text}`,
    },
    {
      title: 'Initial Stocks',
      dataIndex: 'initialStocks',
      key: 'initialStocks',
      render: (text) => `$${text}`,
    },
    {
      title: 'Current Stocks',
      dataIndex: 'currentStocks',
      key: 'currentStocks',
      render: (stocks) => (
        <span style={{ color: stocks < 5 ? "red" : "green", fontWeight: "bold" }}>
          {stocks}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleEditClick(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDeleteClick(record.productId)} type="danger">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Products List</Title>
      <Table columns={columns} dataSource={products} rowKey="productId" loading={loading} pagination={{ pageSize: 10 }} />

      <Modal title="Edit Product" open={isEditing} onCancel={() => setIsEditing(false)} onOk={handleSaveEdit}>
        <div>
          <div style={{ marginBottom: 10 }}>
            <label>Item Name</label>
            <Input
              value={editingProduct?.itemName}
              onChange={(e) => setEditingProduct({ ...editingProduct, itemName: e.target.value })}
              placeholder="Item Name"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Price</label>
            <Input
              value={editingProduct?.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              placeholder="Price"
            />
          </div>

          {!hideDiscount && (
            <div style={{ marginBottom: 10 }}>
              <label>Discount</label>
              <Input
                value={editingProduct?.discount}
                onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })}
                placeholder="Discount"
                disabled
              />
            </div>
          )}

          <div style={{ marginBottom: 10 }}>
            <label>Description</label>
            <Input
              value={editingProduct?.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              placeholder="Description"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Initial Stocks</label>
            <Input
              value={editingProduct?.initialStocks}
              disabled
              placeholder="Initial Stocks"
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Current Stocks</label>
            <Input
              value={editingProduct?.currentStocks}
              onChange={handleCurrentStockChange}
              placeholder="Current Stocks"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerProductsList;
