import React, { Component } from "react";
import "./customers.css";
import Profile from "./Profile";

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
