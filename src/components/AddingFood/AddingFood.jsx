import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { addFood, fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
import { addOption } from '../../httpClient/OptionAPI/optionAPI';
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

class AddingFood extends Component {
    state = {
        foodName: "",
        newCategory: "",
        foodDescription: "",
        foodPrice: 0,
        statusMessage: "",
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            var restaurantId = this.props.id;
            var foodName = this.state.foodName;

            var categoryName = this.state.newCategory;
            const category = this.props.categories.filter(category => category.name === categoryName)
            var categoryId = category[0].categoryId;

            const addNewFood = await addFood(categoryId, foodName, this.state.foodDescription)

            var foods = await fetchFoodsByResraurantId(restaurantId);
            const food = foods.data.filter(food => foodName === food.name);
            const addNewOption = await addOption(food[0].foodId, "Standard", this.state.foodPrice)
     
            var newFoodItem = {
                "foodId": food[0].foodId,
                "categoryId": categoryId,
                "name": this.state.foodName,
                "description": this.state.foodDescription,
            }

            this.props.pushFood(newFoodItem)

            this.setState({ foodName: "", foodDescription: "", newCategory: "", foodPrice: 0 })
            if (addNewFood.status === 200 && addNewOption.status === 200) {
                this.setState({ statusMessage: "Uspješno ste dodali hranu!" })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        const { newCategory, foodName, foodDescription, foodPrice, statusMessage } = this.state
        const { categories } = this.props
        return (
            <Fragment>
                <div style={styles.main}>
                    <Paper style={styles.paper}>
                        <div>Dodaj novu hranu</div>
                        <div>
                            <form noValidate autoComplete="off">
                                <FormControl style={styles.formControl}>
                                    <InputLabel htmlFor="age-simple">Kategorije hrane</InputLabel>
                                    <Select
                                        value={newCategory}
                                        onChange={this.handleChange("newCategory")}
                                        inputProps={{
                                            name: 'cateogry',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {categories !== undefined ?
                                            categories.map((category) => {
                                                return (
                                                    <MenuItem value={category.name} key={category.categoryId}>
                                                        {category.name}
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
                                        label="Naziv hrane"
                                        value={foodName}
                                        onChange={this.handleChange('foodName')}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Opis hrane"
                                        value={foodDescription}
                                        onChange={this.handleChange('foodDescription')}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Minimalna cijena hrane"
                                        value={foodPrice}
                                        onChange={this.handleChange('foodPrice')}
                                        margin="normal"
                                    />
                                </div>
                            </form>
                        </div>

                        <div><Button variant='outlined' onClick={this.handleClick} > Dodaj hranu </Button></div>
                        <StatusMessage>{statusMessage}</StatusMessage>
                    </Paper>
                </div>
            </Fragment>
        );
    }
}
export default AddingFood;