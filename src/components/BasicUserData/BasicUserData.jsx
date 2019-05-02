import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { updateRestaurant } from '../../httpClient/RestaurantAPI/restaurantAPI';
import { updateCustomer } from '../../httpClient/CustomerAPI/customerAPI';
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

class BasicUserData extends Component {
    state = {
        name: this.props.user !== undefined ? this.props.user.name : "",
        surname: (this.props.user !== undefined && this.props.role === "Customer") ? this.props.user.surname : "",
        workTime: (this.props.user !== undefined && this.props.role === "Restaurant") ? this.props.user.workTime : "",
        description: (this.props.user !== undefined && this.props.role === "Restaurant") ? this.props.user.description : "",
        statusMessage: "",
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            var id = this.props.id
            if (this.props.role === 'Restaurant') {
                const response = await updateRestaurant(this.state.name, this.state.description, this.state.workTime, this.props.id)
                if (response.status === 200) {
                    this.setState({ statusMessage: "Uspješno sačuvano!" })
                }
            }
            else {
                const response = await updateCustomer(id, this.state.name, this.state.surname)
                if (response.status === 200) {
                    this.setState({ statusMessage: "Uspješno sačuvano!" })
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { role } = this.props
        const { name, surname, workTime, description, statusMessage } = this.state
        return (
            <div style={styles.text}>

                {role === 'Restaurant' ?
                    <div>
                        <Paper style={styles.paper}>
                            <div>Izmjena osnovnih podataka o korisniku</div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    label="Ime"
                                    value={name}
                                    onChange={this.handleChange("name")}
                                    margin="normal"
                                />
                                <TextField
                                    label="Radno vrijeme"
                                    value={workTime}
                                    onChange={this.handleChange("workTime")}
                                    margin="normal"
                                />
                                <TextField
                                    label="Opis"
                                    value={description}
                                    onChange={this.handleChange("description")}
                                    margin="normal"
                                />
                            </form>
                            <div><Button variant="outlined" onClick={this.handleClick}> Sačuvaj </Button></div>
                            <StatusMessage>{statusMessage}</StatusMessage>
                        </Paper>

                    </div>
                    :

                    <div>
                        <Paper style={styles.paper}>
                            <div>Izmjena osnovnih podataka o korisniku</div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    required
                                    label="Ime"
                                    value={name}
                                    onChange={this.handleChange("name")}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    label="Prezime"
                                    value={surname}
                                    onChange={this.handleChange("surrname")}
                                    margin="normal"
                                />
                            </form>
                            <div><Button variant="outlined" onClick={this.handleClick}> Potvrdi </Button></div>
                            <StatusMessage> {statusMessage} </StatusMessage>
                        </Paper>
                    </div>}
            </div>
        );
    }
}

export default BasicUserData;