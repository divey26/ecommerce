import React from 'react';
import { useCart } from '../common/CartContext';
import LayoutNew from '../Layout';
import { Card as AntCard, Row,Typography, Col, Button as AntButton,Space } from 'antd';
import styled from 'styled-components';
import { StockOutlined } from "@ant-design/icons";
import { Layout } from "antd";
const { Content } = Layout;
const { Title } = Typography;
const { Meta } = AntCard;

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <LayoutNew>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Space
            style={{
              background: "#543310",
              color: "white",
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
                style={{ fontSize: "24px", marginTop: "8px", color: "white" }}
              >
                Your Cart
              </Title>
            </Space>
          </Space>
        </Content>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ContentSection>
              <StyledRow gutter={[16, 16]}>
                {cartItems.map((item, index) => (
                  <Col key={index} xs={24} sm={12} md={4}>
                    <StyledCard
                      hoverable
                      cover={<StyledImage alt={item.itemname} src={item.imageURL} />}
                    >
                      <Meta
                        title={`${item.itemname} (x${item.quantity})`}
                        description={
                          <DescriptionWrapper>
                            <div>Price: Rs.{item.price}</div>
                            <div>Total: Rs.{item.price * item.quantity}</div>
                          </DescriptionWrapper>
                        }
                      />
                    </StyledCard>
                  </Col>
                ))}
              </StyledRow>
            </ContentSection>
          </div>
        )}
      </Layout>
    </LayoutNew>
  );
};

const ContentSection = styled.div`
  background-color: #FFEBD4;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const StyledCard = styled(AntCard)`
  background-color: #A0937D;
  width: 105%;
  height: 320px;
  
  .ant-card-meta-title {
    color: #000000;
    text-align: left;
  }
  .ant-card-meta-description {
    color: #000000;
    text-align: left;
  }
     .ant-card-body {
    transition: none;
  }

  &:hover {
    background-color: #A0937D; /* Same as the background color */
    box-shadow: none;
    cursor: default;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
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

export default Cart;
