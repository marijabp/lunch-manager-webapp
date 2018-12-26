import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

class PortionSize extends Component {
   
    render() {
        const { options, chosenOption, handleChangeOption } = this.props
        
        return (
            <FormControl component="fieldset" >
                <FormLabel component="legend">Veličina porcije</FormLabel>
                <RadioGroup
                    aria-label="PortionSize"
                    name="portionsize"
                    value={chosenOption || options[0].option}
                    onChange={handleChangeOption}
                >
                    {options.map( item => {
                        return <FormControlLabel
                            key={item.option}
                            value={item.option}
                            control={<Radio color="primary"/>}
                            label={item.option + " (" + item.price + "KM)"}/>
                    })}

                </RadioGroup>
            </FormControl>
        );
    }
}

export default PortionSize
