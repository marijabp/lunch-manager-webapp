import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { fetchCondimentsByRestaurantId, updateCondimentInfo, addCondiment } from '../../httpClient/CondimentAPI/condimentAPI';
import { addFood, fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';

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

class UpdateFoodAccessories extends Component {
    state = {
        chosenFood: "",
        chosenFood1:"",
        chosenCondiment: "",
        chosenOption: "",
        foods:[],
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick =async () => {
        try {
            var name = this.state.chosenCondiment;
            var restaurantId=this.props.id;
            var condiments=await fetchCondimentsByRestaurantId(restaurantId)
            const condiment = condiments.data.filter(condiment => condiment.name === name)
            console.log(condiment[0])

            var foodName =this.state.chosenFood;
            var foods=await fetchFoodsByResraurantId(restaurantId);
            const food= foods.data.filter(food => foodName===food.name);
            console.log(food[0])
            const updateCondiment=await addCondiment(food[0].foodId, restaurantId, this.state.chosenCondiment )
            console.log(updateCondiment)
        }
        catch (e) {
            console.log(e)
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== undefined) {
            var id = this.props.id;
            const response = await fetchCondimentsByRestaurantId(id);
            const foods= await fetchFoodsByResraurantId(id)

            this.setState({
                condiments:response.data,
                foods: foods.data,
            })
        }
    }
    render() {
        console.log(this.props.condiments)
        return (
            <Fragment>
            <Paper style={styles.paper}>
                <div>Dodaj priloge hrani</div>
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

                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="age-simple">Prilozi</InputLabel>
                            <Select
                                value={this.state.chosenCondiment}
                                onChange={this.handleChange("chosenCondiment")}
                                inputProps={{
                                    name: 'condiment',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.condiments !== undefined ? this.state.condiments.map((condiment) => {
                                    return (
                                        <MenuItem value={condiment.name} key={condiment.condimentId}>{condiment.name}</MenuItem>
                                    );
                                }) : <div>" Nema hrane za prikaz"</div>}
                            </Select>
                        </FormControl>
                    </form>
                </div>
                
                <div><Button variant='outlined' onClick={this.handleClick} > Sačuvaj </Button></div>
            </Paper>
            <Paper style={styles.paper}>
                <div>Dodaj opcije hrani</div>
                <div>
                    <form noValidate autoComplete="off">
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="age-simple">Hrana</InputLabel>
                            <Select
                                value={this.state.chosenFood1}
                                onChange={this.handleChange("chosenFood1")}
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

                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="age-simple">Prilozi</InputLabel>
                            <Select
                                value={this.state.chosenCondiment}
                                onChange={this.handleChange("chosenCondiment")}
                                inputProps={{
                                    name: 'condiment',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.condiments !== undefined ? this.state.condiments.map((condiment) => {
                                    return (
                                        <MenuItem value={condiment.name} key={condiment.condimentId}>{condiment.name}</MenuItem>
                                    );
                                }) : <div>" Nema hrane za prikaz"</div>}
                            </Select>
                        </FormControl>
                    </form>
                </div>
                
                <div><Button variant='outlined' onClick={this.handleClick} > Sačuvaj </Button></div>
            </Paper>

            </Fragment>
        );
    }
}

export default UpdateFoodAccessories; 