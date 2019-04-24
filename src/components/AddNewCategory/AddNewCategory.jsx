import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { addCategory, fetchCategoriesByRestaurantId } from '../../httpClient/CategoryAPI/categoryApi';

const styles = {
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "5px",
        marginLeft:"90px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px"
    }
}

class AddNewCategory extends Component {
    state = {
        newCategory: "",
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleClick = async () => {
        try {
            var restaurantId = this.props.id;
            const response = await addCategory(restaurantId, this.state.newCategory);
            const lastCategory = await fetchCategoriesByRestaurantId(this.props.id)
            const categ = lastCategory.data.filter(category => this.state.newCategory === category.name);
            var category = {
                "categoryId": categ[0].categoryId,
                "restaurantId": restaurantId,
                "name": this.state.newCategory,
            }
            this.props.pushCategory(category);
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div>
                <Paper style={styles.paper}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Naziv kategorije"
                            value={this.state.newCategory}
                            onChange={this.handleChange('newCategory')}
                            
                        />
                    </form>
                    <div><Button variant='outlined' onClick={this.handleClick} > Dodaj novu kategoriju </Button></div>
                </Paper>
            </div>
        );
    }
}

export default AddNewCategory;