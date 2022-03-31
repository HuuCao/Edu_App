import { PrinterOutlined } from '@ant-design/icons';
import PrintExam from '../exam';
export default function TopicItem(props) {
  const { examName, code, department, amount, createAt, school, lstQuestion } =
    props.data;
  return (
    <div className="topic-item">
      <h4>
        MĐ:{code} | {examName} {school}
      </h4>
      <p className="topic-department">{department}</p>
      <p className="topic-amount">Số câu: {amount}</p>
      <p className="topic-create_at">Ngày tạo: {createAt}</p>
      <p className="topic-print">
        <PrintExam
          data={props.data}
          packages={lstQuestion}
          subjectName={props.subjectName}
        />
      </p>
    </div>
  );
}
