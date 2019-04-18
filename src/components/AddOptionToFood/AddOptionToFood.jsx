import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import { fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
import { addOption } from '../../httpClient/OptionAPI/optionAPI';

const styles = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "20px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px",
        align: "center",
    },
    formControl: {
        width: "500px",
    },
}

class AddOptionToFood extends Component {
    state = {
        chosenFood: "",
        optionName: "",
        optionPrice: 0,
        foods: [],
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            var restaurantId = this.props.id;
            var foodName = this.state.chosenFood;
            var foods = await fetchFoodsByResraurantId(restaurantId);
            const food = foods.data.filter(food => foodName === food.name);
            console.log(food[0])
            const addNewOptionToFood = await addOption(food[0].foodId, this.state.optionName, this.state.optionPrice)
            console.log(addNewOptionToFood)
        }
        catch (e) {
            console.log(e)
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== undefined) {
            var id = this.props.id;
            const response = await fetchCondimentsByRestaurantId(id);
            const foods = await fetchFoodsByResraurantId(id)

            this.setState({
                condiments: response.data,
                foods: foods.data,
            })
        }
    }
    render() {
        console.log(this.props.condiments)
        return (
            <Fragment>
                <Paper style={styles.paper}>
                    <div>Dodaj opcije hrani</div>
                    <div>
                        <form noValidate autoComplete="off">
                            <FormControl style={styles.formControl}>
                                <InputLabel htmlFor="age-simple">Hrana</InputLabel>
                                <Select
                                    value={this.state.chosenFood}
                                    onChange={this.handleChange("chosenFood")}
                                    inputProps={{
                                        name: 'food',
                                        id: 'age-simple',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.foods !== undefined ? this.state.foods.map((food) => {
                                        return (
                                            <MenuItem value={food.name} key={food.foodId}>{food.name}</MenuItem>
                                        );
                                    }) : <div>" Nema hrane za prikaz"</div>}
                                </Select>
                            </FormControl>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Naziv opcije"
                                    value={this.state.optionName}
                                    onChange={this.handleChange('optionName')}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Cijena"
                                    value={this.state.optionPrice}
                                    onChange={this.handleChange('optionPrice')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </div>

                    <div><Button variant='outlined' onClick={this.handleClick} > Sačuvaj </Button></div>
                </Paper>

            </Fragment>
        );
    }
}

export default AddOptionToFood; 