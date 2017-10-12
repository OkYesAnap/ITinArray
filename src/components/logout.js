import React, { Component } from "react";

export default class Login extends Component {
  render() {
    const { logoutFunc } = this.props;
    return (
      <div>
        <button onClick={logoutFunc}>LOGGING OUT</button>
        <div className="content">{this.props.content}</div>
      </div>
    );
  }
}
