import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import { fetchFoodsByResraurantId, deleteFood } from '../../httpClient/FoodAPI/foodAPI';

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
        maxWidth: "500px",
        minWidth: "200px",
    },
}

class DeleteFoodItem extends Component {
    state = {
        chosenFood: "",
        newCategory: "",
        foodDescription: "",
        condimentName: "",
        foodPrice: 0,
        condiments: [],
        options: [],
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
            if (food[0] !== undefined) {
                var response = await deleteFood(food[0].foodId)
                console.log(response)
                this.setState({ chosenFood: "" })
                var index = this.state.foods.indexOf(foodName);
                if (index > -1) {
                    this.state.foods.splice(index, 1);
                }
            }
            this.props.handleDelete(food[0].foodId)
        }
        catch (e) {
            console.log(e)
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.id !== undefined) {
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
        const { chosenFood } = this.state
        const { foods } = this.props
        return (

            <Fragment>
                <div style={styles.main}>
                    <Paper style={styles.paper}>
                        <div>Obriši hranu</div>
                        <form noValidate autoComplete="off">
                            <FormControl style={styles.formControl}>
                                <InputLabel htmlFor="age-simple">Hrana</InputLabel>
                                <Select
                                    value={chosenFood}
                                    onChange={this.handleChange("chosenFood")}
                                    inputProps={{
                                        name: 'food',
                                        id: 'age-simple',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {foods !== undefined ? foods.map((food) => {
                                        return (
                                            <MenuItem value={food.name} key={food.foodId}>{food.name}</MenuItem>
                                        );
                                    }) : <div>" Nema hrane za prikaz"</div>}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" onClick={this.handleClick}>Obriši</Button>
                        </form>
                    </Paper>
                </div>
            </Fragment>
        );
    }
}

export default DeleteFoodItem;