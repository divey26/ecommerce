import React, { useState, useEffect } from 'react';
import { List, Card, Button, Typography, message } from 'antd';

const { Title, Text } = Typography;

const CartView = () => {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    const email = localStorage.getItem('userEmail'); // Retrieve the email
    setUserEmail(email); // Set the email in the state
  }, []);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    message.info('Product removed from the cart');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Your Cart</Title>
      {userEmail && <Text>Email: {userEmail}</Text>} {/* Display email at the top */}
      {cart.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={cart}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.itemName}>
                <Text>Price: ${item.price}</Text>
                <br />
                <Text>Description: {item.description}</Text>
                <br />
                <Button onClick={() => handleRemove(item.productId)}>Remove</Button>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CartView;
