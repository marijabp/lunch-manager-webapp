import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { fetchCondiments } from '../../httpClient/CondimentAPI/condimentAPI';
import { addCategory } from '../../httpClient/CategoryAPI/categoryApi';
import { fetchRestaurantByEmail } from '../../httpClient/UserAPI/userAPI';
import { fetchRestaurants} from '../../httpClient/RestaurantAPI/restaurantAPI'

const styles = {
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "5px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px"
    }
}
class AddingFood extends Component {
    state = {
        newFood: "",
        newCategory:"",
        condiments: [],
        id:"",
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    async componentDidMount() {

        /*  const response = await fetchRestaurantByRouteName(toString(this.props.match.params.routeName).toLowerCase);
          console.log(response.data);
          this.setState({ restaurant: response.data })*/
        const response1 = await fetchCondiments();
        const response = await fetchRestaurants();
        const chosenRestaurant=response.data.filter(restaurant => restaurant.email===this.props.email)
        // const chosenRestaurant=response.data.filter(restaurant => restaurant.routeName===this.props.match.params.routeName)
        this.setState({ condiments: response1.data })
        console.log(response.data)

    }
    handleClick =  () => {
        try{
            const restaurant=fetchRestaurantByEmail(this.props.email)
            
            const response= addCategory(this.state.id, this.state.newCategory);
            console.log(response)
            console.log(response.status);
        }
        catch(e){
            console.log(e)
        }
    }
    render() {
        console.log(this.props.email)
        return (
            <Fragment>
                <Paper style={styles.paper} elevation={1}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Naziv kategorije"
                            value={this.state.newCategory}
                            onChange={this.handleChange('newCategory')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-name"
                            label="Naziv hrane"
                            value={this.state.newFood}
                            onChange={this.handleChange('newFood')}
                            margin="normal"
                        />
                    </form>
                    <FormControl >
                        <InputLabel htmlFor="select-multiple-chip">Prilozi</InputLabel>
                        <Select
                            multiple
                            value={this.state.condiments}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div>
                                    {selected.map(value => (
                                        <Chip key={value.condimentId} label={value.name} />
                                    ))}
                                </div>
                            )}
                        >
                            {this.state.condiments.map(condiment => (
                                <MenuItem key={condiment.condimentId} value={condiment.name} >
                                    {condiment.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <div><Button variant='outlined' onClick={this.handleClick} > Dodaj hranu </Button></div>
                </Paper>
            </Fragment>
        );
    }
}
export default AddingFood;