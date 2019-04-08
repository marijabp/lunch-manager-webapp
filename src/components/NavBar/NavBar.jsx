import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {  Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    color: "black",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component {

  state = {
    anchorEl: null,
  };
  getUsersName = () => {
    let email = this.props.loginEmail;
    let name = "";
    let users = JSON.parse(localStorage.getItem('users'))
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          name = users[i].name;
        }
      }
    }
    return name;
  }
  handleChange = () => {
    this.props.logOut();
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleProfile = () => {

  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>

        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
              Zdravo, {this.getUsersName()}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                variant="outlined"
                color="default"
              > Podešavanja
                </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <Link to="/profile"> <MenuItem>Profil</MenuItem></Link>
                <MenuItem onClick={this.handleChange}>Odjavi se</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);