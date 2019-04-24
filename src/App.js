import React, { Component, Fragment } from 'react';
import './App.css';
import Authentication from './components/Authentication';
import RestaurantList from './components/RestaurantList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import RestaurantActions from './components/RestaurantActions';



class App extends Component {
  state = {
    id: 0,
    loggedIn: false,
    loginEmail: "",
    role: '',
    user: [],
  }
  logIn = () => {
    this.setState({ loggedIn: true, user: {} })
  };
  logOut = () => {
    this.setState({ loggedIn: false })
  };
  changeRole = (role) => {
    this.setState({ role: role });
  }
  changeEmail = (loginEmail) => {
    this.setState({ loginEmail: loginEmail });
  }
  changeId = (id) => {
    this.setState({ id: id });
  }
  changeData = (user) => {
    this.setState({ user })
  }
  handleChangeData = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    const { role, loginEmail, loggedIn, id, user } = this.state
    console.log(this.state.user)
    return (
      <Fragment>
        {loggedIn ?
          <div > {role === 'Customer' ?
            <Router>
              <div>
                <NavBar loggedIn={loggedIn} loginEmail={loginEmail} user={user} logOut={this.logOut}> </NavBar>
                <Route exact={true} path="/" component={RestaurantList} />
                <Route path="/Restaurants/:routeName" render={(props) => <Restaurant {...props} loginEmail={loginEmail} role={role} user={user} id={id} />} />
                <Route path="/profile" render={(props) => <Profile {...props} id={id} loginEmail={loginEmail} role={role} user={user} />} />
              </div>
            </Router>

            :

            <Router>
              <div>
                <NavBar loggedIn={loggedIn} loginEmail={loginEmail} user={user} logOut={this.logOut}> </NavBar>
                <Route exact={true} path="/" render={(props) => <RestaurantActions {...props} restaurant={user} loginEmail={loginEmail} id={id} />} />
                <Route path="/profile" render={(props) => <Profile {...props} loginEmail={loginEmail} id={id} role={role} user={user} />} />
              </div>
            </Router>

          }</div>
          :
          <Authentication logIn={this.logIn} changeData={this.changeData} changeRole={this.changeRole} changeEmail={this.changeEmail} changeId={this.changeId}></Authentication>}
      </Fragment>
    );
  }
}

export default App;
