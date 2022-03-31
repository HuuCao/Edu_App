import Layout from '../../Layout';
import {
  Select,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Radio,
  notification,
} from 'antd';
import { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import question from '../../../api/question';
import subject from '../../../api/subject';
import Ckeditor4 from '../../Editor';
const Option = { Select };
export default function QuestionCreate() {
  const [filter, setFilter] = useState({ subjectID: '1', classID: 12 });
  const [correct, setCorrect] = useState('1');
  const history = useHistory();
  const [subjectList, setSubjectList] = useState([]);
  const [form] = Form.useForm();
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
  const onFinish = async (values) => {
    const data = values.ListQuestion.map((val) => {
      return {
        questionName: val.questionName,
        answer: [val.ans1, val.ans2, val.ans3, val.ans4],
        correct,
        subjectID: filter.subjectID,
        classID: filter.classID,
      };
    });

    console.log(values);

    try {
      const res = await question.addQuestion(data);

      if (res.success) {
        notification.success({ message: 'Tạo thành công' });
        history.push('/Edu/Question');
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: 'Tạo không thành công' });
    }
  };

  const onChange = (value, key) => {
    const fields = form.getFieldsValue();
    // console.log(fields.ListQuestion);
    const { ListQuestion } = fields;
    if (ListQuestion[key]) {
      Object.assign(ListQuestion[key], { questionName: value });
    } else {
      ListQuestion[key] = { questionName: value };
    }
    form.setFieldsValue({ ListQuestion });
  };
  useEffect(() => {
    document.title = 'Admin Edu | Tạo câu hỏi';
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
      </div>

      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: 20 }}
        form={form}
      >
        <Form.List
          name="ListQuestion"
          rules={[
            {
              validator: async (_, ListQuestion) => {
                if (!ListQuestion || ListQuestion.length < 1) {
                  return Promise.reject(new Error('Cần ít nhất 1 câu hỏi'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <div>
                  {console.log({ key, name, fieldKey, ...restField })}
                  <Row justify="space-between" style={{ marginBottom: 10 }}>
                    <Col span={2}>Câu {index + 1}</Col>
                    <Col
                      span={18}
                      style={{
                        border: 'solid 1px #e5e5e5',
                        padding: '15px 30px',
                        borderRadius: 8,
                      }}
                    >
                      <Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'questionName']}
                          fieldKey={[fieldKey, 'questionName']}
                          style={{ width: '100%' }}
                        >
                          <Ckeditor4 setdata={(e) => onChange(e, key)} />
                          <Input
                            placeholder="Câu hỏi"
                            style={{ background: '#F6F8FF' }}
                            hidden
                          />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'ans1']}
                          fieldKey={[fieldKey, 'ans1']}
                          rules={[
                            {
                              required: true,
                              message: 'Đáp án không được để trống',
                            },
                          ]}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Đáp án" />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'ans2']}
                          fieldKey={[fieldKey, 'ans2']}
                          rules={[
                            {
                              required: true,
                              message: 'Đáp án không được để trống',
                            },
                          ]}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Đáp án" />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'ans3']}
                          fieldKey={[fieldKey, 'ans3']}
                          rules={[
                            {
                              required: true,
                              message: 'Đáp án không được để trống',
                            },
                          ]}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Đáp án" />
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'ans4']}
                          fieldKey={[fieldKey, 'ans4']}
                          rules={[
                            {
                              required: true,
                              message: 'Đáp án không được để trống',
                            },
                          ]}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Đáp án" />
                        </Form.Item>
                      </Row>
                      <Row>
                        Đáp án đúng:{' '}
                        <Radio.Group
                          defaultValue={correct}
                          onChange={(e) => setCorrect(e.target.value)}
                        >
                          <Radio value="1">A</Radio>
                          <Radio value="2">B</Radio>
                          <Radio value="3">C</Radio>
                          <Radio value="4">D</Radio>
                        </Radio.Group>
                      </Row>
                    </Col>
                    <Col span={2}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                </div>
              ))}
              <Form.Item>
                <Row>
                  <Col span={3}>
                    <Button
                      type="primary"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{ background: '#24B50D' }}
                    >
                      Thêm câu hỏi
                    </Button>
                  </Col>
                </Row>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: 'rgba(239, 93, 168, 1)',
                border: 'none',
                outline: 'none',
                marginRight: 20,
              }}
            >
              Xác nhận
            </Button>
            <Button
              type="primary"
              style={{
                background: 'rgba(93, 95, 239, 1)',
                border: 'none',
                outline: 'none',
              }}
              onClick={() => history.goBack()}
            >
              Hủy
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Layout>
  );
}
