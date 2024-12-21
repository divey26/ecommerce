import React from 'react';
import styled from 'styled-components';
import { Layout, Typography, Space } from "antd";
import LayoutNew from '../../Layout';
import { StockOutlined } from "@ant-design/icons";
import BreadList from './BreadList';

const { Title } = Typography;
const { Content } = Layout;

const Bread = () => {
  return (
    <div className="about">
      <LayoutNew>
        <Layout>
          <ContentWrapper>
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
                    Bread
                  </Title>
                </Space>
              </Space>
            </Content>
          </ContentWrapper>
          <BreadList />
        </Layout>
      </LayoutNew>
    </div>
  );
}

const ContentWrapper = styled.div`
  background-color: rgba(214, 218, 200, 0.70);
  padding: 1px;
  border-radius: 8px;
  text-align: center;
  max-width: 100%;
  width:100%;
`;

export default Bread;
