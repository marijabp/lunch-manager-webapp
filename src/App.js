import React, { Component, Fragment } from 'react';
import './App.css';
import Authentication from './components/Authentication';
import RestaurantList from './components/RestaurantList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import Profile from './components/Profile';
import NavBar from './components/NavBar';


class App extends Component {
  state = {
    loggedIn: false,
    role: "",
    emailLogIn: "",
  }
  logIn = () => {
    this.setState({ loggedIn: true })
  };
  logOut = () => {
    this.setState({ loggedIn: false })
  };
  changeRole = (role) => {
    this.setState({ role: role });
  }
  changeEmail = (emailLogIn) => {
    this.setState({ emailLogIn: emailLogIn });
  }

  render() {
    const { role, emailLogIn, loggedIn } = this.state
    return (
      <Fragment>
        {loggedIn ?
          <div > {role === 'User' ?
            <div>
              <Router>
                <div>
                  <NavBar loggedIn={loggedIn} emailLogIn={emailLogIn} logOut={this.logOut}> </NavBar>
                  <Route exact={true} path="/" component={RestaurantList} />
                  <Route path="/Restaurants/:restaurantName" component={Restaurant} />
                  <Route path="/profile" render={(props) => <Profile {...props} emailLogIn={emailLogIn} />} />
                </div>
              </Router>
            </div>
            :
            <div>Ovdje će ići nova komponenta</div>
          }</div>
          :
          <Authentication logIn={this.logIn} changeRole={this.changeRole} changeEmail={this.changeEmail}></Authentication>}
      </Fragment>
    );
  }
}

export default App;
