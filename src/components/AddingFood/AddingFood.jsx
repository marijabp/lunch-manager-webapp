import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import AddingCondiment from '../AddNewCondiment';
import { fetchCategoryByName } from '../../httpClient/CategoryAPI/categoryApi';
import { addFood, fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
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

class AddingFood extends Component {
    state = {
        foodName: "",
        newCategory: "",
        foodDescription: "",
        foodPrice:0,
        condiments: [],
        chosenCondiments: [],
        foods:[],
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick =async () => {
        try {
            var restaurantId=this.props.id;
            var name = this.state.newCategory;
            const category = this.props.categories.filter(category => category.name === name)
            var categoryId = category[0].categoryId;
            const response =await addFood(categoryId, this.state.foodName, this.state.foodDescription)
            console.log(response)
            var foodName =this.state.foodName;
            var foods=await fetchFoodsByResraurantId(restaurantId);
            const food= foods.data.filter(food => foodName===food.name);
            console.log(food[0])
            const addNewOption=await addOption(food[0].foodId, "", this.state.foodPrice)
            console.log(addNewOption)
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
                condiments: response.data,
                foods: foods.data,
            })
        }
    }

    render() {
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
                                        value={this.state.newCategory}
                                        onChange={this.handleChange("newCategory")}
                                        inputProps={{
                                            name: 'cateogry',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.props.categories !== undefined ? this.props.categories.map((category) => {
                                            return (
                                                <MenuItem value={category.name} key={category.categoryId}>{category.name}</MenuItem>
                                            );
                                        }) : <div>" Nema kategorija za prikaz"</div>}
                                    </Select>
                                </FormControl>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Naziv hrane"
                                        value={this.state.foodName}
                                        onChange={this.handleChange('foodName')}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Opis hrane"
                                        value={this.state.foodDescription}
                                        onChange={this.handleChange('foodDescription')}
                                        margin="normal"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="standard-name"
                                        label="Minimalna cijena hrane"
                                        value={this.state.foodPrice}
                                        onChange={this.handleChange('foodPrice')}
                                        margin="normal"
                                    />
                                </div>
                            </form>
                        </div>
                       
                        <div><Button variant='outlined' onClick={this.handleClick} > Dodaj hranu </Button></div>
                    </Paper>
                </div>
            </Fragment>
        );
    }
}
export default AddingFood;