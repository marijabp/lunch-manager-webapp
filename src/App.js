import React, { Component, Fragment } from 'react';
import './App.css';
import Authentication from './components/Authentication';
import RestaurantList from './components/RestaurantList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import Profile from './components/Profile';
import Background from './images/food.jpg';
import NavBar from './components/NavBar';

const styles = {
 // width: "2000px",
 // height: "2000px",  
  backgroundImage: "url(" + Background + ")",
 // BackgroundSize: "100%",
};

class App extends Component {
  state = {
    loggedIn: true,
    role: "User",
    emailLogIn: "",
  }
  logIn = () => {
    this.setState({ loggedIn: true })
  };
  logOut = () => {
    this.setState({loggedIn: false})
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
        <div>{loggedIn ?
          <div style={styles}> {role === 'User' ?

            <div>
              <NavBar loggedIn={loggedIn} emailLogIn={emailLogIn} logOut={this.logOut}/>
              <div className="root">
              <Router>
                <Switch>
                  <Route exact={true} path="/" component={RestaurantList} />
                  <Route path="/Restaurants/:restaurantName" component={Restaurant}/>
                  <Route path="/profile" component={Profile} />
                </Switch>
              </Router>
              </div>
            </div>
            :
            <div>Ovdje će ići nova komponenta</div>
          }</div>
          :
          <Authentication logIn={this.logIn} changeRole={this.changeRole} changeEmail={this.changeEmail}></Authentication>}
        </div></Fragment>
    );
  }
}

export default App;
