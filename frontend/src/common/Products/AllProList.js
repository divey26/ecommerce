import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography,Skeleton, message, Modal, Input, Button } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { useCart } from '../cart/CartContext'; // Import CartContext


const { Title, Text } = Typography;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access addToCart function
  const { authenticated } = useContext(AuthContext); // Access authenticated state


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
  

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    return stars.join(' ');
  };

  const trimDescription = (description, maxLength = 50) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  if (loading) return <Skeleton active />;
  
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
                cover={
                  <img
                    alt={product.itemName}
                    src={product.imageURL}
                    style={{
                      height: 200,
                      objectFit: 'scale-down',
                      width: '100%',
                      padding: '10px',
                    }}
                  />
                }
                style={{
                  width: '100%',
                  height: 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '10px',
                }}
              >
                <div>
                  <Row align="middle" justify="start" style={{ marginBottom: '10px' }}>
                    {product.discount > 0 ? (
                      <>
                        <Col>
                          <Title level={4} style={{ color: 'Green', margin: 0 }}>
                            $
                            {(
                              product.price - (product.price * product.discount) / 100
                            ).toFixed(2)}
                          </Title>
                        </Col>
                        <Col style={{ marginLeft: '10px' }}>
                          <Text
                            style={{
                              textDecoration: 'line-through',
                              fontSize: '15px',
                              color: '#a0a0a0',
                            }}
                          >
                            ${product.price}
                          </Text>
                        </Col>
                      </>
                    ) : (
                      <Col>
                        <Title level={4} style={{ color: '#004f9a', margin: 0 }}>
                          ${product.price}
                        </Title>
                      </Col>
                    )}
                  </Row>

                  <p
                    style={{
                      fontSize: '12px',
                      height: '40px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {product.itemName} | {trimDescription(product.description)}
                  </p>

                  <Text style={{ fontSize: '15px' }}>
                    {renderStars(product.rating)} {product.rating}
                  </Text>
                </div>

                {authenticated ? (
                  <Button
                    style={{
                      marginTop: 'auto',
                      borderRadius: '40px',
                      color: 'white',
                      backgroundColor: '#004f9a',
                    }}
                    onClick={() => {
                      addToCart(product);
                      message.success(`${product.itemName} added to the cart`);
                    }}
                    
                  >
                    + ADD
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginTop: 'auto',
                      borderRadius: '40px',
                      color: 'white',
                      backgroundColor: '#a0a0a0',
                    }}
                    disabled
                  >
                    Login to Add
                  </Button>
                )}
              </Card>
            </Col>
          ))
        )}
      </Row>

     
    </div>
  );
};

export default ProductsList;
