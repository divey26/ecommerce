import React, { useEffect, useState } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton,InputNumber } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useCart } from '../../common/CartContext';

const { Meta } = AntCard;

const BunList = () => {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items?type=bun');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching breads:', error);
      }
    };

    fetchItems();
  }, []);

  
  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value,
    });
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item._id] || 0; // Default to 1 if no quantity is set
    addToCart({ ...item, quantity });
  };

  return (
    <ContentSection>
      <StyledRow gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8}>
            <StyledCard
              hoverable
              cover={<StyledImage alt={item.itemname} src={item.imageURL} />}
            >
              <Meta
                title={
                  <TitleWrapper>
                  <ItemName>{item.itemname}</ItemName>
                  <ItemPrice>Rs.{item.price}</ItemPrice>
                </TitleWrapper>
                }
                description={
                  <DescriptionWrapper>
                    <div>Price: Rs.{item.price}</div>
                    <div>{item.description}</div>
                  </DescriptionWrapper>
                }
              />
              <QuantityWrapper>
                <AntButton icon={<MinusOutlined />} onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)} />
                <InputNumber 
                  min={1} 
                  value={quantities[item._id] || 0} 
                  onChange={(value) => handleQuantityChange(item._id, value)} 
                />
                <AntButton icon={<PlusOutlined />} onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) + 1)} />
              </QuantityWrapper>
              <StyledButton onClick={() => handleAddToCart(item)}>Add to Cart</StyledButton>         
            </StyledCard>
          </Col>
        ))}
      </StyledRow>
    </ContentSection>
  );
};

const ContentSection = styled.div`
  background-color: #000000;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const StyledCard = styled(AntCard)`
  background-color: rgba(160, 147, 125, 0.5);
  width: 100%;
  height: 450x;
  
  .ant-card-meta-title {
    color: #000000;
    text-align: left;
  }
  .ant-card-meta-description {
    color: #000000;
    text-align: left;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemName = styled.span`
  font-weight: bold;
`;

const ItemPrice = styled.span`
  font-weight: bold;
`;


const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

const DescriptionWrapper = styled.div`
  white-space: pre-line;
  text-align: left;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const StyledButton = styled(AntButton)`
  background-color: #FFC107;
  color: #000;
  border: none;
  margin-top: 10px;
  
  &:hover {
    background-color: #FFA000;
    color: #FFF;
  }
`;

export default BunList;
