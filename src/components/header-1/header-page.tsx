import React from 'react';
import { Layout, Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './header-page.css';
import BillDateExtension from '../dummy-pages/BillDateExtension';
import VehicleChange from '../dummy-pages/VehicleChange';
import TransporterUpdate from '../dummy-pages/TransporterUpdate';

const { Header, Content } = Layout;

const MotionHeader = motion(Header);

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

const buttonVariants = {
  initial: { 
    x: 200,
    opacity: 0,
    scale: 0.8
  },
  animate: (i: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 150,
      damping: 20,
      mass: 0.8,
      delay: i * 0.15
    }
  }),
  active: { 
    scale: 1.1,
    x: -150,
    opacity: 1,
    zIndex: 10,
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 15,
      duration: 0.5
    }
  },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.2 } 
  }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.8 } 
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      delay: 1, 
      ease: 'easeOut', 
      type: 'spring', 
      stiffness: 100 
    } 
  }
};

interface NavButtonProps {
  to: string;
  label: string;
  index: number;
}

const NavButton = ({ to, label, index }: NavButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      variants={buttonVariants}
      initial="initial"
      animate={isActive ? "active" : "animate"}
      whileHover="hover"
      whileTap="tap"
      custom={index}
      style={{ position: 'relative' }}
    >
      <Link to={to}>
        <Button type="link" className={`nav-button ${isActive ? 'active' : ''}`}>
          {label}
        </Button>
      </Link>
    </motion.div>
  );
};

export const NavigationContent = () => {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Bill Generation" },
    { to: "/bill-date-extension", label: "Date Extension" },
    { to: "/vehicle-change", label: "Vehicle Change" },
    { to: "/transporter-update", label: "Transporter" }
  ];
  const activeIndex = navItems.findIndex(item => item.to === location.pathname);
  const sortedNavItems = activeIndex !== -1 
    ? [navItems[activeIndex], ...navItems.filter((_, i) => i !== activeIndex)]
    : navItems;

  return (
    <>
      <MotionHeader 
        className="header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="header-content">
          <Space className="nav-space">
            {sortedNavItems.map((item, index) => (
              <NavButton key={item.to} to={item.to} label={item.label} index={index} />
            ))}
          </Space>
          <Space className="user-space">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={4}
            >
              <Button className="action-button" icon={<UserOutlined />} />
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={5}
            >
              <Button className="action-button" icon={<LogoutOutlined />} />
            </motion.div>
          </Space>
        </div>
      </MotionHeader>

      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="content-wrapper"
            >
              <Content className="main-content">
                <motion.h1
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="welcome-text"
                >
                  Bill Generation Dashboard
                </motion.h1>
              </Content>
            </motion.div>
          }
        />
        <Route path="/bill-date-extension" element={<BillDateExtension />} />
        <Route path="/vehicle-change" element={<VehicleChange />} />
        <Route path="/transporter-update" element={<TransporterUpdate />} />
      </Routes>
    </>
  );
};
