import React, { Component } from 'react';
import './customers.css';
import './accounts.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      accountInfo: {}
    };
  }

  componentDidMount() {
    
  }

  render() {
    const {user, customers} = this.props

    return (
      <div className="account-info">
        <div className="account-title">{`${user.firstName} ${user.lastName}, ID: ${user.id}`}</div>
        <div>Accounts</div>
        <div className="accounts-container">
          <div className="accounts-list">
          {user.accounts.map(account => (
            
              <div className="account-card">
                <div>
                  <div className="account-type">CHEQUING</div>
                  <div>{account.number}</div>
                </div>
                <div>
                  {`$${account.balance} CAD`}
                </div>
              </div>
            
            ))}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Profile;