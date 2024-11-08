"use strict";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  ModuleRegistry,
  RowModelType,
  createGrid,
} from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { FakeServer } from "./fakeServer";
import { IOlympicDataWithId } from "./interfaces";

ModuleRegistry.registerModules([
  ColumnsToolPanelModule,
  MenuModule,
  ServerSideRowModelModule,
]);

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any,
) => {
  return {
    getRows: (params) => {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(() => {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
};


export const PagedGridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", maxWidth: 75 },
    { field: "athlete", minWidth: 190 },
    { field: "age" },
    { field: "year" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    console.log("onGridReady callback...");
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicDataWithId[]) => {
        // add id to data
        var idSequence = 1;
        data.forEach(function (item: any) {
          item.id = idSequence++;
        });
        // setup the fake server with entire dataset
        var fakeServer = FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setGridOption("serverSideDatasource", datasource);
      });
  }, []);

  return (
    <div
    className={"ag-theme-quartz"}
    style={{ width: "100%", height: "100%" }}
  >
        <AgGridReact<IOlympicDataWithId>
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={"serverSide"}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          cacheBlockSize={10}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        />
      </div>
  );
};


