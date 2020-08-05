import React, { Component } from "react";
import "./customers.css";
import Profile from "./Profile";
import axios from "axios";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      currentUser: null,
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((customers) =>
        this.setState({ customers }, () =>
          console.log("Customers fetched...", customers)
        )
      );
  }

  updateCustomers = (customers) => {
    fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customers),
    }).then((result) => {
      console.log(result);
    });
  };

  goBack = () => {
    this.setState({ currentUser: null });
  };

  render() {
    const { currentUser, customers } = this.state;
    return (
      <div>
        {currentUser ? (
          <div>
            <Profile
              user={currentUser}
              customers={customers}
              back={this.goBack}
              updateCustomers={this.updateCustomers}
            />
          </div>
        ) : (
          <div>
            <h2>Customers</h2>
            <ul>
              {this.state.customers.map((customer) => (
                <li
                  className="customer-buttons"
                  key={customer.id}
                  onClick={() => {
                    this.setState({ currentUser: customer });
                  }}
                >
                  {customer.firstName} {customer.lastName}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Customers;
