import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { addCategory, fetchCategoriesByRestaurantId } from '../../httpClient/categoryApi';
import StatusMessage from '../StatusMessage';

const styles = {
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "10px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px",
        minWidth: "300px",
        opacity: "0.8",
    },
}

class AddNewCategory extends Component {
    state = {
        newCategory: "",
        statusMessage: "",
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleClick = async () => {
        try {
            var restaurantId = this.props.id;

            const response = await addCategory(restaurantId, this.state.newCategory);

            const lastCategory = await fetchCategoriesByRestaurantId(restaurantId)
            const categ = lastCategory.data.filter(category => this.state.newCategory === category.name);
            var category = {
                "categoryId": categ[0].categoryId,
                "restaurantId": restaurantId,
                "name": this.state.newCategory,
            }
            this.props.pushCategory(category);
            this.setState({ newCategory: "" })
            if (response.status === 200) {
                this.setState({ statusMessage: "Uspješno ste dodali novu kategoriju" })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { newCategory, statusMessage } = this.state
        return (
            <Paper style={styles.paper}>
                <div>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Naziv kategorije"
                            value={newCategory}
                            onChange={this.handleChange('newCategory')}

                        />
                    </form>
                </div>
                <div>
                    <Button variant='outlined' onClick={this.handleClick} > Dodaj novu kategoriju </Button>
                    <StatusMessage>{statusMessage}</StatusMessage>

                </div>
            </Paper>

        );
    }
}

export default AddNewCategory;