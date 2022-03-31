import React, { useState, useEffect } from 'react';
import './styles.scss';
import Layout from '../../Layout';
import { Button, Input, Upload, message, notification } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Ckeditor4 from '../../Editor';
import lesson from '../../../api/lesson';
import { UploadOutlined } from '@ant-design/icons';
import upload from '../../../api/upload';
export default function EditLesson(props) {
  const history = useHistory();
  const location = useLocation();
  const [fileData, setFileData] = useState('');
  const [lessonData, setLessonData] = useState({
    lessonName: '',
    linkVideo: '',
    linkPdf: '',
  });
  console.log(location.state);
  const settings = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      console.log(info);
      if (info.file.type === 'application/pdf') {
        if (info.file.status === 'error') {
          info.file.status = 'done';
        }
        if (info.file.status === 'done') {
          setFileData(info.file.originFileObj);
          message.success(`${info.file.name} file uploaded successfully`);
        }
      } else {
        message.error('File không đúng định dạng, vui lòng upload PDF!');
        info.file.status = 'error';
      }
    },
  };

  const setValue = (value, key) => {
    setLessonData((e) => {
      return { ...e, [key]: value };
    });
  };

  const uploadFile = async () => {
    try {
      const res = await upload.multi(fileData);
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: 'Tạo bài giảng thất bại' });
      return '';
    }
  };

  useEffect(() => {
    document.title = `Admin Edu | ${
      props.role === 'edit' ? 'Chỉnh sửa' : 'Tạo'
    } bài giảng`;
  }, []);

  const createLesson = async () => {
    try {
      if (props.role === 'create') {
        const img = await uploadFile();
        if (img) {
          const res = await lesson.addLesson({
            ...lessonData,
            linkPdf: img,
            chapterID: location.state.chapterID,
            subjectID: location.state.subjectID,
          });
          if (res.success) {
            notification.success({ message: 'Tạo bài giảng thành công' });
            history.goBack();
          }
        }
      } else {
        const deleteKey = ['lessonID', 'chapterID', '_id', 'subjectID'];
        deleteKey.forEach((val) => {
          delete lessonData[val];
        });
        if (fileData) {
          const img = await uploadFile();
          if (img) {
            const res = await lesson.updateLesson(location.state.lessonID, {
              ...lessonData,
              linkPdf: img,
            });
            if (res.success) {
              notification.success({
                message: 'Cập nhật bài giảng thành công',
              });
              history.goBack();
            }
          }
        } else {
          const res = await lesson.updateLesson(
            location.state.lessonID,
            lessonData
          );
          if (res.success) {
            notification.success({ message: 'Cập nhật bài giảng thành công' });
            history.goBack();
          }
        }
      }
    } catch (e) {
      console.log(e);
      notification.error({
        message: `${
          props.role === 'edit' ? 'Cập nhật' : 'Tạo bài giảng'
        } thất bại`,
      });
    }
  };
  const getLesson = async () => {
    if (props.role === 'edit') {
      try {
        const res = await lesson.getLessonByID(location.state);
        if (res.success) setLessonData(res.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    getLesson();
  }, []);
  return (
    <Layout title="Quản lý bài giảng">
      <>
        <div className="lesson-title">
          <Input
            placeholder="Tên bài học"
            value={lessonData.lessonName}
            onChange={(e) => setValue(e.target.value, 'lessonName')}
          />
        </div>
        <div className="lesson-link">
          <span style={{ fontWeigspant: 600, fontSize: 19, color: '#1D2563' }}>
            Link bài giảng: &nbsp;
          </span>
          <Input
            placeholder="Link bài giảng"
            value={lessonData.linkVideo}
            style={{ width: 500 }}
            onChange={(e) => setValue(e.target.value, 'linkVideo')}
          />
        </div>
        <div
          style={{
            fontSize: 600,
            fontSize: 19,
            color: '#1D2563',
            margin: '20px 0px',
          }}
        >
          Nội dung bài giảng:
          <Upload {...settings}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        {/* <div className="lesson-edit">
          <Ckeditor4 setdata={()=>setValue}/>
        </div> */}
        <div className="confirm-btn">
          <Button
            className="e-btn"
            style={{ background: '#EF5DA8' }}
            onClick={createLesson}
          >
            Lưu
          </Button>
          <Button
            className="e-btn"
            style={{ background: '#5D5FEF' }}
            onClick={() => history.goBack()}
          >
            Hủy
          </Button>
          {props.role === 'edit' ? (
            <Button className="e-btn" style={{ background: '#E14343' }}>
              Xóa
            </Button>
          ) : (
            ''
          )}
        </div>
      </>
    </Layout>
  );
}
