//homepage.js
import { Layout, Row, Card as AntCard, Col,Button } from 'antd';
import LayoutNew from '../Layout';
import styled from 'styled-components';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import videoSrc from './../video.mp4';

import {
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

// Import images from the specified directory
import backgroundImage from "./../p1.jpg"
const { Header, Content } = Layout;
const { Meta } = AntCard;


const headerIteam = [
  { key: "1", text: "Department" },
  { key: "2", text: "Help & Support" },
  { key: "3", text: "Sign up", icon: <UserSwitchOutlined /> },
  { key: "4", text: "Login", icon: <LogoutOutlined /> },
  { key: "5", text: "Language" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const handleHeaderClick = (key) => {
    if (key === "3") {
      navigate("/sign");
    }
    else if(key==='4'){
      navigate("/");
    }
  };

  return (
    <LayoutNew>
      <Layout>
        {/* Add a header */}
        <StyledHeader1>
        <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "flex-end",
              paddingTop:0
            }}
          >
            {headerIteam.map((item) => (
              <Button
                key={item.key}
                type="text"
                icon={item.icon}
                style={{ color: "Black", fontSize: "20px" }}
                onClick={() => handleHeaderClick(item.key)}
              >
                {item.text}
              </Button>
            ))}
          </div>


        </StyledHeader1>
        {/* Add a header */}
        <StyledHeader>
          <h1>40% DISCOUNT FOR THE PURCHASE BEFORE 5.00 PM TODAY (12.02.2024) - Hurry, grab your favorite items now! </h1>
        </StyledHeader>
        <BackgroundContainer>
          <ContentWrapper>
            <h1 style={{ fontSize:"50px",marginTop:"10px"}}>Welcome to Sweet Street Bakery</h1>
            <p style={{fontSize:"17px",marginTop:"1px",marginLeft:"10px"}}>
              At Sweet Street Bakery, we believe that every bite should be a delightful experience. Our passion for baking shines through in each and every treat we create, from our freshly baked bread to our decadent cakes and pastries. Whether you're stopping by for a quick snack or planning a special occasion, we have something to satisfy every craving.
            </p>
          </ContentWrapper>
        </BackgroundContainer>

        <ContentSection>
          <StyledRow gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp12749476.jpg" />}
                onClick={() => navigate('/bread')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Breads</span>} />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2378609.jpg" />}
                onClick={() => navigate('/croissants')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Croissants</span>} />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp3055487.jpg" />}
                onClick={() => navigate('/cookies')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Cookies</span>} />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp12766510.jpg" />}
                onClick={() => navigate('/buns')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Buns</span>} />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2053450.jpg" />}
                onClick={() => navigate('/sandwiches')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Sandwiches</span>} />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StyledCard
                hoverable
                cover={<img alt="example" src="https://wallpapercave.com/w/wp2954058.jpg" />}
                onClick={() => navigate('/cakes')}
              >
                <Meta title={<span style={{ fontSize: '20px' }}>Cakes</span>} />
              </StyledCard>
            </Col>
          </StyledRow>
        </ContentSection>

        <VideoContainer>
          <ReactPlayer
            url={videoSrc}
            width="100%"
            height="auto"
            controls
          />
        </VideoContainer>
      </Layout>
    </LayoutNew>
  );
};

const StyledHeader = styled(Header)`
  background-color: #a0937d !important; /* Ensure custom styles are applied */
  color: white;
  height: auto !important; /* Remove any predefined height from Ant Design */
  padding: 5px 0 !important; /* Minimized padding for a thinner header */
  margin-bottom: 15px; /* Reduced space below the header */
  line-height: 1; /* Compact line height */
  overflow: hidden; /* Hide overflowing text */
  position: relative;

  h1 {
    margin: 0 !important; /* Remove margin */
    font-size: 18px !important; /* Adjust font size */
    font-weight: 600 !important; /* Maintain lighter font weight */
    padding: 0 !important; /* Remove padding */
    line-height: 1.2 !important; /* Ensure proper alignment */
    white-space: nowrap; /* Prevent text wrapping */
    animation: scrollText 17s linear infinite; /* Apply animation */
  }

  @keyframes scrollText {
    from {
      transform: translateX(100%); /* Start from the right */
    }
    to {
      transform: translateX(-100%); /* End off-screen on the left */
    }
  }
`;

const StyledHeader1 = styled(Header)`
  background-color: #4DA1A9 !important; /* Ensure custom styles are applied */
  color: white;
  height: auto !important; /* Remove any predefined height from Ant Design */
  padding: 5px 0 !important; /* Minimized padding for a thinner header */
  margin-bottom: 5px; /* Reduced space below the header */
  line-height: 1; /* Compact line height */
  margin-top: 5px;

  h1 {
    margin: 0 !important; /* Remove margin */
    font-size: 14px !important; /* Further reduced font size */
    font-weight: 600 !important; /* Maintain lighter font weight */
    padding: 0 !important; /* Remove padding */
    line-height: 1.2 !important; /* Ensure proper alignment */
  }
`;





const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  background-color: rgba(214, 218, 200, 0.70); /* RGBA color with alpha for transparency */
  padding: 1px;
  border-radius: 8px;
  
  text-align: center;
  margin-top: 50px;
  max-width: 90%;
  width:100%; /* Ensure this is not too wide for mobile */
`;

const ContentSection = styled.div`
  background-color: #00000;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const StyledCard = styled(AntCard)`
  background-color: rgba(160, 147, 125, 0.5);
  padding:10px;
  
  .ant-card-meta-title {
    color: #000000; /* Change this color to your desired title color */
  }
  .ant-card-meta-description {
    color: #000000; /* Change this color to your desired description color */
  }
  .ant-card-cover img {
    border-radius: 5px; /* Adjust this value to curve the edges more or less */
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

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

export default HomePage;
