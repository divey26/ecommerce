import React, { useEffect } from "react";
import { List, Button, Typography, message } from "antd";
import { useCart } from "../cart/Cartcontext";
import { useLocation } from 'react-router-dom'; // Import useLocation

const { Title } = Typography;

const Cart = ({ userId: propUserId }) => {
  const { cart, fetchCart, setCart } = useCart();
  const location = useLocation();
  
  // Retrieve userId from location.state or fallback to propUserId
  const userId = location.state?.userId || propUserId;

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing. Ensure the user is logged in.");
      return;
    }
    fetchCart(userId); // Now it has the userId correctly
  }, [userId, fetchCart]);

  const removeFromCart = async (productId) => {
    try {
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      setCart(cart.filter((item) => item.productId !== productId));
      message.success("Product removed from cart");
    } catch (err) {
      message.error("Failed to remove product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>My Cart</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty. Start adding items!</p>
      ) : (
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[<Button onClick={() => removeFromCart(item.productId)}>Remove</Button>]}
            >
              <List.Item.Meta
                avatar={<img src={item.imageURL} alt={item.itemName} style={{ width: 50 }} />}
                title={item.itemName}
                description={`$${item.price} x ${item.quantity}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Cart;


