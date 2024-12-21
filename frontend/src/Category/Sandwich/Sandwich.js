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
import SandwihList from './SandwichList'


const { Title } = Typography;
const { Content } = Layout;
const Bread = () => {
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
                Sandwiches
              </Title>
            </Space>
          </Space>
        </Content>
        <SandwihList/>
</Layout>
   </LayoutNew>

      
  );
}

export default Bread;
