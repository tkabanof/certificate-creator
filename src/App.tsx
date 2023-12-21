import React from 'react';
import './App.css';
import RouterPage from "./pages/RouterPage";
import {BrowserRouter} from "react-router-dom";
import {useLoadStore} from "./hooks/useLoadStore";


function App() {
  useLoadStore();
  return (
      <BrowserRouter>
    <RouterPage/>
  </BrowserRouter>
  )
}

export default App;
