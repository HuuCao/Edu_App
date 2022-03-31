import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import './styles.scss';
import Layout from '../Layout';
import exam from '../../api/exam';
import TopicItem from './TopicItem';
import subject from '../../api/subject';

export default function Topic(props) {
  const { Option } = Select;
  const [exam_list, setExamList] = useState([]);
  const [filter, setFilter] = useState({ subjectID: 1, classID: 12 });
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
  function handleChange(value, key) {
    setFilter((e) => {
      return { ...e, [key]: value };
    });
  }
  const getExam = async (params) => {
    try {
      const res = await exam.getExam(params);

      if (res.success) {
        setExamList(res.data);
      }
    } catch (e) {
      console.log();
    }
  };

  useEffect(() => {
    getExam(filter);
  }, [filter]);
  useEffect(() => {
    document.title = 'Admin Edu | Bộ đề trắc nghiệm';
    getSubject();
  }, []);
  return (
    <Layout title="Quản lý bộ đề trắc nghiệm">
      <div className="topic-filter">
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
      <div className="topic-items">
        {exam_list.map((val) => (
          <TopicItem
            data={val}
            subjectName={
              subjectList.find((e) => e.subjectID === filter.subjectID)[
                'subjectName'
              ]
            }
          />
        ))}
      </div>
    </Layout>
  );
}
