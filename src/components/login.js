import React, { Component } from "react";

export default class Login extends Component {
  render() {
    var { login, pass } = this.props;
    const { loginFunc, update } = this.props;
    return (
      <div>
        <span> login</span>
        <input type="text" name="login" value={login} onChange={update} />
        <span> password</span>
        <input type="text" name="pass" value={pass} onChange={update} />
        <button onClick={loginFunc}>Confirm</button>
      </div>
    );
  }
}
