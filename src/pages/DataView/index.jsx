import QueryTable from '@/component/QueryTable';
import {Card, Col, Form, Input, Row, Select, Tag, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "lodash";
import {queryTableList, useDataViewStore} from "@/store/dataViewStore.js";
import {renderTableColumns} from "@/util/index.jsx";

const DataView = () => {

  const formRef = useRef();
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });
  const dataList = useDataViewStore(state => state.dataList);
  console.log(dataList)
  const columns = [
    {
      title: '步骤ID',
      dataIndex: 'stepNo',
      key: 'stepNo',
    },
    {
      title: '步骤类型',
      dataIndex: 'stepType',
      key: 'stepType',
      render: (text, record) => {
        let color;
        let dataText;
        const stepTypeMap = {
          1: '采集',
          2: '加工',
          3: '发送'
        }
        switch (String(text)) {
          case '1':
            color = 'purple';
            dataText = stepTypeMap[String(text)];
            break;
          case '2':
            color = 'blue';
            dataText = stepTypeMap[String(text)];
            break;
          case '3':
            color = 'cyan';
            dataText = stepTypeMap[String(text)];
            break;
          default:
            color = ''
        }
        return (<Tag color={color}>{dataText}</Tag>)
      }
    },
    {
      title: '步骤名称',
      dataIndex: 'stepName',
      key: 'stepName',
      // ellipsis: true,
      render: renderTableColumns
    },
    {
      title: '所属任务',
      dataIndex: 'taskName',
      key: 'taskName',
      // ellipsis: true,
      render: renderTableColumns
    },
    {
      title: '数据类型',
      dataIndex: 'dataTypeDesc',
      key: 'dataTypeDesc',
      // ellipsis: true,
      render: renderTableColumns
    },
    {
      title: '业务标签',
      dataIndex: 'businessLabel',
      key: 'businessLabel',
      // ellipsis: true,
      render: renderTableColumns
    },
    {
      title: '任务处理方式',
      dataIndex: 'handleType',
      key: 'handleType',
      width: 120,
      render: renderTableColumns
    },
    {
      title: '目标系统',
      dataIndex: 'targetSystem',
      key: 'targetSystem',
      render: renderTableColumns
    },
    {
      title: '数据地址',
      dataIndex: 'dataAddress',
      key: 'dataAddress',
      render: renderTableColumns
    },
    {
      title: '执行频率',
      dataIndex: 'exeFrequency',
      key: 'exeFrequency',
      render: renderTableColumns
    },
    {
      title: '最近一次执行时间',
      dataIndex: 'executeTime',
      key: 'executeTime',
      render: renderTableColumns
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'op',
      render:()=>{
        return (
          <Typography.Link className="whitespace-nowrap">
            查看
          </Typography.Link>
        )
      }
    },
  ];

  const changeParams = (params) => {
    const newParams = merge({}, filter, params);
    setFilter(newParams);
    queryTableList(newParams);
  };

  useEffect(() => {
    changeParams()
  }, [])

  // 自定义表头组件
  const HeaderWrapper = React.forwardRef((props, ref) => (
    <thead ref={ref} className="ant-table-thead whitespace-nowrap">
    {props.children}
    </thead>
  ));
  const headerRef = useRef(null);

  return (
    <>
      <Card ref={formRef} bordered={false} hoverable={true}>
        <Form labelCol={{flex: '130px'}}>
          <Row>
            <Col span={6}>
              <Form.Item label='最近一次执行日期' name="date">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤ID' name='stepId'>
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤类型' name='stepType'>
                <Select/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='步骤名称' name='stepName'>
                <Select/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <div style={{height: `calc(100vh - 128px - ${formRef?.current?.offsetHeight}px)`}}>
        <QueryTable
          headerRef={headerRef}
          tableProps={{
            columns,
            tableLayout: 'fixed',
            dataSource: dataList,
            // scroll: {x: columns.length * 150,},
            components: {
              header: {
                wrapper: (props) => <HeaderWrapper ref={headerRef} {...props} />
              }
            }
          }}
        />
      </div>
    </>
  )
};
export default DataView;