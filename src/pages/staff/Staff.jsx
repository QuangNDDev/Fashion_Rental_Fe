import React, { useState } from 'react';
import {
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  LaptopOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Avatar, Modal, Badge } from 'antd';

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Staff = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
  };

  const showNotificationModal = () => {
    setNotificationModalVisible(true);
    setUnreadNotificationCount(0); // Đánh dấu tất cả thông báo là đã đọc khi mở modal
  };

  const hideNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
        }}
      >
        {/* Display a placeholder logo */}
        <img
          src="https://www.frs.world/fileadmin/_processed_/3/4/csm_frs-world-logo_1774725601.jpg"
          alt="Brand Logo"
          width={120}
          height={40}
        />
        {/* Notification bell icon and avatar */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://via.placeholder.com/40x40.png?text=Avatar"
            alt="User Avatar"
            style={{ width: '38px', height: '38px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
            Name staff
          </span>
          <Badge count={unreadNotificationCount}>
            <BellOutlined
              style={{ fontSize: '20px', color: 'white', cursor: 'pointer', marginLeft: '25px' }}
              onClick={showNotificationModal}
            />
          </Badge>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginLeft: 16, color: 'white' }}
          >
            Logout
          </Button>
        </div>
      </Header>

      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      {/* Modal for Notifications */}
      <Modal
        title="Thông báo"
        visible={isNotificationModalVisible}
        onCancel={hideNotificationModal}
        footer={null}
        style={{ position: 'absolute', bottom: '50px', right: '20px' }}
      >
        {/* Nội dung thông báo ở đây */}
      </Modal>
    </Layout>
  );
};

export default Staff;
