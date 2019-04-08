import React, { Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

class CondimentOrder extends Component{
    state = {
        checkedA: false,
      };
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render(){
        const { condiments } = this.props

        return(
           

            <FormControl component="fieldset">
            <FormLabel component="legend">Prilozi</FormLabel>
            <FormGroup>
            {condiments.map(condiment => {
                return <FormControlLabel
                key= {condiment.name}
                control={
                <Checkbox
                    checked={this.state[condiment.name]}
                    onChange={this.handleChange(condiment.name)}
                    value={condiment.name}
                    color="primary"
                    />
                }
                label= {condiment.name}/>}
            )}
            </FormGroup>
          </FormControl>
        );
    }
}

export default CondimentOrder