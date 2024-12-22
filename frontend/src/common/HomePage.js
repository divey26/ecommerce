import { Layout, Row, Card as AntCard, Col, Button, Carousel } from 'antd';
import LayoutNew from '../Layout';
import styled from 'styled-components';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import videoSrc from '../Video/video.mp4';

// Import images for the carousel
import p1 from "../Images/p1.jpg";
import p2 from "../Images/p2.jpg";
import p3 from "../Images/p3.jpg";
import p4 from "../Images/p4.jpg";
import prod1 from "../Images/prod1.png"
import banner1 from "../Images/valBanner.jpg"

import {
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

// Import images from the specified directory
import backgroundImage from "./../p1.jpg";
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
    else if (key === '4') {
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
              paddingTop: 0
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

        {/* Carousel Component */}
        <Carousel autoplay dotPosition="bottom" autoplaySpeed={2000}>
          <div>
            <img src={p1} alt="p1" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
          </div>
          <div>
            <img src={p2} alt="p2" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
          </div>
          <div>
            <img src={p3} alt="p3" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
          </div>
          <div>
            <img src={p4} alt="p4" style={{ width: "100%", height: "600px", objectFit: "cover" }} />
          </div>
        </Carousel>

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
        
        <div >
            <img src={banner1} style={{ width: "100%", height: "10%" }} />
          </div>

        {/* Video and Image Side by Side */}
        <VideoAndImageContainer>
          <div className="video-container">
            <ReactPlayer
              url={videoSrc}
              width="100%"
              height="auto"
              muted
              playing
              loop
            />
          </div>
          
          <div className="image-container">
            <img src={prod1} alt="p2" style={{ width: "100%", height: "10%" }} />
          </div>
        </VideoAndImageContainer>

      </Layout>
    </LayoutNew>
  );
};

const StyledHeader = styled(Header)`
  background-color: #F3C623 !important;
  color: white;
  height: auto !important;
  padding: 5px 0 !important;
  margin-bottom: 15px;
  line-height: 1;
  overflow: hidden;
  position: relative;

  h1 {
    margin: 0 !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
    white-space: nowrap;
    animation: scrollText 17s linear infinite;
  }

  @keyframes scrollText {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const StyledHeader1 = styled(Header)`
  background-color: #E3F4F4 !important;
  color: white;
  height: auto !important;
  padding: 5px 0 !important;
  margin-bottom: 5px;
  line-height: 1;
  margin-top: 5px;

  h1 {
    margin: 0 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
  }
`;

const ContentSection = styled.div`
  background-color: #00000;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
`;

const VideoAndImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #4DA1A9 !important;
  padding: 20px;
  margin-top: 40px;

  .video-container {
    width: 63%;
  }

  .image-container {
    width: 35.5%;
    height: 50%;  // Set the height to 100% to match the height of the video
    margin-right:10px:
    }
`;


const StyledCard = styled(AntCard)`
  background-color: rgba(160, 147, 125, 0.5);
  padding:10px;
  
  .ant-card-meta-title {
    color: #000000;
  }
  .ant-card-meta-description {
    color: #000000;
  }
  .ant-card-cover img {
    border-radius: 5px;
  }

  .ant-card-body {
    transition: none;
  }

  &:hover {
    background-color: #A0937D;
    box-shadow: none;
    cursor: default;
  }
`;


const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

export default HomePage;
