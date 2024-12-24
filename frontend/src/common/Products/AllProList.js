import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, message, Modal, Input } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        message.error('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Handle Save Edit
  const handleSaveEdit = async () => {
    try {
      const updatedProduct = await axios.put(
        `http://localhost:5000/api/products/${editingProduct.productId}`,
        editingProduct
      );

      setProducts(
        products.map((p) =>
          p.productId === updatedProduct.data.product.productId
            ? updatedProduct.data.product
            : p
        )
      );
      setIsEditing(false);
      setEditingProduct(null);
      message.success('Product updated successfully');
    } catch (error) {
      message.error('Error updating product');
    }
  };


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    return stars.join(' ');
  };

  const trimDescription = (description, maxLength = 70) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Products</Title>
      <Row gutter={[16, 16]} justify="start" align="top">
        {loading ? (
          <Text>Loading products...</Text>
        ) : (
          products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={4} xl={4} key={product.productId}>
              <Card
                hoverable
                cover={<img alt={product.itemName} src={product.imageURL} style={{ height: 150, objectFit: 'cover' }} />}
                style={{ width: '100%', height: 400 }} // Set the fixed height here
              >
                <div style={{ textAlign: 'left', height: 'calc(100% - 100px)', overflow: 'hidden' }}>
                <Row align="middle" justify="start">
                    {product.discount > 0 ? (
                      <>
                        <Col>
                          <Title level={4} style={{ color: 'Green', margin: 0 }}>
                            ${product.price - (product.price * product.discount) / 100}
                          </Title>
                        </Col>
                        <Col style={{ marginLeft: '10px' }}>
                          <Text style={{ textDecoration: 'line-through', fontSize: '15px', color: '#a0a0a0' }}>
                            ${product.price}
                          </Text>
                        </Col>
                      </>
                    ) : (
                      <Col>
                        <Title level={4} style={{ color: '#004f9a', margin: 0 }}>${product.price}</Title>
                      </Col>
                    )}
                  </Row>

                  <p style={{ fontSize: '15px' }}>
                    {product.itemName} | {trimDescription(product.description)}
                  </p>
                  <Text style={{ fontSize: '15px' }}>
                    {renderStars(product.rating)} {product.rating}
                  </Text>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Modal for Editing Product */}
      <Modal
        title="Edit Product"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleSaveEdit}
      >
        <div>
          <Input
            value={editingProduct?.itemName}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, itemName: e.target.value })
            }
            placeholder="Item Name"
          />
          <Input
            value={editingProduct?.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            placeholder="Price"
            style={{ marginTop: 10 }}
          />
          <Input
            value={editingProduct?.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
            placeholder="Description"
            style={{ marginTop: 10 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductsList;
