import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

class Router extends Component {
  render() {
    const { Notfound, Login, Logout } = this.props.components;
    const { login, pass, content, logined } = this.props;
    const { loginFunc, logoutFunc, update } = this.props;
    return (
      <Switch>
        <Route
          path="/admin/login"
          render={() =>
            logined ? (
              <Redirect to="/admin/dashboard" />
            ) : (
              <Login
                login={login}
                pass={pass}
                loginFunc={loginFunc}
                update={update}
              />
            )}
        />
        <Route
          path="/admin/dashboard"
          render={() =>
            !logined ? (
              <Redirect to="/admin/login" />
            ) : (
              <Logout logoutFunc={logoutFunc} content={content} />
            )}
        />

        <Route path="*" component={Notfound} />
      </Switch>
    );
  }
}

export default Router;
