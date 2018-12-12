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
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CategoryList extends React.Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {

    const { classes, categoryNames } = this.props;

    return (
      <Paper>
      <div className={classes.root}>
        <List component="nav">
        {categoryNames.map(name =>  {
          return <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0) }
            key={name}
          >
          
          <ListItemText>{name}</ListItemText>
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