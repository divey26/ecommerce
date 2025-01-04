import React from 'react';
import { Typography, Button, Row, Col, Layout } from 'antd';
import LayoutNew from './Layout';

// Import images
import p1 from '../Images/7.jpg';
import p2 from '../Images/2.jpg';
import p3 from '../Images/3.jpg';
import p4 from '../Images/8.jpg';
import p5 from '../Images/5.jpg';

const { Title } = Typography;

// Reusable Card Component
const CardComponent = ({ 
  title, 
  description, 
  buttonText, 
  imageSrc, 
  cardStyle = {}, 
  buttonStyle = {} 
}) => {
  const defaultCardStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    height: '330px', // Set consistent card height
    color: '#ffffff',
    textAlign: 'left',
    ...cardStyle,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  };

  const textContainerStyle = {
    position: 'relative',
    zIndex: 3,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  return (
    <div style={defaultCardStyle}>
      <img src={imageSrc} alt={title} style={imageStyle} />
      <div style={textContainerStyle}>
        <div>
          <Title level={4} style={{ color: '#004f9a', fontWeight: "bold" }}>{title}</Title>
          <Button type="link" style={{ color: '#004f9a' }}>
            {description}
          </Button>
        </div>
        <Button type="link" style={{ color: '#ffffff', fontWeight: 'bold', ...buttonStyle }}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const Page1 = () => {
  return (
    <LayoutNew>
      <Layout>
        <div style={{ marginLeft:"40px",padding: '20px', backgroundColor: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            {/* Left column */}
            <Col xs={24} md={8}>
              <CardComponent
                title="Put self-care first"
                description=""
                imageSrc={p1}
                cardStyle={{ height: '580px' }} // Adjust height for larger cards
              />
            </Col>

            {/* Right column */}
            <Col xs={24} md={15}>
              <Row style={{ height: '500px' }} gutter={[16, 16]}>
                <Col xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardComponent
                    title="Hot heaters"
                    description="Stay nice & toasty"
                    imageSrc={p2}
                    cardStyle={{ height: '260px' }} // Adjust height for larger cards

                  />
              <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col xs={12}>
                  <CardComponent
                    title="Get road-ready"
                    description="Keep rolling all winter"
                    imageSrc={p3}
                    cardStyle={{ height: '300px' }}
                  />
                </Col>
                <Col xs={12}>
                  <CardComponent
                    title="On way home"
                    description="Keep rolling all winter"
                    imageSrc={p4}
                    cardStyle={{ height: '300px' }}
                  />
                </Col>
              </Row>
                </Col>
                  <Col xs={12}>
                    <CardComponent
                      title="Dry skin? Try again."
                      description="Shop skincare"
                      imageSrc={p5}
                      cardStyle={{ height: '580px' }} // Adjust height for larger cards
                    />
                  </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Layout>
    </LayoutNew>
  );
};

export default Page1;
