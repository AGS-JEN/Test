import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GridExample } from './AgGrid/DemoA';
import { PagedGridExample } from './AgGrid/Pagination/demoB';
import { FilterGridExample } from './AgGrid/Filter/FilterDemoA';
import { RowDataUpdateDemo } from './AgGrid/DynamicDataSync/RowDataUpdate';
import { QuickFilterGridSample } from './AgGrid/QuickFilter/QuickFilter';

function App() {
  return (
    <div className="App">
      <QuickFilterGridSample></QuickFilterGridSample>
    </div>
  );
}

export default App;
