import React, { useState, useEffect } from 'react'; // For useState and useEffect
import { Typography } from 'antd'; // For Typography
import { Layout, Row, Card as AntCard, message, Card, Col, Button, Carousel } from 'antd';
import LayoutNew from '../Layout';
import axios from 'axios'; 
import styled from 'styled-components';
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


//department



import {
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

// Import images from the specified directory
import backgroundImage from "./../p1.jpg";
const { Header, Content } = Layout;
const { Meta } = AntCard;

const { Title } = Typography;


const headerItem = [
  { key: "1", text: "Department" },
  { key: "2", text: "Help & Support" },
  { key: "3", text: "Sign up", icon: <UserSwitchOutlined /> },
  { key: "4", text: "Login", icon: <LogoutOutlined /> },
  { key: "5", text: "Language" },
];

const HomePage = () => {
    const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const handleHeaderClick = (key) => {
    if (key === "3") {
      navigate("/sign");
    }
    else if (key === '4') {
      navigate("/");
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cat');
      setCategories(response.data); // Store categories from the API
    } catch (error) {
      console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch categories. Please try again.');
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

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
            {headerItem.map((item) => (
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
          <h1>UP TO 40% DISCOUNT FOR THE PURCHASE BEFORE 5.00 PM TODAY (12.02.2024) - Hurry, grab your favorite items now! </h1>
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

          {/* Display categories in cards */}
          <Content style={{marginTop:"15px" , marginBottom:"15px"}}>
          <Row gutter={[16, 16]} justify="center">
            {categories.map((category) => (
              <Col xs={24} sm={12} lg={8} xl={4} key={category.categoryId}>
                <StyledCard
                  hoverable
                  cover={
                    <img
                      alt={category.categoryName}
                      src={category.imageURL}
                    />
                  }
                >
                  <TitleStyle level={4} style={{ marginBottom:"50%"}}>
                    {category.categoryName}
                  </TitleStyle>
                </StyledCard>
              </Col>
            ))}
          </Row>

        </Content>


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
  height: 60px !important;
  padding: 5px 0 !important;
  margin-bottom: 5px;
  line-height: 1;
  margin-top: 25px;

  h1 {
    margin: 0 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
  }
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
  border: 1px solid  #d9d9d9;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px; /* Ensure uniform height for all cards */
  padding: 1px;


  .ant-card-cover img {
    border-bottom: 1px solid #d9d9d9;
    height: 250px;
    object-fit: cover;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .ant-card-body {
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TitleStyle = styled(Title)`
  text-align: center;
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #333; /* Adjust color as needed */
`;

export default HomePage;
