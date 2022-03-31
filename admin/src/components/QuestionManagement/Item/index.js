import './styles.scss';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Radio, Modal, Row, Input, notification } from 'antd';
import { useState } from 'react';
import question from '../../../api/question';
import parse from 'html-react-parser';
import Ckeditor4 from '../../Editor';
export default function QuestionItem(props) {
  const [editVisible, setEditVisible] = useState(false);
  const [changeData, setChangeData] = useState({
    questionName: props.question.questionName,
    answer: props.question.answer,
    correct: props.question.correct,
  });

  const onChange = (key, value, index) => {
    if (key === 'answer') {
      let tmp = [...changeData.answer];
      tmp[index] = value;
      setChangeData((e) => {
        return { ...e, [key]: tmp };
      });
    } else {
      setChangeData((e) => {
        return { ...e, [key]: value };
      });
    }
  };

  const onUpdate = async () => {
    try {
      const res = await question.updateQuestion(
        props.question.questionID,
        changeData
      );
      if (res.success) {
        notification.success({ message: 'Cập nhật thành công' });
        setEditVisible(false);
        props.reload();
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: 'Cập nhật thất bại' });
    }
  };

  return (
    <>
      <div className="item-container">
        <div className="item-content">
          <div>{parse(props.question.questionName)}</div>
        </div>
        <div className="item-option">
          <EditFilled
            className="options"
            style={{ color: '#1E87E9' }}
            onClick={() => setEditVisible(true)}
          />

          <DeleteFilled className="options" style={{ color: '#E71C1C' }} />
        </div>
      </div>
      <Modal
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={onUpdate}
        centered
        closable={false}
        okText="Xác nhận"
        cancelText="Hủy"
        width="700px"
        okButtonProps={{ style: { background: 'rgba(239, 93, 168, 1)' } }}
        cancelButtonProps={{ style: { background: 'rgba(93, 95, 239, 1)' } }}
      >
        <Row className="question-item--question">
          <Ckeditor4
            setdata={(e) => onChange('questionName', e)}
            data={props.question.questionName}
          />
          {/* <Input
            defaultValue={props.question.questionName}
            bordered=""
            onChange={(e) => onChange('questionName', e.target.value)}
          /> */}
        </Row>
        <Radio.Group
          defaultValue={props.question.correct}
          style={{ width: '100%' }}
          onChange={(e) => onChange('correct', e.target.value)}
        >
          {props.question.answer.map((val, index) => (
            <Row className="question-item--answer">
              <Radio value={`${index + 1}`} style={{ width: '100%' }}>
                <Input
                  prefix={`${String.fromCharCode(65 + index)}.`}
                  bordered={false}
                  defaultValue={val}
                  onChange={(e) => onChange('answer', e.target.value, index)}
                />
              </Radio>
            </Row>
          ))}
        </Radio.Group>
      </Modal>
    </>
  );
}
