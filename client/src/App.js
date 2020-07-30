import React, { Component } from 'react';
import money from './money-logo.png';
import './App.css';
import Customers from './components/customers';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="bank-app-header">
          <img src={money} className="app-logo" alt="logo" />
          <h1 className="app-title">World Wide Bank</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
