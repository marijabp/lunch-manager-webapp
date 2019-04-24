import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { addAddress } from '../../httpClient/AddressAPI/addressAPI';

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
        addressName: this.props.user!= undefined ? this.props.user.address : " ",
        number: "",
        city:"",
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            var id = this.props.id;
            const response = await addAddress( id, this.state.addressName, this.state.number, this.state.city )
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.props.user)
        console.log(this.props.id)
        return (

            <div style={styles.text}>
                <Paper style={styles.paper}>
                    <div>ADRESA</div>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Naziv adrese"
                            value={this.state.addressName}
                            onChange={this.handleChange("addressName")}
                            margin="normal"
                        />
                        <TextField
                            label="Broj"
                            value={this.state.number}
                            onChange={this.handleChange("number")}
                            margin="normal"
                        />
                        <TextField
                            label="Grad"
                            value={this.state.city}
                            onChange={this.handleChange("city")}
                            margin="normal"
                        />
                    </form>
                    <div><Button variant="outlined" onClick={this.handleClick}> Potvrdi </Button></div>
                </Paper>
            </div>
        );
    }
}

export default Address;