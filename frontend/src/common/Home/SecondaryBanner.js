import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Layout } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const { Title } = Typography;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 260px; // Set consistent card height
  color: #ffffff;
  text-align: left;
`;


const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 3;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;



// Main Page Component
const Page1 = () => {
  const [cards, setCards] = useState([]); // To store the fetched cards from the backend

  // Fetch stored cards
  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/card'); // Adjust endpoint as per your backend
      setCards(response.data);
    } catch (error) {
      console.log('Failed to fetch cards');
    }
  };

  // UseEffect to fetch cards when the component mounts
  useEffect(() => {
    fetchCards();
  }, []);

  return (
        <div style={{ marginLeft: "120px", marginTop:'15px', backgroundColor: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            {/* Left column */}
            <Col xs={24} md={8}>
              {cards.map(card =>
                card.layout === 'Left' && (
                  <CardContainer key={card._id} style={{height:"515px"}}>
                    <CardImage src={card.image} alt={card.title} />
                    <TextContainer>
                      <div>
                        <h1 style={{color:'#004f9a',marginTop:"1px"}}>{card.title}</h1>
                        <Button type="link" style={{ color: '#004f9a' }}>
                          {card.description}
                        </Button>
                      </div>

                    </TextContainer>
                  </CardContainer>
                )
              )}

              
            </Col>

            <Col xs={24} md={15}>
              <Row gutter={[16, 16]} style={{ height: '300px' }}>
                <Col xs={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {cards.map(card =>
                    card.layout === 'M1' && (
                      <CardContainer key={card._id} style={{height:"240px"}} >
                        <CardImage src={card.image} alt={card.title} />
                        <TextContainer>
                          <div>
                          <h1 style={{color:'#004f9a',marginTop:"1px"}}>{card.title}</h1>
                          <Button type="link" style={{ color: '#004f9a' }}>
                              {card.description}
                            </Button>
                          </div>
                        </TextContainer>
                      </CardContainer>
                    )
                  )}
                  <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                    {cards.map(card =>
                      card.layout === 'M2' && (
                        <Col xs={12} key={card._id}>
                          <CardContainer>
                            <CardImage src={card.image} alt={card.title} />
                            <TextContainer>
                              <div>
                              <h1 style={{color:'#004f9a',marginTop:"1px"}}>{card.title}</h1>
                              <Button type="link" style={{ color: '#004f9a' }}>
                                  {card.description}
                                </Button>
                              </div>
                            </TextContainer>
                          </CardContainer>
                        </Col>
                      )
                    )}
                    {cards.map(card =>
                      card.layout === 'M3' && (
                        <Col xs={12} key={card._id}>
                          <CardContainer>
                            <CardImage src={card.image} alt={card.title} />
                            <TextContainer>
                              <div>
                              <h1 style={{color:'#004f9a',marginTop:"1px"}}>{card.title}</h1>
                              <Button type="link" style={{ color: '#004f9a' }}>
                                  {card.description}
                                </Button>
                              </div>

                            </TextContainer>
                          </CardContainer>
                        </Col>
                      )
                    )}
                  </Row>
                </Col>
                {cards.map(card =>
                  card.layout === 'Right' && (
                    <Col xs={12} key={card._id}>
                      <CardContainer style={{height:"515px"}}>
                        <CardImage src={card.image} alt={card.title} />
                        <TextContainer>
                          <div>
                          <h1 style={{color:'#004f9a',marginTop:"1px"}}>{card.title}</h1>
                          <Button type="link" style={{ color: '#004f9a' }}>
                              {card.description}
                            </Button>
                          </div>
                        </TextContainer>
                      </CardContainer>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>
        </div>

  );
};

export default Page1;
