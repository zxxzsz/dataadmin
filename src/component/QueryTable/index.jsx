import {Card, Table} from "antd"
import {useEffect, useRef, useState} from "react";

const QueryTable = ({tableProps, className, formRef, headerRef}) => {

  const [tableHeight, setTableHeight] = useState(0);

  const calculateTableHeight = () => {
    const windowHeight = window.innerHeight;
    const headerBottom = headerRef?.current && headerRef.current.getBoundingClientRect().bottom ? headerRef.current.getBoundingClientRect().bottom : 0;
    const calculatedHeight = windowHeight - headerBottom - 88;
    setTableHeight(calculatedHeight);
  };

  useEffect(() => {
    calculateTableHeight();
    window.addEventListener('resize', calculateTableHeight);
    return () => window.removeEventListener('resize', calculateTableHeight);
  }, []);

  return (
    <Card bordered={false} hoverable={true} className="mt-4 h-full">
      <Table scroll={{x: true, y: tableHeight}} {...tableProps} />
    </Card>
  )
}
export default QueryTable