import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { addCondiment } from '../../httpClient/CondimentAPI/condimentAPI';


const styles= {
    paper: {
        marginTop: "20px" ,
        maxWidth: "510px",
        padding: "5px",
        backgroundColor:"rgb(245, 245, 245)",
        borderRadius: "10px"
    }
}
class AddingCondiment extends Component {
    state = {
        newCondiment: "",
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleClick =  () => {
        try{
            const response= addCondiment('5', this.state.newCondiment);
            console.log(response)
            console.log(response.status);
        }
        catch(e){
            console.log(e)
        }
    }
    render() {
        return (
            <Fragment>
                <Paper style={styles.paper} elevation={1}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Naziv priloga"
                            value={this.state.newCondiment}
                            onChange={this.handleChange('newCondiment')}
                            margin="normal"
                        />
                    </form>
                    <div><Button variant='outlined' onClick={this.handleClick} > Dodaj prilog </Button></div>
                </Paper>
            </Fragment>
        );
    }
}

export default AddingCondiment;