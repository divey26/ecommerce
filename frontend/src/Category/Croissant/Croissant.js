import React from 'react';
import { Layout, Typography,
  Form,
  Input,
  Space,
  Button,
  Modal,
  message,} from "antd";
import LayoutNew from '../../Layout';
import {
  PlusOutlined,
  StockOutlined,

} from "@ant-design/icons";
import CroissantList from './CroissantList'


const { Title } = Typography;
const { Content } = Layout;

const Bread = () => {
  return (
    <div className="about">


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
                Croissant
              </Title>
            </Space>
          </Space>
        </Content>
        <CroissantList/>
</Layout>
   </LayoutNew>

      </div>
  );
}

export default Bread;
