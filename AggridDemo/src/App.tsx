import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GridExample } from './AgGrid/DemoA';
import { PagedGridExample } from './AgGrid/Pagination/demoB';

function App() {
  return (
    <div className="App">
      <PagedGridExample></PagedGridExample>
    </div>
  );
}

export default App;
