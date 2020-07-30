import React, { Component } from 'react';
import './customers.css';
import Profile from './Profile'

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      currentUser: null
    };
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    const { currentUser, customers } = this.state
    return (
      <div>
      <div onClick={()=>{this.setState({currentUser: null})}}> &#x2190; Back</div>
      {currentUser  ? <Profile user={currentUser} customers={customers}/> :
        <div><h2>Customers</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li className="customer-buttons" key={customer.id} onClick={() => {this.setState({currentUser: customer})}}>{customer.firstName} {customer.lastName} </li>
        )}
        </ul>
        </div>}
      </div>
    );
  }
}

export default Customers;
