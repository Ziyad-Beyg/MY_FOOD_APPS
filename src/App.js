import React from 'react';
import './App.css';
import ContextProvider from './Context/ContextAPI';
import Routes from './Configs/Routes';

function App() {
  return (
    <ContextProvider>
      <Routes/>
    </ContextProvider>
  );
}

export default App;
