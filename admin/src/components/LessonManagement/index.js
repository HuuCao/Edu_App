import React, { useState, useEffect } from 'react';
import './styles.scss';
import Layout from '../Layout';
import { Select, Button, Row, Collapse, Col, Modal, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import chapter from '../../api/chapter';
import subject from '../../api/subject';
const { Option } = Select;

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

export default function Lesson(props) {
  const history = useHistory();
  const [createLessonModal, setCreateLessonModal] = useState(false);
  const [createData, setCreateData] = useState({ subjectID: 1, classID: 12 });
  const [filter, setFilter] = useState({ subjectID: 1, classID: 12 });
  const [chapterList, setChapterList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const getSubject = async (params) => {
    try {
      const res = await subject.getSubject(params);

      if (res.success) {
        setSubjectList(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const editLesson = (lessonID) => {
    history.push({ pathname: '/Edu/Lesson/Edit-Lesson', state: { lessonID } });
  };
  const createLesson = () => {
    if (createData.chapterID)
      history.push({
        pathname: '/Edu/Lesson/Create-Lesson',
        state: createData,
      });
    else notification.error({ message: 'Vui lòng chọn chương' });
  };
  const handleChange = (value, key) => {
    setFilter((e) => {
      return { ...e, [key]: value };
    });
  };
  const changeCreateData = (value, key) => {
    setCreateData((e) => {
      return { ...e, [key]: value };
    });
  };
  const getChapter = async (params) => {
    try {
      const res = await chapter.getChapter(params);

      if (res.success) {
        setChapterList(res.data.filter((e) => e.classID == params.classID));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChapter(filter);
  }, [filter]);
  useEffect(() => {
    document.title = 'Admin Edu | Bài giảng';
    getSubject();
  }, []);
  return (
    <Layout title="Quản lý bài giảng">
      <div className="filter">
        <div>
          <Select
            defaultValue={1}
            style={{ width: 200, marginRight: '20px' }}
            onChange={(e) => handleChange(e, 'subjectID')}
          >
            {subjectList
              .filter((val) => val.classID == filter.classID)
              .map((e) => (
                <Option value={e.subjectID}>{e.subjectName}</Option>
              ))}
          </Select>
          <Select
            defaultValue="12"
            style={{ width: 200 }}
            onChange={(e) => handleChange(e, 'classID')}
          >
            {subjectList
              .filter((val) => val.subjectID == filter.subjectID)
              .map((e) => (
                <Option value={e.classID}>{e.classID}</Option>
              ))}
          </Select>
        </div>

        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => setCreateLessonModal(true)}
        >
          Tạo bài giảng
        </Button>
      </div>
      <div className="lesson-list">
        {chapterList.map((val) => (
          <Collapse onChange={callback} style={{ marginBottom: '15px' }}>
            <Panel header={val.chapterName} key="1">
              <Col>
                {val.lstLesson.map((e) => (
                  <Row
                    className="lesson-detail"
                    onClick={() => editLesson(e.lessonID)}
                  >
                    {e.lessonName}
                  </Row>
                ))}
              </Col>
            </Panel>
          </Collapse>
        ))}
      </div>
      <Modal
        centered
        visible={createLessonModal}
        onCancel={() => setCreateLessonModal(false)}
        onOk={createLesson}
        okText="Xác nhận"
        cancelText="Hủy"
        width="380px"
        okButtonProps={{ style: { background: 'rgba(239, 93, 168, 1)' } }}
        cancelButtonProps={{ style: { background: 'rgba(93, 95, 239, 1)' } }}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col span={7}>Lớp học: </Col>
          <Col span={17}>
            <Select
              defaultValue="12"
              style={{ width: 200, marginRight: '20px' }}
              onChange={(e) => changeCreateData(e, 'classID')}
            >
              <Option value="12">12</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={7}>Môn học:</Col>
          <Col span={17}>
            <Select
              defaultValue="1"
              style={{ width: 200, marginRight: '20px' }}
              onChange={(e) => changeCreateData(e, 'subjectID')}
            >
              {subjectList
                .filter((val) => val.classID == filter.classID)
                .map((e) => (
                  <Option value={e.subjectID}>{e.subjectName}</Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={7}>Chương:</Col>
          <Col span={17}>
            <Select
              defaultValue={''}
              style={{ width: 200, marginRight: '20px' }}
              onChange={(e) => changeCreateData(e, 'chapterID')}
            >
              {chapterList.map((val) => (
                <Option value={val.chapterID}>{val.chapterName}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Modal>
    </Layout>
  );
}
