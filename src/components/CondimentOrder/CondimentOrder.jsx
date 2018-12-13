import React, { Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

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
            /* condiments.map(condiment => {
                 console.log(condiment.condiment)
                return <Checkbox
                    checked={this.state.checkedA}
                    onChange={this.handleChange('checkedA')}
                    value="checkedA"
                    color="primary"
                    key= {condiment.condiment}> 123 </Checkbox>
                }
            )*/

            <FormControl component="fieldset">
            <FormLabel component="legend">Prilozi</FormLabel>
            <FormGroup>
            {condiments.map(condiment => {
                return <FormControlLabel
                key= {condiment.condimentName}
                control={
                <Checkbox
                    checked={this.state[condiment.condimentName]}
                    onChange={this.handleChange(condiment.condimentName)}
                    value={condiment.condimentName}
                    color="primary"
                    />
                }
                label= {condiment.condimentName}/>}
            )}
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
        );
    }
}

export default CondimentOrder