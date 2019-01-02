import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = {
    paper: {
        padding: "15px",
        maxWidth: "300px",
        maxHeight: "300px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        backgroundColor: "rgb(245, 245, 245)",
    },
    text: {
        fontFamily: "Verdana, Geneva, sans-serif",
    },

}

class Address extends Component {
    state = {
        address: "",
    }
    handleInputAddress = (event) => {
        this.setState({ address: event.target.value })
    }
    render() {
        return (

            <div style={styles.text}>
                <Paper style={styles.paper}>
                    <div>ADRESA</div>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Adresa"
                            value={this.state.address}
                            onChange={this.handleInputAddress}
                            margin="normal"
                        />
                    </form>
                    <div><Button variant="outlined"> Potvrdi </Button></div>
                </Paper>
            </div>
        );
    }
}

export default Address;