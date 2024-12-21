//Layout.js
import React, { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  StockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { FloatButton,Badge } from "antd";
import { useNavigate } from "react-router-dom";
import imageSrc from "./logo.png";

const { Header, Content, Footer, Sider } = Layout;

const adminUserItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "Category",
    icon: <HomeOutlined />,
    label: "Category",
  },
  {
    key: "Complaint",
    icon: <HomeOutlined />,
    label: "Complaint",
  },
  {
    key: "FeedBack",
    icon: <HomeOutlined />,
    label: "FeedBack",
  },
  {
    key: "My Profile",
    icon: <HomeOutlined />,
    label: "My Profile",
  },
  {
    key: "AboutUs",
    icon: <CalendarOutlined />,
    label: "About Us",
    children: [
      {
        key: "Branches",
        icon: <AppstoreAddOutlined />,
        label: "Our Branches",
      },
      {
        key: "About",
        icon: <CheckCircleOutlined />,
        label: "Who we are",
      },
    ],
  },
  {
    key: "ContactUs",
    icon: <ApartmentOutlined />,
    label: "Contact Us",
    children: [
      {
        key: "Customer",
        icon: <StockOutlined />,
        label: "As a customer",
      },
      {
        key: "Employee",
        icon: <SyncOutlined />,
        label: "As a Employee",
      },
    ],
  },
];

const headerIteam = [
  { key: "1", text: "Department" },
  { key: "2", text: "Help & Support" },
  { key: "3", text: "Sign up", icon: <UserSwitchOutlined /> },
  { key: "4", text: "Login", icon: <LogoutOutlined /> },
  { key: "5", text: "Language" },
];

const App = ({ children, userType }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleHeaderClick = (key) => {
    if (key === "1") {
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/sign");
    }
    else if(key==='2'){
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/login");
    }
  };

  const [isBackTopVisible, setIsBackTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsBackTopVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (item) => {
    if (item.key === "dashboard") {
      navigate("/dashboard");
    }
    if (item.key === "Category") {
      navigate("/");
    }
    if (item.key === "ContactUs") {
      navigate("/contact");
    }
    if (item.key === "Customer") {
      navigate("/customerc");
    }
    if (item.key === "Employee") {
      navigate("/employeec");
    }
    if (item.key === "About") {
      navigate("/about");
    }
    if (item.key === "Feedback") {
      navigate("/feed");
    }
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();


  const handleNavigateToCart = () => {
    navigate('/cart');
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        style={{ backgroundColor: "#543310", overflow: "hidden", position: "fixed", height: "100vh", left: 0 }}
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <img src={imageSrc} alt="Logo" style={{ width: "80%" }} />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={userType === "admin" ? adminUserItems : adminUserItems}
          onClick={handleMenuClick}
          style={{ backgroundColor: "#DAC0A3" }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: collapsed ? 80 : 200,
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            height: "64px",
            backgroundColor: "#DAC0A3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            top:10
          }}
        >
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
          <div style={{ textAlign: "right" }}>
          <Button type="default" onClick={handleNavigateToCart} style={{marginTop:"15px",height:"40px"}}>
            <Badge
              count={1}
            >
              <ShoppingCartOutlined style={{ fontSize: "25px" }} name="cartButton" />
            </Badge>
          </Button>
        </div>
        </Header>

        <Content style={{ marginTop: 64, padding: 24  }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: borderRadiusLG,
            }}
          >
            {isBackTopVisible && (
              <FloatButton.Group shape="circle" style={{ right: 24 }}>
                <FloatButton.BackTop visibilityHeight={0} />
              </FloatButton.Group>
            )}
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default App;
