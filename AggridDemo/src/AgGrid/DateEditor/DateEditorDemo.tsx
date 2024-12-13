"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, ModuleRegistry, ValueFormatterParams } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
]);

const data = Array.from(Array(20).keys()).map((val: any, index: number) => ({
  date: new Date(2023, 5, index + 1),
}));

export const EditorGridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>(data);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "Date Editor",
      field: "date",
      valueFormatter: (params: ValueFormatterParams<any, Date>) => {
        if (!params.value) {
          return "";
        }
        const month = params.value.getMonth() + 1;
        const day = params.value.getDate();
        return `${params.value.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
      },
      cellEditor: "agDateCellEditor",
      onCellValueChanged: ({ newValue, data }) =>
      {
        console.log("new value is :", newValue);
        console.log("data is : ", data);
        
      }
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 200,
      editable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};