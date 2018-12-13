import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

class PortionSize extends Component {
    state = {
        value: 'female',
      };
    
      handleChange = event => {
        this.setState({ value: event.target.value });
      };

    render() {
        const { options }= this.props
        return (
            <FormControl component="fieldset" >
                <FormLabel component="legend">Veličina porcije</FormLabel>
                <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                {options.map(({ option }) => {
                return     <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="primary" />}
                label={option} />})}

                </RadioGroup>
            </FormControl>
        );
    }
}

export default PortionSize