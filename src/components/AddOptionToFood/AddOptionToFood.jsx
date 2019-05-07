import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { fetchFoodsByResraurantId } from '../../httpClient/foodAPI';
import { addOption } from '../../httpClient/optionAPI';
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
        width: "500px",
    },
}

class AddOptionToFood extends Component {
    state = {
        chosenFood: "",
        optionName: "",
        optionPrice: 0,
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
            const addNewOptionToFood = await addOption(food[0].foodId, this.state.optionName, this.state.optionPrice)

            this.setState({ chosenFood: "", optionName: "", optionPrice: 0 })
            if (addNewOptionToFood.status === 200) {
                this.setState({ statusMessage: "Uspješno ste dodali novu opciju hrani" })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { foods } = this.props
        const { chosenFood, optionName, optionPrice, statusMessage } = this.state
        return (
            <Fragment>
                <Paper style={styles.paper}>
                    <div>Dodaj opcije hrani</div>
                    <div>
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
                                    {foods !== undefined ?
                                        foods.map((food) => {
                                            return (
                                                <MenuItem value={food.name} key={food.foodId}>
                                                    {food.name}
                                                </MenuItem>
                                            );
                                        })
                                        :
                                        ""}
                                </Select>
                            </FormControl>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Naziv opcije"
                                    value={optionName}
                                    onChange={this.handleChange('optionName')}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Cijena"
                                    value={optionPrice}
                                    onChange={this.handleChange('optionPrice')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </div>

                    <div><Button variant='outlined' onClick={this.handleClick} > Sačuvaj </Button></div>
                    <StatusMessage> {statusMessage} </StatusMessage>
                </Paper>

            </Fragment>
        );
    }
}

export default AddOptionToFood; 