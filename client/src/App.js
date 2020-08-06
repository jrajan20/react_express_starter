import React, { Component } from "react";
import money from "./money-logo.jpg";
import "./App.css";
import Customers from "./components/Customers";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="bank-app-header">
          <div className="bank-title">
            <img src={money} className="app-logo" alt="logo" />
            <h1 className="app-title">World Wide Bank</h1>
          </div>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
