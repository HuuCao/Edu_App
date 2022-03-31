import './layout.scss';
import { useHistory } from 'react-router-dom';
import { Dropdown, Avatar, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import {
  ImportOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import ava from '../../image/ava.png';

const { SubMenu } = Menu;
export default function Layout(props) {
  const history = useHistory();
  const location = useLocation();
  function callback(key) {
    console.log(key);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    history.replace('/');
  };
  const menuUser = (
    <Menu>
      <Menu.Item style={{ width: 200 }} onClick={showModal}>
        <a>
          <UserOutlined /> Thông tin cá nhân
        </a>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <a>
          <LogoutOutlined /> Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="container">
      <div className="titleuser-container">
        <div className="title-container">
          <div className="main-title">{props.title}</div>
          <div className="sub-title">{props.subtitle}</div>
        </div>
        <div className="menu-user">
          <Dropdown overlay={menuUser} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} className="avatar" />
          </Dropdown>
        </div>
      </div>
      <div className="content-container">{props.children}</div>
    </div>
  );
}
