import React, { Component } from "react";
import "./accounts.css";
import _ from "lodash";

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
      transferUser: null,
    };
  }

  clearState = () => {
    this.setState({
      withdrawal: null,
      deposit: null,
      transfer: null,
      transferAcc: null,
      wCurrency: null,
      dCurrency: null,
      tCurrency: null,
      transferUser: null,
    });

    this.inputWithdraw.value = "";
    this.inputDeposit.value = "";
    this.inputTransferAcc.value = "";
    this.inputTransferUser.value = "";
    this.inputTransfer.value = "";
  };

  handleWithdrawCurrency = (evt) => {
    this.setState({ wCurrency: evt.target.value });
  };

  handleDepositCurrency = (evt) => {
    this.setState({ dCurrency: evt.target.value });
  };

  handleTransferCurrency = (evt) => {
    this.setState({ tCurrency: evt.target.value });
  };

  currencyExchange = (currency, amount) => {
    let moneyValue = _.ceil(Number(amount), 2);

    switch (currency) {
      case "CAD":
        return moneyValue;
      case "USD":
        return moneyValue * 2;
      case "MXN":
        return moneyValue / 10;
    }
  };

  handleWithdrawal = () => {
    const { withdrawal, wCurrency } = this.state;
    const {
      account,
      customers,
      user,
      updateCustomers,
      updateCurrentAccount,
    } = this.props;
    let date = new Date().toLocaleString();
    let accountUpdate = { ...account };

    if (account.users.includes(user.id)) {
      let newBalance = _.ceil(
        Number(account.balance) - this.currencyExchange(wCurrency, withdrawal),
        2
      );
      //updating user's account
      accountUpdate.balance = newBalance.toString();
      accountUpdate.transactionHistory.push({
        date: date,
        transactionType: "withdrawal",
        amount: this.currencyExchange(wCurrency, withdrawal),
        newBalance: newBalance.toString(),
      });

      let updatedAccounts = user.accounts.map((account) => {
        if (account.number === accountUpdate.number) {
          return (account = accountUpdate);
        } else {
          return account;
        }
      });
      //updating customers array
      let userUpdate = customers.map((customer) => {
        if (user.id === customer.id) {
          return { ...customer, accounts: updatedAccounts };
        } else {
          return customer;
        }
      });

      updateCustomers(userUpdate);
      updateCurrentAccount(accountUpdate);

      this.clearState();
    } else {
      //alerts for accessing the account
      let alertMessage = `Unauthorized user attempted to withdraw money from your account, Account Number: ${account.number}`;
      let alertsUpdate = customers.map((customer) => {
        if (account.users.includes(customer.id)) {
          return { ...customer, alerts: customer.alerts.concat(alertMessage) };
        } else {
          return customer;
        }
      });

      alert("Not authorized to make this action!");

      updateCustomers(alertsUpdate);
      this.clearState();
    }
  };

  handleDeposit = () => {
    const { deposit, dCurrency } = this.state;
    const {
      account,
      customers,
      user,
      updateCustomers,
      updateCurrentAccount,
    } = this.props;
    let date = new Date().toLocaleString();
    let accountUpdate = { ...account };

    if (account.users.includes(user.id)) {
      let newBalance = _.ceil(
        Number(account.balance) + this.currencyExchange(dCurrency, deposit),
        2
      );
      //updating user's account
      accountUpdate.balance = newBalance.toString();
      accountUpdate.transactionHistory.push({
        date: date,
        transactionType: "deposit",
        amount: this.currencyExchange(dCurrency, deposit),
        newBalance: newBalance.toString(),
      });

      let updatedAccounts = user.accounts.map((account) => {
        if (account.number === accountUpdate.number) {
          return (account = accountUpdate);
        } else {
          return account;
        }
      });
      //updating customers array
      let userUpdate = customers.map((customer) => {
        if (user.id === customer.id) {
          return { ...customer, accounts: updatedAccounts };
        } else {
          return customer;
        }
      });

      updateCustomers(userUpdate);
      updateCurrentAccount(accountUpdate);

      this.clearState();
    } else {
      //alerts for accessing the account
      let alertMessage = `Unauthorized user attempted to access your account, Account Number: ${account.number}`;
      let alertsUpdate = customers.map((customer) => {
        if (account.users.includes(customer.id)) {
          return { ...customer, alerts: customer.alerts.concat(alertMessage) };
        } else {
          return customer;
        }
      });

      alert("Not authorized to make this action!");

      updateCustomers(alertsUpdate);
      this.clearState();
    }
  };

  handleTransfer = () => {
    const { transfer, tCurrency, transferAcc, transferUser } = this.state;
    const {
      account,
      customers,
      user,
      updateCustomers,
      updateCurrentAccount,
    } = this.props;
    let date = new Date().toLocaleString();
    let accountUpdate = { ...account };

    //finding user and account the money is being transferred to
    let transferCustomer = _.find(customers, (customer) => {
      return customer.id === transferUser;
    });

    let transferAccUpdate = transferCustomer
      ? _.find(transferCustomer.accounts, (account) => {
          return account.number === transferAcc;
        })
      : null;

    if (transferAccUpdate && transferCustomer) {
      if (account.users.includes(user.id)) {
        let newBalance = _.ceil(
          Number(account.balance) - this.currencyExchange(tCurrency, transfer),
          2
        );
        let newTransferBalance = _.ceil(
          Number(transferAccUpdate.balance) +
            this.currencyExchange(tCurrency, transfer),
          2
        );
        //update accounts involved with transfer and recieve scenario
        accountUpdate.balance = newBalance.toString();
        accountUpdate.transactionHistory.push({
          date: date,
          transactionType: "transfer",
          amount: this.currencyExchange(tCurrency, transfer),
          newBalance: newBalance.toString(),
          transferAccountNumber: transferAcc,
          transferUser: {
            id: transferCustomer.id,
            firstName: transferCustomer.firstName,
            lastName: transferCustomer.lastName,
          },
        });

        transferAccUpdate.balance = newTransferBalance.toString();
        transferAccUpdate.transactionHistory.push({
          date: date,
          transactionType: "recieved",
          amount: this.currencyExchange(tCurrency, transfer),
          newBalance: newTransferBalance.toString(),
          transferFromAcc: account.number,
          transferFromUser: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });

        let updatedAccounts = user.accounts.map((acc) => {
          if (acc.number === accountUpdate.number) {
            return (acc = accountUpdate);
          } else {
            return acc;
          }
        });

        let updatedTransferAccounts = transferCustomer.accounts.map((acc) => {
          if (acc.number === transferAccUpdate.number) {
            return (acc = transferAccUpdate);
          } else {
            return acc;
          }
        });
        //update customers with user's transfer and recieve scenario
        let userUpdate = customers.map((customer) => {
          if (user.id === customer.id) {
            return { ...customer, accounts: updatedAccounts };
          } else {
            return customer;
          }
        });

        let transferUserUpdate = userUpdate.map((customer) => {
          if (transferUser === customer.id) {
            return { ...customer, accounts: updatedTransferAccounts };
          } else {
            return customer;
          }
        });

        //update customers post request and update the seected account in state
        updateCustomers(transferUserUpdate);
        updateCurrentAccount(accountUpdate);

        this.clearState();
      } else {
        // alerts user who's account is being accessed
        let alertMessage = `Unauthorized user attempted to transfer from your account, Account Number: ${account.number}`;
        let alertsUpdate = customers.map((customer) => {
          if (account.users.includes(customer.id)) {
            return {
              ...customer,
              alerts: customer.alerts.concat(alertMessage),
            };
          } else {
            return customer;
          }
        });

        alert("Not authorized to make this action");
        updateCustomers(alertsUpdate);
        this.clearState();

        console.log(alertsUpdate);
      }
    } else {
      alert("Enter a valid User ID and Account Number to transfer");
      this.clearState();
    }
  };

  changeCurrencyFormat = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  //transaction history format based on type
  transactionLogFormat = (type, history) => {
    switch (type) {
      case "withdrawal":
        return `Withdrew ${this.changeCurrencyFormat(
          Number(history.amount)
        )} | Closing Balance: ${this.changeCurrencyFormat(
          Number(history.newBalance)
        )} | ${history.date}`;
      case "deposit":
        return `Deposited ${this.changeCurrencyFormat(
          Number(history.amount)
        )} | Closing Balance: ${this.changeCurrencyFormat(
          Number(history.newBalance)
        )} | ${history.date}`;
      case "transfer":
        return `Transferred ${this.changeCurrencyFormat(
          Number(history.amount)
        )} to ${history.transferUser.firstName} ${
          history.transferUser.lastName
        }, account #: ${
          history.transferAccountNumber
        } | Closing Balance: ${this.changeCurrencyFormat(
          Number(history.newBalance)
        )} | ${history.date}`;
      case "recieved":
        return `Recieved ${this.changeCurrencyFormat(
          Number(history.amount)
        )} from ${history.transferFromUser.firstName} ${
          history.transferFromUser.lasttName
        }, account #: ${
          history.transferFromAcc
        } | Closing Balance: ${this.changeCurrencyFormat(
          Number(history.newBalance)
        )} | ${history.date}`;
    }
  };

  render() {
    const {
      account,
      back,
      customers,
      user,
      updateCustomers,
      updateCurrentAccount,
    } = this.props;
    const {
      withdrawal,
      deposit,
      transfer,
      wCurrency,
      dCurrency,
      tCurrency,
      transferAcc,
      transferUser,
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
          <div className="account-title">{`User: ${user.firstName} ${user.lastName}, Account Number: ${account.number} `}</div>
          <div className="account-title">{`Balance: ${Number(
            account.balance
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} CAD`}</div>
          <div className="action-card">
            <div className="action-title">Withdraw:</div>
            <div>
              <label>
                <p>Amount:</p>${" "}
                <input
                  className="amount-input"
                  type="number"
                  ref={(el) => (this.inputWithdraw = el)}
                  onChange={(e) => {
                    this.setState({ withdrawal: e.target.value });
                  }}
                />
              </label>
              <button
                className="confirm-button"
                disabled={!wCurrency || !withdrawal}
                onClick={this.handleWithdrawal}
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
                  ref={(el) => (this.inputDeposit = el)}
                  onChange={(e) => {
                    this.setState({ deposit: e.target.value });
                  }}
                />
              </label>
              <button
                className="confirm-button"
                disabled={!dCurrency || !deposit}
                onClick={this.handleDeposit}
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
                <p>To User (ID): </p>
                <input
                  className="amount-input"
                  type="number"
                  ref={(el) => (this.inputTransferUser = el)}
                  onChange={(e) => {
                    this.setState({ transferUser: e.target.value });
                  }}
                />
              </label>
              <label>
                <p>To Account #:</p>
                <input
                  className="amount-input"
                  type="number"
                  ref={(el) => (this.inputTransferAcc = el)}
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
                  ref={(el) => (this.inputTransfer = el)}
                  onChange={(e) => {
                    this.setState({ transfer: e.target.value });
                  }}
                />
              </label>

              <button
                className="confirm-button"
                disabled={
                  !tCurrency || !transferAcc || !transfer || !transferUser
                }
                onClick={this.handleTransfer}
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
          <div className="history-box">
            {account.transactionHistory.length > 0
              ? account.transactionHistory.map((entry) => (
                  <li style={{ fontSize: "16px" }}>
                    {this.transactionLogFormat(entry.transactionType, entry)}
                  </li>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
