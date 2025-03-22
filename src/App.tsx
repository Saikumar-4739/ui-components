import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import {NavigationContent} from './components/header-1/header-page'; // Adjust the import path as needed
import './App.css'; 

const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="app-layout">
        <NavigationContent />
        <Footer className="app-footer">
          © {new Date().getFullYear()} Bill Management System. All rights reserved.
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;