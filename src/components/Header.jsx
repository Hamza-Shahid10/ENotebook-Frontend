import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    { label: <Link to="/" onClick={() => setOpen(false)}>Home</Link>, key: "/" },
    { label: <Link to="/about" onClick={() => setOpen(false)}>About</Link>, key: "/about" },
  ];
  // { label: <Link to="/notes" onClick={() => setOpen(false)}>Notes</Link>, key: "/notes" },

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#001529",
        padding: "0 20px",
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        ENotebook
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            background: "transparent",
            borderBottom: "none",
          }}
          overflowedIndicator={null}
        />
      )}

      {/* Mobile Burger Button */}
      {isMobile && (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white", fontSize: "22px" }} />}
            onClick={() => setOpen(true)}
          />
          <Drawer
            title="ENotebook"
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={items}
              style={{ borderRight: "none" }}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default AppHeader;
