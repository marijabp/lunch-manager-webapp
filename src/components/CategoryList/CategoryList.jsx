import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    marginTop: "20px" ,
    width: '120px',
    maxWidth: "360px",
    backgroundColor: "rgb(245, 245, 245)",
    
  },
  item: {
    '&:hover': {
      background: "rgb(161, 165, 170)",
    },
  }
});

class CategoryList extends React.Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {

    const { classes, restaurantMenu } = this.props;
    return (
      <Paper>
      <div className={classes.root}>
        <List component="nav">
        {restaurantMenu.map(name =>  {
          return <ListItem
            className={classes.item}
            button
            selected={this.state[name.categoryName]}
            onClick={event => this.handleListItemClick(name) }
            key={name.categoryName}
          >
          
          <ListItemText >{name.categoryName}</ListItemText>
          </ListItem>})}
        </List>
      </div>
      </Paper>
    );
  }
}

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryList);