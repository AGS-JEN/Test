import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Create new GridExample component
export const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
    {
      headerName: "Electric",
      field: "electric",
      cellRenderer: "agBooleanCellRenderer",
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };
  const gridRef = useRef<AgGridReact>(null);
  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={{
          floatingFilter: false,
        }}
        rowSelection={{
          mode: "singleRow",
        }}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        domLayout="autoHeight"
        onGridReady={(param: any) => {
          param.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};
