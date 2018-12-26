import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
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
      let email=this.props.emailLogIn;
      let name="";
      let users = JSON.parse(localStorage.getItem('users'))
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    name=users[i].name;
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

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Zdravo, {this.getUsersName()}
            </Typography>
            <div>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  variant="outlined"
                  color="secondary"
                > Settings
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
                  <MenuItem onClick={this.handleClose}>My accont</MenuItem>
                  <MenuItem onClick={this.handleChange}>Logout</MenuItem>
                </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
     /* <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
        }
        label={auth ? 'Logout' : 'Login'}
      />
    </FormGroup>*/
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);