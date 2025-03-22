import React from 'react';
import { Layout, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Content } = Layout;
const { Title } = Typography;

// Animation for the page content
const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const BillDateExtension: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <Content
          style={{
            padding: '20px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Title level={2} style={{ color: '#000', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            Bill Date Extension Page
          </Title>
        </Content>
      </motion.div>
    </Layout>
  );
};

export default BillDateExtension;