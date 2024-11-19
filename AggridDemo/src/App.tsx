import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GridExample } from './AgGrid/DemoA';
import { PagedGridExample } from './AgGrid/Pagination/demoB';
import { FilterGridExample } from './AgGrid/Filter/FilterDemoA';

function App() {
  return (
    <div className="App">
      <FilterGridExample></FilterGridExample>
    </div>
  );
}

export default App;
