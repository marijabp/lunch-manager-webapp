import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { updateRestaurant } from '../../httpClient/RestaurantAPI/restaurantAPI';
import { updateCustomer, fetchCustomerById } from '../../httpClient/CustomerAPI/customerAPI';
import { fetchRestaurantById } from '../../httpClient/RestaurantAPI/restaurantAPI';

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

class BasicUserData extends Component {
    state = {
        name: this.props.user != undefined ? this.props.user.name : " ",
        surrname: (this.props.user != undefined && this.props.role == "Customer") ? this.props.user.surrname : " ",
        workTime: (this.props.user != undefined && this.props.role == "Restaurant") ? this.props.user.workTime : " ",
        description: (this.props.user != undefined && this.props.role == "Restaurant") ? this.props.user.description : " ",
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = async () => {
        try {
            if (this.props.role === 'Restaurant') {
                var name1 = this.state.name !== "" ? this.state.name : this.props.user.name
                var description1 = this.state.description !== "" ? this.state.description : this.props.user.description
                var workTime1 = this.state.workTime !== "" ? this.state.workTime : this.props.user.workTime
                var user = {
                    "name": name1,
                    "description": description1,
                    "workTime": workTime1,
                }
                this.props.changeData(user)
                const response = await updateRestaurant(this.state.name, this.state.description, this.state.workTime, this.props.id)
                console.log(response)
            }
            else {
                var name1 = this.state.name !== "" ? this.state.name : this.props.user.name
                var surrname1 = this.state.surrname !== "" ? this.state.surrname : this.props.user.surrname
                var user = {
                    "name": name1,
                    "surrname": surrname1,
                }
                this.props.changeData(user)
                const response = await updateCustomer(this.state.name, this.state.surrname, this.props.id)
                console.log(response)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { user, role } = this.props
        console.log(this.state.name)
        return (
            <div>


                {role === 'Restaurant' ?
                    <div>
                        <Paper style={styles.paper}>
                            <div>Izmjena osnovnih podataka o korisniku</div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    label="Ime"
                                    value={this.state.name}
                                    onChange={this.handleChange("name")}
                                    margin="normal"
                                />
                                <TextField
                                    label="Radno vrijeme"
                                    value={this.state.workTime}
                                    onChange={this.handleChange("workTime")}
                                    margin="normal"
                                />
                                <TextField
                                    label="Opis"
                                    value={this.state.description}
                                    onChange={this.handleChange("description")}
                                    margin="normal"
                                />
                            </form>
                            <div><Button variant="outlined" onClick={this.handleClick}> Potvrdi </Button></div>
                        </Paper>
                        Osnovni podaci o korisniku
                        <div>{user.name}</div>
                        <div>{user.workTime}</div>
                        <div>{user.description}</div>

                    </div>
                    :

                    <div>
                        <Paper style={styles.paper}>
                            <div>Izmjena osnovnih podataka o korisniku</div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    required
                                    label="Ime"
                                    value={this.state.name}
                                    onChange={this.handleChange("name")}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    label="Prezime"
                                    value={this.state.surrname}
                                    onChange={this.handleChange("surrname")}
                                    margin="normal"
                                />
                            </form>
                            <div><Button variant="outlined" onClick={this.handleClick}> Potvrdi </Button></div>
                        </Paper>
                        <div>
                            Osnovni podaci o korisniku
                             <div>{user.name}</div>
                            <div>{user.surrname}</div>
                            <div>{user.description}</div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default BasicUserData;