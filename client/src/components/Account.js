import React, { Component } from "react";
import "./accounts.css";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      withdrawal: null,
      deposit: null,
      transfer: null,
    };
  }

  render() {
    const { account, back } = this.props;

    return (
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
          <div className="account-title">{`Account Number: ${account.number}`}</div>

          <div className="action-card">
            <div className="action-title">Withdraw</div>
            <div>
              <input
                className="amount-input"
                type="number"
                onChange={(e) => {
                  this.setState({ withdrawal: e.target.value });
                }}
              />
              <button className="confirm-button">Confirm</button>
            </div>
          </div>
          <div className="action-card">
            <div className="action-title">Deposit:</div>
            <div>
              <input
                className="amount-input"
                type="number"
                onChange={(e) => {
                  this.setState({ deposit: e.target.value });
                }}
              />
              <button className="confirm-button">Confirm</button>
            </div>
          </div>
          <div className="action-card">
            <div className="action-title">Transfer</div>
            <div>
              <input
                className="amount-input"
                type="number"
                onChange={(e) => {
                  this.setState({ transfer: e.target.value });
                }}
              />
              <button className="confirm-button">Confirm</button>
            </div>
          </div>
          <div className="action-card">
            <div>Transaction History</div>
            <div className="history-box"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
