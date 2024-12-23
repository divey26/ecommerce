import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, message } from 'antd';
import ReactPlayer from 'react-player';
import axios from 'axios';

const { Title, Text } = Typography;

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos/get-all-videos');
      setVideos(response.data.map(video => ({ ...video, isPlaying: false }))); // Add isPlaying state to each video
    } catch (error) {
      console.error('Error fetching videos:', error);
      message.error('Failed to fetch videos. Please try again.');
    }
  };

  const handleMouseEnter = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId ? { ...video, isPlaying: true } : video
      )
    );
  };

  const handleMouseLeave = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId ? { ...video, isPlaying: false } : video
      )
    );
  };

  useEffect(() => {
    fetchVideos(); // Fetch videos on component mount
  }, []);

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Trending Shorts</Title>
        <Row gutter={[16, 16]} justify="center">
          {videos.map((video) => (
            <Col xs={24} sm={12} md={8} lg={6} key={video._id}>
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#fff',
                }}
                onMouseEnter={() => handleMouseEnter(video._id)}
                onMouseLeave={() => handleMouseLeave(video._id)}
              >
                {/* Video Section */}
                <div style={{ position: 'relative', paddingBottom: '177%', height: 0 }}>
                  <ReactPlayer
                    url={video.videoURL}
                    playing={video.isPlaying}
                    loop
                    muted
                    controls={false}
                    width="100%"
                    height="100%"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>

                {/* Product Information */}
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <Title level={5} style={{ marginBottom: '5px' }}>{`Product: ${video.productId}`}</Title>
                  <Text style={{ color: '#555' }}>{video.productId}</Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
