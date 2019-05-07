import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchFoodsByResraurantId, deleteFood } from '../../httpClient/foodAPI';
import StatusMessage from '../StatusMessage';

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
        opacity: "0.8",
    },
    formControl: {
        maxWidth: "500px",
        minWidth: "200px",
    },
}

class DeleteFoodItem extends Component {
    state = {
        chosenFood: "",
        statusMessage: "",
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

            if (food[0] !== undefined) {
                var response = await deleteFood(food[0].foodId)

                if (response.status === 200) {
                    this.setState({ statusMessage: "Uspješno obrisano!" })
                }

                var index = this.props.foods.indexOf(foodName);
                if (index > -1) {
                    this.props.foods.splice(index, 1);
                }
            }
            this.props.handleDelete(food[0].foodId)
            this.setState({ chosenFood: "" })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        const { chosenFood, statusMessage } = this.state
        const { foods } = this.props
        return (

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
                                        <MenuItem value={food.name} key={food.foodId}> {food.name} </MenuItem>
                                    );
                                }) : <div>" Nema hrane za prikaz"</div>}
                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={this.handleClick}>Obriši</Button>
                        <StatusMessage> {statusMessage} </StatusMessage>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default DeleteFoodItem;