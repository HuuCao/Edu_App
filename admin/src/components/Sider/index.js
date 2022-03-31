import {
  ImportOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Typography,
  Dropdown,
  Modal,
  Upload,
  Button,
  Avatar,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './styles.scss';
import {
  Usermanegement,
  Student,
  Teacher,
  Test,
  LessonI,
  QuestionI,
  Logout,
} from './icon';
import StudentList from '../StudentManagement';
import TeacherList from '../TeacherManagement';
import Topic from '../TopicManagement';
import Question from '../QuestionManagement';
import Lesson from '../LessonManagement';
import EditLesson from '../LessonManagement/EditLesson';
import QuestionCreate from '../QuestionManagement/CreateQuestion';
const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

function LayoutSider(props) {
  const history = useHistory();
  const location = useLocation();
  // const currentUrl = history.location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const [keySider, setKeySider] = useState();

  const listSidebar = [
    {
      key: '1',
      url: '/Edu/Student',
    },
    {
      key: '2',
      url: '/Edu/Teacher',
    },
    {
      key: '3',
      url: '/Edu/Topic',
    },
    {
      key: '4',
      url: '/Edu/Lesson',
    },
    {
      key: '5',
      url: '/Edu/Question',
    },
  ];

  useEffect(() => {
    const currentUrl = history.location.pathname;
    var a = listSidebar.reverse().find((element) => {
      const paramUrl = element.url;
      return currentUrl.includes(paramUrl);
    });
    setKeySider(a);
  }, [history.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    history.replace('/');
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false) || setIsModalVisible2(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false) || setIsModalVisible2(false);
  };

  const menuUser = (
    <Menu>
      <Menu.Item style={{ width: 200 }} onClick={showModal}>
        <a>Thông tin cá nhân</a>
      </Menu.Item>
      <Menu.Item onClick={showModal2}>
        <a>Chỉnh sửa thông tin</a>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <a>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout className="layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          {/* <div className="logo">
						<div
							onClick={() => {
								history.replace("/");
							}}
              className="edu"
              
						>
              EDU
            </div>
					</div> */}

          <Menu
            className="menu"
            mode="inline"
            selectedKeys={keySider ? [keySider.key] : ['1']}
          >
            <div className="menu-btn" onClick={toggle}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                }
              )}
            </div>
            <Menu.Item
              disabled
              style={{
                fontSize: '30px',
                lineHeight: '35px',
                letterSpacing: '0.38em',
                color: ' #FFFFFF',
                textAlign: 'center',
                paddingTop: '40px',
                paddingBottom: '40px',
                cursor: 'pointer',
              }}
            >
              EDU
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={Usermanegement}
              title="Quản lý người dùng"
            >
              <Menu.Item key="1" icon={Student}>
                <NavLink to="/Edu">Học sinh</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={Teacher}>
                <NavLink to="/Edu/Teacher">Giáo viên</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={Test} className="ant-menu-item">
              <NavLink to="/Edu/Topic">Bộ đề trắc nghiệm</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={LessonI}>
              <NavLink to="/Edu/Lesson">Quản lý bài giảng</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={QuestionI}>
              <NavLink to="/Edu/Question">Quản lý câu hỏi</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background"></Header>
          <Content className="site-content-background">
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            ></div>
            <Switch>
              <Route exact path="/Edu">
                <StudentList />
              </Route>
              <Route path="/Edu/Teacher">
                <TeacherList />
              </Route>
              <Route path="/Edu/Topic">
                <Topic />
              </Route>
              <Route exact path="/Edu/Lesson">
                <Lesson />
              </Route>
              <Route path="/Edu/Lesson/Edit-Lesson">
                <EditLesson role="edit" />
              </Route>
              <Route path="/Edu/Lesson/Create-Lesson">
                <EditLesson role="create" />
              </Route>
              <Route exact path="/Edu/Question">
                <Question />
              </Route>
              <Route path="/Edu/Question/Create">
                <QuestionCreate />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutSider;
