import React, { Component } from "react";
import Account from "./Account";
import "./customers.css";
import "./accounts.css";
import _ from "lodash";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      accountInfo: {},
    };
  }

  componentDidMount() {}

  goBack = () => {
    this.props.updateCurrentAccount(null);
  };

  render() {
    const {
      user,
      customers,
      back,
      updateCustomers,
      updateCurrentAccount,
      currentAccount,
    } = this.props;

    return currentAccount ? (
      <div>
        <Account
          account={currentAccount}
          back={this.goBack}
          customers={customers}
          user={user}
          updateCustomers={updateCustomers}
          updateCurrentAccount={updateCurrentAccount}
        />
      </div>
    ) : (
      <div>
        <div
          className="back-button"
          onClick={() => {
            back();
          }}
        >
          {" "}
          &#x2190; Back
        </div>
        <div className="account-info">
          <div className="account-title">{`${user.firstName} ${user.lastName}, ID: ${user.id}`}</div>
          <div className="account-title">Accounts</div>
          <div className="accounts-container">
            <div className="accounts-list">
              {user.accounts.map((account) => (
                <div
                  className="account-card"
                  onClick={() => {
                    updateCurrentAccount(account);
                  }}
                >
                  <div>
                    <div className="account-type">CHEQUING</div>
                    <div>{account.number}</div>
                  </div>
                  <div>{`$${Number(account.balance).toFixed(2)} CAD`}</div>
                </div>
              ))}
            </div>
          </div>
          {user.alerts.length > 0 ? (
            <div className="alerts-list">
              <div className="alert-title">Alerts:</div>
              <div className="alert-messages">
                {user.alerts.map((alert) => (
                  <li>{alert}</li>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Profile;
