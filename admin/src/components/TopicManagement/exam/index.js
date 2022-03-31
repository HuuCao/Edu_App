import React, { useRef, useState } from 'react';

import ReactToPrint from 'react-to-print';

//components
import Exam from './exam';

//components antd
import { Button, Modal, Row } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
export default ({ packages, disabled, subjectName, data }) => {
  const printBillRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);
  return (
    <>
      <Button type="primary" onClick={toggle} disabled={disabled}>
        <PrinterOutlined /> In đề
      </Button>

      <Modal
        width="50vw"
        // title="Bill"
        visible={visible}
        onCancel={toggle}
        footer={
          <Row justify="end">
            <Button onClick={toggle} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button type="primary">
                  <PrinterOutlined /> In đề
                </Button>
              )}
              content={() => printBillRef.current}
            />
          </Row>
        }
      >
        <Exam
          ref={printBillRef}
          packages={packages}
          subjectName={subjectName}
          data={data}
        />
      </Modal>
    </>
  );
};
