import {Tooltip} from "antd";

export const renderTableColumns = (text)=>{
return (
  <Tooltip title={text} placement="bottomLeft">
    <div className="whitespace-nowrap overflow-hidden text-ellipsis min-w-24">{text}</div>
  </Tooltip>
)
}