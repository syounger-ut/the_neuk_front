var React = require("react");

var LoginForm = React.createClass ({
  getInitialState: function() {
    return {
      email:    "",
      password: ""
    }
  },
  handleLogin: function() {
    this.setState({
      email:    this.refs.email,
      password: this.refs.password
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var email    = this.state.email.value;
    var password = this.state.password.value;

    console.log(email, password);

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/api/login",
      data: { email: email, password: password }
    }).done(function(data) {
      localStorage.setItem('auth_token', data.token);
    }).fail(function(e) {
      console.log(e);
    });

  },
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="email" placeholder="Email" onChange={this.handleLogin}/>
          <input type="password" ref="password" placeholder="Password" onChange={this.handleLogin}/>
          <input className="button" type="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;