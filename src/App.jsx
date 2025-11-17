import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoteState from "./context/notes/NoteState";

const { Content } = Layout;

const App = () => {
  return (
    <NoteState>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <AppHeader />
          <Content style={{ padding: "24px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </NoteState>
  );
};

export default App;
