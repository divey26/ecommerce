import React, { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  StockOutlined,
  SyncOutlined,
  SearchOutlined,
  EnvironmentOutlined
  
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Input, Badge } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import imageSrc from "./Images/logo.png";

const { Search } = Input;
const { Header, Content, Footer } = Layout;

const adminUserItems = [
  { key: "dashboard", icon: <HomeOutlined />, label: "Home" },
  { key: "Category", icon: <HomeOutlined />, label: "Category" },
  { key: "Complaint", icon: <HomeOutlined />, label: "Complaint" },
  { key: "FeedBack", icon: <HomeOutlined />, label: "FeedBack" },
  { key: "My Profile", icon: <HomeOutlined />, label: "My Profile" },
  {
    key: "AboutUs",
    icon: <CalendarOutlined />,
    label: "About Us",
    children: [
      { key: "Branches", icon: <AppstoreAddOutlined />, label: "Our Branches" },
      { key: "About", icon: <CheckCircleOutlined />, label: "Who we are" },
    ],
  },
  {
    key: "ContactUs",
    icon: <ApartmentOutlined />,
    label: "Contact Us",
    children: [
      { key: "Customer", icon: <StockOutlined />, label: "As a customer" },
      { key: "Employee", icon: <SyncOutlined />, label: "As an Employee" },
    ],
  },
];

const App = ({ children, userType }) => {
  const navigate = useNavigate();
  const [isBackTopVisible, setIsBackTopVisible] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleHeaderClick = (key) => {
    if (key === "1") {
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/sign");
    } else if (key === "2") {
      localStorage.setItem("authToken", null);
      localStorage.setItem("loggedInUserType", null);
      navigate("/login");
    }
  };

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
    switch (item.key) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "Category":
        navigate("/");
        break;
      case "ContactUs":
        navigate("/contact");
        break;
      case "Customer":
        navigate("/customerc");
        break;
      case "Employee":
        navigate("/employeec");
        break;
      case "About":
        navigate("/about");
        break;
      case "Feedback":
        navigate("/feed");
        break;
      default:
        break;
    }
  };

  const handleSearch = (value) => {
    setSearchLoading(true);
    setTimeout(() => {
      console.log("Search:", value);
      setSearchLoading(false);
    }, 1000); // Simulate search loading for 1 second
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "70px",
            backgroundColor: "#2E5077",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {/* Logo on the left */}
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <img src={imageSrc} alt="Logo" style={{ marginLeft:"40px",width: "50px", height: "50px" }} />
          </div>

          <div><h4><EnvironmentOutlined/>delivery to</h4></div>

          {/* Search Bar in the middle */}
          <div
            style={{
              flex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search
              style={{
                width: "100%",
                maxWidth: "1200px",
                fontSize: "18px",
                height: "50px",
                marginTop: "10px",
              }}
              placeholder="Search everything at Halo"
              enterButton={
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#79D7BE", // Change this to your preferred color
                    borderColor: "#79D7BE", // Match the border color
                    color: "#fff", // Text color
                    height: "40px",
                    fontSize: "16px",
                    marginRight:"250px"
                  }}
                >
                  <SearchOutlined />
                </Button>
              }
              size="large"
              loading={searchLoading}
              onSearch={handleSearch}
            />
          </div>

          {/* Cart Icon on the right */}
          <div style={{ textAlign: "right" }}>
            <Button
              type="default"
              onClick={handleNavigateToCart}
              style={{ marginTop: "15px", height: "40px" ,marginRight:"50px" }}
            >
              <Badge count={1}>
                <ShoppingCartOutlined style={{ fontSize: "25px" }} name="cartButton" />
              </Badge>
            </Button>
          </div>
        </Header>

        <Content style={{ marginTop: 64, padding: 24 }}>
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
