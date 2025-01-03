import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const TopRated = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data.products || [];
        const topRated = allProducts
          .filter((product) => product.rating === 5)
          .slice(0, 6); // Limit to 6 products
        setTopRatedProducts(topRated);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to fetch top-rated products.');
      }
    };

    fetchTopRatedProducts();
  }, []);

  return (
    <div>
      {/* Other content of your HomePage */}

      <TopRatedSection>
        <Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>
          Top Rated Products
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {topRatedProducts.map((product) => (
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
                onClick={() => navigate(`/product/${product.productId}`)} // Navigate on card click

              >
                <div>
                  <Title level={4} style={{ color: '#004f9a' }}>
                    ${product.price}
                  </Title>
                  <p style={{ fontSize: '12px' }}>{product.itemName}</p>
                  <p>{'⭐'.repeat(5)}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </TopRatedSection>
    </div>
  );
};

// Styled Component for the section
const TopRatedSection = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 40px;
`;

export default TopRated;
