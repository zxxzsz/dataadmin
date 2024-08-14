// import React, { useState, useEffect, useRef } from 'react';
// import { Form, Input, Button, Table } from 'antd';
// // import './index.less';
// import { generateData } from '@/util';

// const dataSource = generateData();

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
// ];

// const MyTable = () => {
//   const [tableHeight, setTableHeight] = useState(0);
//   const formRef = useRef(null);

//   const calculateTableHeight = () => {
//     if (formRef.current) {
//       const formHeight = formRef.current.offsetHeight;
//       const windowHeight = window.innerHeight;
//       setTableHeight(windowHeight - formHeight - 256); // 减去表单高度和一些间距
//     }
//   };

//   useEffect(() => {
//     calculateTableHeight();
//     window.addEventListener('resize', calculateTableHeight);
//     return () => window.removeEventListener('resize', calculateTableHeight);
//   }, []);

//   return (
//     <div className="page-container">

//       <div ref={formRef}>
//       <Form
//         layout="inline"
//         onFinish={(values) => console.log('Received values:', values)}
//         className="search-form"
//       >
//         <Form.Item
//           name="name"
//           label="Name"
//         >
//           <Input placeholder="Enter name" />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Search</Button>
//         </Form.Item>
//       </Form>
//       </div>

//       {/* <div className="table-container" style={{ height: tableHeight }}> */}
//         <Table
//           dataSource={dataSource}
//           columns={columns}
//           scroll={{ y: tableHeight }}  // 动态设置表格高度
//         />
//       {/* </div> */}
//     </div>
//   );
// };

// export default MyTable;

// import React, { useRef, useEffect } from 'react';
// import * as monaco from 'monaco-editor';

// const MonacoDiffEditorWithArrows = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const originalModel = monaco.editor.createModel(
//       "console.log('Hello world!');\nconsole.log('Second line.');",
//       'javascript'
//     );
//     const modifiedModel = monaco.editor.createModel(
//       "console.log('Hello Monaco!');",
//       'javascript'
//     );

//     const diffEditor = monaco.editor.createDiffEditor(editorRef.current, {
//       readOnly: false,
//       renderSideBySide: true,
//       enableSplitViewResizing: true,
//       originalEditable: true,
//       // minimap: { enabled: false },
//       hover: {
//         enabled: false
//       },
//       contextmenu:false,
//       renderMarginRevertIcon: false,
//     });

//     diffEditor.setModel({
//       original: originalModel,
//       modified: modifiedModel
//     });

//     // 添加装饰件以模拟箭头
//     const decorations = [{
//       range: new monaco.Range(2, 2, 2, 2),
//       options: {
//         isWholeLine: true,
//         linesDecorationsClassName: 'my-arrow-decoration'
//       }
//     }];

//     modifiedModel.onDidChangeContent(() => {
//       diffEditor.getModifiedEditor().createDecorationsCollection([], decorations);
//     });

//     originalModel.onDidChangeContent(() => {
//       diffEditor.getOriginalEditor().createDecorationsCollection([], decorations);
//     });

//     return () => {
//       diffEditor.dispose();
//     };
//   }, []);

//   return <div ref={editorRef} style={{ height: '400px', width: '100%' }} />;
// };

// export default MonacoDiffEditorWithArrows;


// import React, { useState } from 'react';
// import DiffViewer from 'react-diff-viewer-continued';

// function App() {
//   const oldText = `{
//   "name": "John",
//   "age": 30,
//   "address": {
//     "city": "New York",
//     "postalCode": "10001"
//   }
// }`;

//   const newText = `{"name": "John",
//   "age": 31,
//   "address": {
//     "city": "Boston",
//     "postalCode": "10001"
//   }
// }`;

//   const [originData, setOriginData] = useState([]);
//   const [targetData, setTargetData] = useState([]);

//   const handleClick = (str) => {
//     console.log(originData);
//     console.log(targetData);
//   }

//   const renderGutter = (str) => {
//     console.log(str);
//     const { type, prefix } = str;
//     // prefix === 'R' && setTargetData([...targetData,str]);
//     return (
//       <td className='flex items-center'>
//         {prefix === 'L' && type !== 0 && <span style={{ marginLeft: '5px', color: 'red' }} onClick={() => handleClick(str)}>→</span>}
//       </td>
//     )
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>JSON Diff Viewer</h2>
//       <DiffViewer
//         oldValue={oldText}
//         newValue={newText}
//         splitView={true} // 将左右视图分开
//         compareMethod="diffWords" // 对比方式：按字或词比较
//         renderGutter={renderGutter}
//         styles={{
//           variables: {
//             light: {
//               diffViewerBackground: '#f8f8f8',
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Diff, Hunk, parseDiff } from 'react-diff-view';
import 'react-diff-view/style/index.css';

const diffText = `
diff --git a/file.json b/file.json
index 83db48f..f5d1e67 100644
--- a/file.json
+++ b/file.json
@@ -1,7 +1,7 @@
 {
   "name": "John",
-  "age": 30,
-  "city": "New York",
+  "age": 31,
+  "city": "Boston",
   "postalCode": "10001"
 }
`;

function App() {
  const [clickedLine, setClickedLine] = useState(null);

  const [diff] = parseDiff(diffText);

  return (
    <div>
      <h2>React Diff Viewer with Gutter Button</h2>
      <Diff viewType="split" diffType="modify" hunks={diff.hunks} renderGutter={renderGutter}>
        {(hunks) =>
          hunks.map((hunk) => (
            <Hunk key={hunk.content} hunk={hunk} />
          ))
        }
      </Diff>
      {clickedLine && <div>Line {clickedLine} clicked!</div>}
    </div>
  );

  function renderGutter({ change }) {
    const { lineNumber: number, newLineNumber, oldLineNumber, type } = change;
    const lineNumber =  type === "normal" ? newLineNumber || oldLineNumber : number; // 获取当前行的行号

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{lineNumber}</span>
        {type !== "normal" && <button
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => handleButtonClick(lineNumber)}
        >
          →
        </button>}
      </div>
    );
  }

  function handleButtonClick(lineNumber) {
    setClickedLine(lineNumber); // 设置点击的行号
  }
}

export default App;
