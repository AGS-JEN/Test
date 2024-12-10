// import React, { useState, useRef, useEffect } from "react";
// import { AgGridReact } from "@ag-grid-community/react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// // 自定义单元格渲染器
// const CheckboxRenderer = (props) => {
//   const { value, api, node, columnApi, context } = props;
//   const [checked, setChecked] = useState(value);

//   const handleChange = (event) => {
//     const newValue = event.target.checked;
//     setChecked(newValue);

//     // 更新数据
//     const rowNode = api.getRowNode(node.id);
//     rowNode.setDataValue(columnApi.getColumn(props.colDef.field), newValue);

//     // 触发相关处理逻辑
//     if (newValue) {
//       console.log("Checkbox checked for row:", node.data);
//       // 在这里添加你的处理逻辑
//     } else {
//       console.log("Checkbox unchecked for row:", node.data);
//       // 在这里添加你的处理逻辑
//     }
//   };

//   return <input type="checkbox" checked={checked} onChange={handleChange} />;
// };

// const CheckboxDemo = () => {
//   const gridRef = useRef(null);

//   const columnDefs = [
//     { headerName: "Make", field: "make" },
//     { headerName: "Model", field: "model" },
//     { headerName: "Price", field: "price" },
//     {
//       headerName: "Selected",
//       field: "selected",
//       cellRenderer: CheckboxRenderer,
//       cellRendererParams: {
//         // 你可以在这里传递额外的参数
//       },
//     },
//   ];

//   const rowData = [
//     { make: "Toyota", model: "Celica", price: 35000, selected: false },
//     { make: "Ford", model: "Mondeo", price: 32000, selected: true },
//     { make: "Porsche", model: "Boxster", price: 72000, selected: false },
//   ];

//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
//       <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} />
//     </div>
//   );
// };

// export default CheckboxDemo;
// eslint-disable-next-line import/no-anonymous-default-export
export default {};