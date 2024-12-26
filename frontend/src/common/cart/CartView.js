import React, { useContext, useEffect } from 'react';
import { Layout, Col, Row, Card, Button, Typography, InputNumber, List } from 'antd';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import LayoutNew from '../../Layout';
import { AuthContext } from '../../utils/AuthContext';  
import { useDeadline } from "../DeadlineContext/DeadlineContext"; // Import Deadline Context
import truck from "../../Images/truck-.png";
import car from "../../Images/car.png";
import deliver from "../../Images/supplier.png";

const { Title, Text } = Typography;
const { Content } = Layout;

const CartView = () => {
  const { cart, removeFromCart, updateQuantity, addToCart } = useCart();
  const { userDetails } = useContext(AuthContext);  // Access user details from the context
  const { deadline } = useDeadline(); // Access deadline from shared state
  const navigate = useNavigate();

  const trimDescription = (description, maxLength = 50) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  // Calculate Subtotal and Savings
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  const savings = cart.reduce((total, item) => total + ((item.price * item.discount) / 100 * item.quantity), 0).toFixed(2);

  // Calculate Total before Flash Offer
  const Total = cart.reduce(
    (total, item) => total + ((item.price - (item.price * item.discount) / 100) * item.quantity),
    0
  );

  // Apply additional 12% increase if deadline is true
  const flashOfferIncrease = deadline ? Total * 0.12 : 0;
  const newTotal = (Total - flashOfferIncrease).toFixed(2);

  useEffect(() => {
    // Sync cart with form schema model in backend, assuming a backend API exists
    const syncCartWithBackend = async () => {
      try {
        // Example: Send the cart to your backend API to store it in your form schema model
        await fetch('http://localhost:5000/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
        });

        console.log(cart)
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      }
    };

    if (cart.length > 0) {
      syncCartWithBackend();
    }
  }, [cart]);

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
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.productId, value)}
                        style={{ marginBottom: '10px', width: '60px' }}
                      />
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
                  {userDetails ? userDetails.address : 'Address not provided'}
                  {userDetails ? userDetails.phone : 'N/A'}
                </Text>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Text style={{ fontSize: '16px' }}><strong>Subtotal ({cart.length} items)</strong></Text>
                <span style={{ float: 'right', textDecoration: 'line-through', color: 'gray' }}>
                  ${subtotal}
                </span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text style={{ fontSize: '16px', color: 'green' }}><strong>Savings</strong></Text>
                <span style={{ float: 'right', color: 'green' }}>
                  -${savings}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ float: 'right', color: 'green', fontSize: '20px' }}>
                  ${newTotal}
                </span>
                <br />
                <Text style={{ fontSize: '20px' }} strong>Total after Flash Offer</Text>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: '100%', backgroundColor: 'green' }}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </LayoutNew>
  );
};

export default CartView;
