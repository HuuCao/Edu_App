import React, { useState, useEffect } from 'react';
import './styles.scss';
import Layout from '../Layout';
import { Table, Input, Row, Col } from 'antd';
import userApi from '../../api/user';
import moment from 'moment';
export default function TeacherList(props) {
  const [data, setData] = useState([]);
  const [displayData, setDisPlayData] = useState([]);
  const [tableLoading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState('');
  const fetchData = async () => {
    try {
      const response = await userApi.getUser({ role: 'teacher' });
      console.log('Fetch products successfully: ', response);
      setData(response.data);
      setDisPlayData(response.data);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    document.title = 'Admin Edu | Giáo viên';
  }, []);
  useEffect(() => {
    let tmp = data.filter((e) => e.fullname.includes(searchUser));
    setDisPlayData(tmp);
    console.log(searchUser);
  }, [searchUser]);
  const columns = [
    {
      title: 'STT',
      align: 'center',
      maxWidth: 60,
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: 'Tên',
      align: 'left',
      dataIndex: 'fullname',
    },
    {
      title: 'Email',
      align: 'left',
      dataIndex: 'mail',
    },
    {
      title: 'Gói mua',
      align: 'left',
      dataIndex: 'Goimua',
    },
    {
      title: 'Số điện thoại',
      align: 'center',
      dataIndex: 'phone',
    },
    {
      title: 'Thời gian tạo tài khoản',
      align: 'center',
      dataIndex: 'createdAt',
      render(time) {
        return time;
      },
    },
  ];

  return (
    <>
      <Layout title="Quản lý người dùng" subtitle="Giáo viên">
        <Row style={{ marginBottom: 20 }}>
          <Col span={8}>
            <Input.Search
              enterButton
              width="400"
              size="large"
              className="search"
              allowClear
              onSearch={(e) => setSearchUser(e)}
            />
          </Col>
        </Row>
        <Table
          dataSource={displayData}
          columns={columns}
          pagination={{ pageSize: 14 }}
        />
      </Layout>
    </>
  );
}
