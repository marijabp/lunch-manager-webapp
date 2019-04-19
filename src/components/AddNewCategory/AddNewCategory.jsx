import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { addCategory } from '../../httpClient/CategoryAPI/categoryApi';

const styles = {
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "5px",
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
    handleClick = () => {
        try {
            var restaurantId = this.props.id;
            const response = addCategory(restaurantId, this.state.newCategory);

            this.props.pushCategory(this.state.newCategory);
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <Paper style={styles.paper}>
                <form noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label="Naziv kategorije"
                        value={this.state.newCategory}
                        onChange={this.handleChange('newCategory')}
                        margin="normal"
                    />
                </form>
                <div><Button variant='outlined' onClick={this.handleClick} > Dodaj novu kategoriju </Button></div>
            </Paper>
        );
    }
}

export default AddNewCategory;