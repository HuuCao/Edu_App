import React from 'react';

//components antd
import { Row, Col, Divider } from 'antd';

class Exam extends React.Component {
  render() {
    console.log(this.props.packages);
    return (
      <div style={{ fontFamily: 'Times New Roman', padding: 20 }}>
        <Row justify="space-between">
          <Col span={7}>
            <Row>
              <b>{this.props.data.department.toUpperCase()}</b>
            </Row>
            <Row>
              <b>{this.props.data.school.toUpperCase()}</b>
            </Row>
            {/* <Row>(Đề thi có 4 trang)</Row> */}
          </Col>
          <Col span={15}>
            <Row justify="center">
              <b>{this.props.data.examName.toUpperCase()}</b>
            </Row>
            {/* <Row justify="center">
              <b>Bài thi: KHOA HỌC TỰ NHIÊN</b>
            </Row> */}
            <Row justify="center">
              <b>Môn thi: {this.props.subjectName.toUpperCase()}</b>
            </Row>
            <Row justify="center">
              Thời gian làm bài: 50 phút không kể thời gian phát đề
            </Row>
            <Row justify="center">
              <b>Mã đề thi {this.props.data.code}</b>
            </Row>
          </Col>
        </Row>
        <Row>
          <b>
            Họ, tên thí sinh:.
            ......................................................................................
          </b>
        </Row>
        <Row>
          <b>
            Số báo danh:
            ............................................................................................
          </b>
        </Row>
        {this.props.packages.map((val, index) => (
          <>
            <Row>
              <b>Câu {index + 1}:</b> {val.questionName}
            </Row>
            <Row>
              {val.answer.map((ans, i) => (
                <Col span={6} style={{ textAlign: 'center' }}>
                  {String.fromCharCode(65 + i)}. {ans}
                </Col>
              ))}
            </Row>
          </>
        ))}
      </div>
    );
  }
}

export default Exam;
