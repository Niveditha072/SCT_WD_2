import React from "react";
import Stopwatch from "./components/Stopwatch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="stopwatch-wrapper">
        <div className="stopwatch-top-button" />
        <Stopwatch />
      </div>
      <h2>STOPWATCH</h2>
    
    </div>
  );
}

export default App;
