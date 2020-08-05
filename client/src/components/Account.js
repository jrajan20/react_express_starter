import React, { Component } from "react";
import "./accounts.css";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      withdrawal: null,
      deposit: null,
      transfer: null,
      transferAcc: null,
      wCurrency: null,
      dCurrency: null,
      tCurrency: null,
    };
  }

  handleWithdrawCurrency = (evt) => {
    this.setState({ wCurrency: evt.target.value });
  };

  handleDepositCurrency = (evt) => {
    this.setState({ dCurrency: evt.target.value });
  };

  handleTransferCurrency = (evt) => {
    this.setState({ tCurrency: evt.target.value });
  };

  render() {
    const { account, back } = this.props;
    const {
      withdrawal,
      deposit,
      transfer,
      wCurrency,
      dCurrency,
      tCurrency,
      transferAcc,
    } = this.state;

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
            <div className="action-title">Withdraw:</div>
            <div>
              <label>
                <p>Amount:</p>${" "}
                <input
                  className="amount-input"
                  type="number"
                  onChange={(e) => {
                    this.setState({ withdrawal: e.target.value });
                  }}
                />
              </label>
              <button
                className="confirm-button"
                disabled={!wCurrency || !withdrawal}
              >
                Confirm
              </button>
            </div>
            <div className="currency-selection">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="CAD"
                    checked={this.state.wCurrency === "CAD"}
                    onChange={this.handleWithdrawCurrency}
                  />
                  CAD
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="USD"
                    checked={this.state.wCurrency === "USD"}
                    onChange={this.handleWithdrawCurrency}
                  />
                  USD
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="MXN"
                    checked={this.state.wCurrency === "MXN"}
                    onChange={this.handleWithdrawCurrency}
                  />
                  MXN
                </label>
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-title">Deposit:</div>
            <div>
              <label>
                <p>Amount:</p>${" "}
                <input
                  className="amount-input"
                  type="number"
                  onChange={(e) => {
                    this.setState({ deposit: e.target.value });
                  }}
                />
              </label>
              <button
                className="confirm-button"
                disabled={!dCurrency || deposit}
              >
                Confirm
              </button>
              <div className="currency-selection">
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="CAD"
                      checked={this.state.dCurrency === "CAD"}
                      onChange={this.handleDepositCurrency}
                    />
                    CAD
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="USD"
                      checked={this.state.dCurrency === "USD"}
                      onChange={this.handleDepositCurrency}
                    />
                    USD
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="MXN"
                      checked={this.state.dCurrency === "MXN"}
                      onChange={this.handleDepositCurrency}
                    />
                    MXN
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-title">Transfer:</div>
            <div>
              <label>
                <p>To Account #:</p>
                <input
                  className="amount-input"
                  type="number"
                  onChange={(e) => {
                    this.setState({ transferAcc: e.target.value });
                  }}
                />
              </label>
              <label>
                <p>Amount:</p>${" "}
                <input
                  className="amount-input"
                  type="number"
                  onChange={(e) => {
                    this.setState({ transfer: e.target.value });
                  }}
                />
              </label>

              <button
                className="confirm-button"
                disabled={!tCurrency || !transferAcc || !transfer}
              >
                Confirm
              </button>
              <div className="currency-selection">
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="CAD"
                      checked={this.state.tCurrency === "CAD"}
                      onChange={this.handleTransferCurrency}
                    />
                    CAD
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="USD"
                      checked={this.state.tCurrency === "USD"}
                      onChange={this.handleTransferCurrency}
                    />
                    USD
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="MXN"
                      checked={this.state.tCurrency === "MXN"}
                      onChange={this.handleTransferCurrency}
                    />
                    MXN
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="action-title">Transaction History</div>
          <div className="history-box"></div>
        </div>
      </div>
    );
  }
}

export default Account;
