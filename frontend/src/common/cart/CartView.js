import React, { useContext } from 'react';
import { Layout, Col, Row, Card, Button, Typography, List } from 'antd';
import { useCart } from './CartContext';
import LayoutNew from '../../Layout';
import { AuthContext } from '../../utils/AuthContext';  

import truck from "../../Images/truck-.png";
import car from "../../Images/car.png";
import deliver from "../../Images/supplier.png";


const { Title, Text } = Typography;
const { Content } = Layout;

const CartView = () => {
  const { cart, removeFromCart } = useCart();
  const { userDetails } = useContext(AuthContext);  // Access user details from the context

  const appear=null;

  const trimDescription = (description, maxLength = 50) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };



  return (
    <LayoutNew>
      <Layout>
        <div style={{ display: 'flex', padding: '20px' }}>
          <div style={{ flex: 3, marginRight: '20px' }}>
            <Title level={2}>Your Cart</Title>
            {cart.length === 0 ? (
              <div/>
            ) : (
            <div style={{ width: "830px", height: "250px", marginLeft: "200px", paddingTop: "23px" }}>
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8} lg={8} style={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    style={{
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      height: "200px",
                      width: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={truck}
                      alt="Shipping Icon"
                      style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                    />
                    <Text strong>Shipping</Text>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} style={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    style={{
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      height: "200px",
                      width: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(251, 54, 54, 0.1)",
                    }}
                  >
                    <img
                      src={car}
                      alt="Pickup Icon"
                      style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                    />
                    <Text strong>Pickup</Text>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} style={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    style={{
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      height: "200px",
                      width: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={deliver}
                      alt="Delivery Icon"
                      style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                    />
                    <Text strong>Delivery</Text>
                  </Card>
                </Col>
              </Row>
            </div>
            )}

            {cart.length === 0 ? (
              <Text>No items in the cart  </Text>
            ) : (
              <List
                dataSource={cart}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '20px',
                      width: "830px",
                      marginLeft: "200px",
                      marginBottom: "2px",
                    }}
                  >
                    <div style={{ marginRight: '20px' }}>
                      <img
                        src={item.imageURL}
                        alt={item.itemName}
                        style={{
                          height: "120px",
                          objectFit: 'scale-down',
                          width: '120px',
                          padding: '10px',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: '18px' }}>{item.itemName}</Text>
                      <br />
                      <Text type="secondary" style={{ display: 'block', marginTop: '5px' }}>
                        {trimDescription(item.description)}
                      </Text>
                      <Text style={{ color: 'green', fontSize: '18px', display: 'block', marginTop: '10px' }}>
                        {item.discount > 0 ? (
                          `$${(item.price - (item.price * item.discount) / 100).toFixed(2)}`
                        ) : (
                          `$${item.price.toFixed(2)}`
                        )}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginTop: '5px' }}>
                        Standard Delivery within 7 Days
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '5px',
                          marginBottom: '10px',
                        }}
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>

          {cart.length === 0 ? (
              <div/>
            ) : (
          <div
            style={{
              flex: 1,
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              textAlign: 'left',
              backgroundColor: '#f8f9fa',
              height: 'fit-content',
              marginTop:"103px"
            }}
          >
            <Title level={3} style={{ textAlign: 'center' }}>Order Summary</Title>

            {/* Displaying user address and phone */}
            <div style={{ marginBottom: '20px' }}>
              <Text style={{ fontSize: '16px' }}><strong>Shipping Address:</strong></Text>
              <Text style={{ float: 'right', fontSize: '16px' }}>
                {userDetails ? userDetails.address : 'N/A'}
                {userDetails ? userDetails.phone : 'N/A'}

              </Text>
            </div>
            <br/>


            <div style={{ marginBottom: '20px',marginTop:"40px" }}>
              <Text style={{ fontSize: '16px' }}>
                <strong>Subtotal ({cart.length} items)</strong>
              </Text>
              <span style={{ float: 'right', textDecoration: 'line-through', color: 'gray' }}>
                ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Text style={{ fontSize: '16px', color: 'green' }}><strong>Savings</strong></Text>
              <span style={{ float: 'right', color: 'green' }}>
                -${cart.reduce((total, item) => total + (item.price * item.discount) / 100, 0).toFixed(2)}
              </span>
            </div>

            <div style={{ marginBottom: '20px' }}>
                
              <span style={{ float: 'right', color: 'green', fontSize: '15px' }}>
                ${cart.reduce((total, item) => total + (item.price - (item.price * item.discount) / 100), 0).toFixed(2)}
              </span>
              <br/>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text style={{ fontSize: '16px', color: 'grey' }}><strong>Shipping</strong></Text>
              <span style={{ float: 'right', color: 'green' }}>
                Free
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <Text style={{ float :"left",fontSize: '16px', color: 'black' }}><strong>Taxes</strong></Text>
              <span style={{ float: 'right', color: 'grey',fontSize:"16px" }}>
                Calulated at checkout
              </span>
            </div>
            <br/>

            <div style={{ marginBottom: '20px', borderTop: '1px solid #ddd', paddingTop: '10px',marginTop:"20px" }}>
              <Text style={{ fontSize: '18px' }}><strong>Total</strong></Text>
              <span style={{ float: 'right', color: 'green', fontSize: '18px' }}>
                ${cart.reduce((total, item) => total + (item.price - (item.price * item.discount) / 100), 0).toFixed(2)}
              </span>
            </div>
            <Button
              type="primary"
              style={{ marginTop: '20px', width: '100%' }}
            >
              Proceed to Checkout
            </Button>
          </div>
          )}

        </div>

        
      </Layout>
    </LayoutNew>
  );
};

export default CartView;
