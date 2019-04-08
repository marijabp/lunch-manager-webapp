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
    loggedIn: false,
    loginEmail: "",
    role: '',
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

  render() {
    const { role, loginEmail, loggedIn } = this.state
    return (
      <Fragment>
        {loggedIn ?
          <div > {role === 'Customer' ?
            <div>
              <Router>
                <div>
                  <NavBar loggedIn={loggedIn} loginEmail={loginEmail} logOut={this.logOut}> </NavBar>
                  <Route exact={true} path="/" component={RestaurantList} />
                  <Route path="/Restaurants/:routeName" component={Restaurant} />
                  <Route path="/profile" render={(props) => <Profile {...props} loginEmail={loginEmail} />} />
                </div>
              </Router>
            </div>
            :

            <div>
              <Router>
                <div>
                  <NavBar loggedIn={loggedIn} loginEmail={loginEmail} logOut={this.logOut}> </NavBar>
                  <Route exact={true} path="/" render={(props) => <RestaurantActions {...props} loginEmail={loginEmail} />} />
                  <Route path="/profile" render={(props) => <Profile {...props} loginEmail={loginEmail} />} />
                </div>
              </Router>
            </div>

          }</div>
          :
          <Authentication logIn={this.logIn} changeRole={this.changeRole} changeEmail={this.changeEmail}></Authentication>}
      </Fragment>
    );
  }
}

export default App;
