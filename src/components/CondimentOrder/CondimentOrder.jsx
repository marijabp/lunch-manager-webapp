import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

class CondimentOrder extends Component {
  state = {
    checkedA: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  onChangeFavorite = event => {
    console.log(event.target.checked, event.target.value);
    if(event.target.checked===true)
         this.props.handleAddCondiment(event.target.value)
   /* if(event.target.checked===true){
        this.setState({condiments: [...this.state.condiments, event.target.value]})*/
    
   /* else{
        this.setState({
            condiments: condiments.filter(el => el !== event.target.value)
        })
    }*/
};

  render() {
    const { condiments } = this.props
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Prilozi</FormLabel>
        <FormGroup>
          {condiments.map(condiment => {
            return <FormControlLabel
              key={condiment.condimentId}
              control={
                <Checkbox
                  checked={this.state[condiment.name]}
                  onChange={this.handleChange("condiment.name") && this.onChangeFavorite}
                  value={condiment.name}
                  color="primary"
                />
              }
              label={condiment.name} />
          }
          )}
        </FormGroup>
      </FormControl>
    );
  }
}

export default CondimentOrder