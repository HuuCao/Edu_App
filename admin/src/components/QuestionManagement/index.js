import React, { useState, useEffect } from 'react';
import './styles.scss';
import Layout from '../Layout';
import { Select, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import QuestionItem from './Item';
import question from '../../api/question';
import { useHistory } from 'react-router-dom';
import subject from '../../api/subject';
const { Option } = Select;

export default function Question(props) {
  const [filter, setFilter] = useState({ subjectID: 1, classID: 12 });
  const [questionList, setQuestionList] = useState([]);
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
  const handleChange = (value, key) => {
    setFilter((e) => {
      return { ...e, [key]: value };
    });
  };
  const history = useHistory();

  const getQuestion = async () => {
    try {
      const res = await question.getQuestion(filter);

      if (res.success) {
        setQuestionList(res.data.filter((e) => e.classID == filter.classID));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [filter]);
  useEffect(() => {
    document.title = 'Admin Edu | Quản lý câu hỏi';
    getSubject();
  }, []);
  return (
    <Layout title="Quản lý câu hỏi">
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
          onClick={() => history.push('/Edu/Question/Create')}
        >
          Tạo câu hỏi
        </Button>
      </div>
      <div className="question-container">
        {questionList.map((val) => (
          <QuestionItem question={val} reload={getQuestion} />
        ))}
      </div>
    </Layout>
  );
}
