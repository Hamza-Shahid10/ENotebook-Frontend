import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const items = [
    { label: <Link to="/" onClick={() => setOpen(false)}>Home</Link>, key: "/" },
    { label: <Link to="/about" onClick={() => setOpen(false)}>About</Link>, key: "/about" },
    // Notes option if needed later
    // { label: <Link to="/notes" onClick={() => setOpen(false)}>Notes</Link>, key: "/notes" },
    ...(!isLoggedIn
      ? [
          { label: <Link to="/login" onClick={() => setOpen(false)}>Login</Link>, key: "/login" },
          { label: <Link to="/signup" onClick={() => setOpen(false)}>Signup</Link>, key: "/signup" }
        ]
      : [
          {
            label: <span onClick={handleLogout}>Logout</span>,
            key: "logout"
          }
        ]
    )
  ];

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
        padding: "0 20px",
        background: "#001529"
      }}
    >
      <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        ENotebook
      </div>

      {/* Desktop */}
      {!isMobile && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ background: "transparent", borderBottom: "none" }}
        />
      )}

      {/* Mobile */}
      {isMobile && (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white", fontSize: 22 }} />}
            onClick={() => setOpen(true)}
          />
          <Drawer
            title="ENotebook"
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={items}
              style={{ borderRight: "none" }}
              onClick={() => setOpen(false)}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default AppHeader;
