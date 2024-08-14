import QueryTable from '@/component/QueryTable';
import { Card, Col, Form, Input, Row, Select } from 'antd';
import { useRef } from 'react';
const DataView = () => {

  const formRef = useRef();
  const columns = [
    {
      title: '步骤ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '步骤类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '步骤名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属任务',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业务标签',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '任务处理方式',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '目标系统',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据地址',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '执行频率',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最近一次执行时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'op',
    },
  ]
  return (
    <>
      <Card ref={formRef} bordered={false} hoverable={true}>
        <Form labelCol={{ flex: '130px' }}>
          <Row>
            <Col span={6}>
              <Form.Item label='最近一次执行日期' name="date">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤ID' name='stepId'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤类型' name='stepType'>
                <Select />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤名称' name='stepName'>
                <Select />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <QueryTable  formRef={formRef} tableProps={{columns}}/>
    </>
  )
};
export default DataView;