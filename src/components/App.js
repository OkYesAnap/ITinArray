import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Notfound from "./notfound";
import Router from "./router";
import Login from "./login";
import Logout from "./logout";
import Api from "./api";
import Cont from "./content";
const api = new Api();
const wwwcontent = new Cont();
console.log(wwwcontent);
const { msg, adminContent, userContent } = wwwcontent;

class App extends Component {
  constructor() {
    super();
    this.state = {
      components: {
        Notfound: Notfound,
        Login: Login,
        Logout: Logout
      },
      login: "",
      pass: "",
      role: "",
      content: "",
      message: msg,
      logined: false
    };
    this.loginFunc = this.loginFunc.bind(this);
    this.update = this.update.bind(this);
    this.logoutFunc = this.logoutFunc.bind(this);
  }
  update(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  messageFunc(data) {
    if (data) {
      this.setState({
        message: `${data.name} wellcome, you role ${data.role}`,
        logined: true,
        content: data.role === "admin" ? adminContent : userContent
      });
      localStorage.name = data.name;
      localStorage.role = data.role;
    } else {
      this.setState({
        message: `Wrong login/password try again`
      });
      setTimeout(() => {
        this.setState({
          message: msg
        });
      }, 2000);
    }
  }
  componentDidMount() {
    if (localStorage.name && localStorage.role) {
      this.messageFunc({ name: localStorage.name, role: localStorage.role });
    }
  }
  loginFunc() {
    let logPass = { login: this.state.login, pass: this.state.pass };
    api.logginIn("admin/login", logPass).then(data => {
      this.messageFunc(data);
      this.setState({ role: data.role });
    });
  }
  logoutFunc() {
    this.setState({
      name: "",
      pass: "",
      message: msg,
      logined: false
    });
    localStorage.clear();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Test ITinArray</header>
        <Header message={this.state.message} />
        <Router
          components={this.state.components}
          login={this.state.login}
          pass={this.state.pass}
          role={this.state.role}
          content={this.state.content}
          logined={this.state.logined}
          loginFunc={this.loginFunc}
          logoutFunc={this.logoutFunc}
          update={this.update}
        />
      </div>
    );
  }
}

export default App;
