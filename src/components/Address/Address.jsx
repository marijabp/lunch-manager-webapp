import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { addAddress, updateAddress, fetchAddresses } from '../../httpClient/AddressAPI/addressAPI';
import StatusMessage from '../StatusMessage';


const styles = {
    paper: {
        padding: "15px",
        maxWidth: "300px",
        maxHeight: "300px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px",
        opacity: "0.8",
    },
    text: {
        fontFamily: "Verdana, Geneva, sans-serif",
    },

}

class Address extends Component {
    state = {
        addressName: (this.props.user.address !== undefined && this.props.user.address.length > 0) ? this.props.user.address[0].name : "",
        number: (this.props.user.address !== undefined && this.props.user.address.length > 0) ? this.props.user.address[0].number : "",
        city: (this.props.user.address !== undefined && this.props.user.address.length > 0) ? this.props.user.address[0].city : "",
        statusMessage: "",
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            var id = this.props.id;
            const response = await fetchAddresses()
            const addresses = response.data
            const address = addresses.filter(address => address.userId === id)

            if (address.length === 0) {
                const response1 = await addAddress(id, this.state.addressName, this.state.number, this.state.city)
                if (response1.status === 200) {
                    this.setState({ statusMessage: "Uspješno sačuvano!" })
                }
            }
            else {
                const response1 = await updateAddress(address[0].id, id, this.state.addressName, this.state.number, this.state.city)
                if (response1.status === 200) {
                    this.setState({ statusMessage: "Uspješno sačuvano!" })
                }
            }
            this.props.changeAddress(this.state.addressName+", "+this.state.number+", "+this.state.city)
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { addressName, number, city, statusMessage } = this.state
        return (

            <div style={styles.text}>
                <Paper style={styles.paper}>
                    <div>ADRESA</div>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Naziv adrese"
                            value={addressName}
                            onChange={this.handleChange("addressName")}
                            margin="normal"
                        />
                        <TextField
                            label="Broj"
                            value={number}
                            onChange={this.handleChange("number")}
                            margin="normal"
                        />
                        <TextField
                            label="Grad"
                            value={city}
                            onChange={this.handleChange("city")}
                            margin="normal"
                        />
                    </form>
                    <div><Button variant="outlined" onClick={this.handleClick}> Sačuvaj </Button></div>
                    <StatusMessage> {statusMessage} </StatusMessage>
                </Paper>
            </div>
        );
    }
}

export default Address;