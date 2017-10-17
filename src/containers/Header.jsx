import React, { Component } from 'react'
import { Link }             from 'react-router-dom'

class Header extends React.Component {
  render() {
    const user     = this.props.user;
    const loggedIn = this.props.loggedIn;

    var loginButton;
    var logoutButton;
    if(loggedIn) {
      loginButton  = <Link to='/user'>{user.email}</Link>;
      logoutButton = <li><a href="#">Logout</a></li>;
    } else {
      loginButton = <Link to='/login'>Login</Link>;
    }

    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/pay'>Pay page</Link></li>
            <li><Link to='/bookings'>Bookings page</Link></li>
            <ul className="loginButton">
              <li>{loginButton}</li>
              {logoutButton}
            </ul>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
