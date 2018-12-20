import React, { Component, Fragment } from 'react';
import './App.css';
import Menu from './components/Menu';
import Authentication from './components/Authentication';

class App extends Component {
  state = {
    loggedIn: false,
    role: "",
    emailLogIn:"",
  }
  logIn = () => {
    this.setState({ loggedIn: true })
  };

  render() {

    return (
      <Fragment>
      <div>{this.state.loggedIn ? <Menu emailLogIn={this.state.emailLogIn}/> : <Authentication logIn={this.logIn} role={this.state.role} emailLogIn={this.state.emailLogIn}></Authentication> }</div></Fragment>
    );
  }
}

export default App;
