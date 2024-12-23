import React, { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Button, Badge, Select } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import imageSrc from "./Images/logo.png";
import { TextField } from "@mui/material"; // MUI TextField for the search bar
import Flag from "react-world-flags"; // Import Flag component

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const App = ({ children, userType }) => {
  const navigate = useNavigate();
  const [isBackTopVisible, setIsBackTopVisible] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // Default language is English

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

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchLoading(true);
    setTimeout(() => {
      console.log("Search:", value);
      setSearchLoading(false);
    }, 1000); // Simulate search loading for 1 second
  };

  const handleSearchButtonClick = () => {
    console.log("Search Button Clicked");
    // Handle search button action, e.g., trigger the same search functionality
  };

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    console.log("Selected Language:", value); // You can also implement language change functionality here
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
            height: "80px",
            backgroundColor: "#004f9a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {/* Logo and HALO text on the left */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={imageSrc}
              alt="Logo"
              style={{ marginLeft: "10px", width: "50px", height: "50px" }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "15px",
                color: "#F3C623",
              }}
            >
              HALO
            </span>
          </div>

          {/* Delivery text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "15px",
              marginLeft: "150px", // Reduced margin to move it closer to the search bar
            }}
          >
            <EnvironmentOutlined
              style={{ color: "#F3C623", fontSize: "30px", marginRight: "20px" }}
            />
            Delivery to
            <span
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                marginLeft: "5px",
              }}
            >
            SRILANKA
            </span>
          </div>

          {/* Search Bar and Language Selector in the middle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
              
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              onChange={handleSearch}
              style={{
                width: "60%",
                backgroundColor: "white",
                borderRadius: "2px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              InputProps={{
                endAdornment: searchLoading && (
                  <SearchOutlined style={{ color: "#1890ff" }} />
                ),
              }}
            />
            {/* Search Button */}
            <Button
              type="primary"
              icon={<SearchOutlined style={{ fontSize: "24px" }} />}
              onClick={handleSearchButtonClick}
              style={{
                backgroundColor: "#79D7BE",
                borderColor: "#79D7BE",
                height: "56px",
                width: "70px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            ></Button>

            {/* Language Selector */}
            <Select
              defaultValue={language}
              style={{
                width: 90,
                marginLeft: "60px",
                height: "40px",
                fontSize:"16px"
              }}
              onChange={handleLanguageChange}
            >
              <Option value="en">
                <Flag code="US" style={{ width: "20px", marginRight: "10px", }} />
                EN
              </Option>
              <Option value="ta">
                <Flag code="IN" style={{ width: "20px", marginRight: "10px" }} />
                TAM
              </Option>
              <Option value="zh">
                <Flag code="CN" style={{ width: "20px", marginRight: "10px" }} />
                ZH
              </Option>
              <Option value="fr">
                <Flag code="FR" style={{ width: "20px", marginRight: "10px" }} />
                FR
              </Option>
              <Option value="si">
                <Flag code="LK" style={{ width: "20px", marginRight: "10px" }} />
                SI
              </Option>
              <Option value="de">
                <Flag code="DE" style={{ width: "20px", marginRight: "10px" }} />
                DE
              </Option>
              <Option value="es">
                <Flag code="ES" style={{ width: "20px", marginRight: "10px" }} />
                ES
              </Option>
              <Option value="it">
                <Flag code="IT" style={{ width: "20px", marginRight: "10px" }} />
                IT
              </Option>
            </Select>
          </div>

          {/* Cart Icon on the right */}
          <div style={{ textAlign: "right" }}>
            <Button
              type="default"
              onClick={handleNavigateToCart}
              style={{ marginTop: "10px", height: "60px", marginRight: "5px" }}
            >
              <Badge count={1}>
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
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
