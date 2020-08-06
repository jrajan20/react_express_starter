import React, { Component } from "react";
import "./customers.css";
import Profile from "./Profile";
import _ from "lodash";
import axios from "axios";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      currentUser: null,
      currentAccount: null,
    };
  }

  componentDidMount() {
    // fetch("/api/customers")
    //   .then((res) => res.json())
    //   .then((customers) =>
    //     this.setState({ customers }, () =>
    //       console.log("Customers fetched...", customers)
    //     )
    //   );
    this.getCustomers();
  }

  getCustomers = async () => {
    let customers = await fetch("/api/customers").then((res) => res.json());
    this.setState({ customers: customers }, () =>
      console.log("Customers fetched...", customers)
    );
  };

  //used to post to express and update state with changed customers data
  updateCustomers = async (customers) => {
    let update = await axios
      .post("http://localhost:5000/api/customers", customers)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.getCustomers();

    let currentUserProfile = _.find(customers, (customer) => {
      return customer.id === this.state.currentUser.id;
    });

    console.log(customers);
    console.log(currentUserProfile);
    this.setState({ currentUser: currentUserProfile });
  };

  //selected account is updated so user can instantaneously view balance changes
  updateCurrentAccount = (account) => {
    this.setState({ currentAccount: account });
  };

  goBack = () => {
    this.setState({ currentUser: null });
  };

  render() {
    const { currentUser, customers, currentAccount } = this.state;
    return (
      <div>
        {currentUser ? (
          <div>
            <Profile
              user={currentUser}
              customers={customers}
              back={this.goBack}
              updateCustomers={this.updateCustomers}
              updateCurrentAccount={this.updateCurrentAccount}
              currentAccount={currentAccount}
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
