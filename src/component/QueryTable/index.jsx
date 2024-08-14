import { Card, Table } from "antd"
import { useEffect, useRef, useState } from "react";

const QueryTable = ({ tableProps, className, formRef }) => {

	const [tableHeight, setTableHeight] = useState(0);

	const calculateTableHeight = () => {
		if (formRef.current) {
			const formHeight = formRef.current.offsetHeight;
			const windowHeight = window.innerHeight;
			setTableHeight(windowHeight - formHeight - 256); // 减去表单高度和一些间距
		}
	};

	useEffect(() => {
		calculateTableHeight();
		window.addEventListener('resize', calculateTableHeight);
		return () => window.removeEventListener('resize', calculateTableHeight);
	}, []);

	return (
		<Card bordered={false} hoverable={true} className="mt-4">
			<Table scroll={{ y:tableHeight}} {...tableProps} />
		</Card>
	)
}
export default QueryTable