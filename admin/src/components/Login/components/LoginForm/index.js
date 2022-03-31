import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { useState } from 'react';
import userApi from '../../../../api/user';
import { decodeToken } from 'react-jwt';
export default function LoginForm(props) {
  const [savepass, setSavePass] = useState(false);
  const history = useHistory();
  //
  const onFinish = async (values) => {
    try {
      const res = await userApi.login(values);
      if (res.accessToken) {
        if (decodeToken(res.accessToken)['role'] === 'admin') {
          message.success('Đăng nhập thành công');
          if (savepass) {
            localStorage.accessToken = res.accessToken;
          } else sessionStorage.accessToken = res.accessToken;
          setTimeout(() => {
            history.push('/Edu');
          }, 500);
        } else {
          message.error('Forbiden');
        }
      } else {
        message.error('Sai tên tài khoản hoặc mật khẩu');
      }
    } catch (e) {
      console.log(e);
      message.success('Đăng nhập không thành công');
    }
    if (savepass) {
      localStorage.login = JSON.stringify({
        user: 'admin',
      });
    } else {
      sessionStorage.login = JSON.stringify({
        user: 'admin',
      });
    }
  };
  //

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleClickForgot = () => {
    history.push('/forgot-password');
  };
  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 500 }}
      >
        <Form.Item name="mail">
          <Input placeholder="Tên tài khoản" size="large" className="input" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            placeholder="Mật khẩu"
            size="large"
            className="input"
          />
        </Form.Item>
        <div>
          <div className="loginForm-sub-content">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox
                className="loginForm-remember"
                checked={savepass}
                onChange={(e) => setSavePass(e.target.checked)}
              ></Checkbox>
              <h style={{ color: 'white', fontSize: '16px' }}>Nhớ mật khẩu</h>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button
            className="loginForm-confirmBtn"
            type="primary"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
