import React, { Component } from 'react';
import ErrorMessage from '../ErrorMessage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Authentication.css';
import Background from '../../images/authentication.jpg';
import { registration, login } from '../../httpClient/UserAPI/userAPI';
import { fetchRestaurantById } from '../../httpClient/RestaurantAPI/restaurantAPI';
import { fetchCustomerById } from '../../httpClient/CustomerAPI/customerAPI';


const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover", //ili 100%
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        minHeight: "800px",
        maxHeight: "900px",
    },
    paper: {
        marginTop: "20px",
        padding: "5px",
        backgroundColor: "#DAAD86",
        maxWidth: "230px",
    }
}


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            emailLogIn: "",
            emailLogInErrorMessage: "",

            passwordLogIn: "",
            loginErrorMessage: "",

            name: "",
            nameErrorMessage: "",

            surname: "",
            surnameErrorMessage: "",

            email: "",
            emailErrorMessage: "",

            password: "",
            passwordErrorMessage: "",

            password1: "",
            password1ErrorMessage: "",

            roleErrorMessage: "",
            role: "Customer"
        }
    }


    handleChange = event => {
        this.setState({ role: event.target.value });
    };
    handleChangeData = name => event => {
        this.setState({ [name]: event.target.value });
    };

    validation = () => {
        let valid = true;
        let nameErrorMessage = "";
        let surnameErrorMessage = "";
        let emailErrorMessage = "";
        let passwordErrorMessage = "";
        let password1ErrorMessage = "";
        let emailUnique = true;
        let roleErrorMessage = "";

        if (this.state.role === "") {
            roleErrorMessage = "Choose one role!";
            valid = false;

        }
        if (this.state.name === "") {
            nameErrorMessage = "Input a valid name";
            valid = false;
        }
        if (this.state.surname === "" && this.state.role === "Customer") {
            surnameErrorMessage = "Input a valid surname";
            valid = false;
        }

        if (!(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) || !emailUnique) {
            emailErrorMessage = "Input a valid email";
            valid = false;
        }
        if (this.state.password.length < 6) {
            passwordErrorMessage = "Password too short ";
            valid = false;
        }

        if (this.state.password !== this.state.password1) {
            password1ErrorMessage = "Passwords don't match ";
            valid = false;
        }

        this.setState({ nameErrorMessage, surnameErrorMessage, emailErrorMessage, password1ErrorMessage, passwordErrorMessage, roleErrorMessage })

        return valid;
    }

    handleClickRegister = async () => {
        let valid = this.validation();
        console.log(valid);

        if (valid) {
            this.props.changeRole(this.state.role);
            this.props.changeEmail(this.state.email);
            this.props.logIn();

            var user = {
                "role": this.state.role,
                "email": this.state.email,
                "password": this.state.password,
                "passwordConfirm": this.state.password1
            }
            const response = registration(user, this.state.name, this.state.surname);
            console.log(response);
        }
    }


    handleClickLogIn = async () => {
        let loginErrorMessage = "Input valid data";
        console.log("awaiting")
        try {
            //  const response = await login(this.state.emailLogIn, this.state.passwordLogIn);
              const response = await login("angelo@gmail.com", 123456);
            //const response = await login("m@gmail.com", 123456);
            if (response.status === 200) {
                this.props.logIn();
                this.props.changeEmail(this.state.emailLogIn)
                this.props.changeRole(response.data.role);
                this.props.changeId(response.data.id)
                if (response.data.role === 'Restaurant') {
                    var id = response.data.id;
                    const restaurant = await fetchRestaurantById(id)
                    this.props.changeData(restaurant.data)
                }
                else {
                    var id1 = response.data.id;
                    const customer = await fetchCustomerById(id1)
                    this.props.changeData(customer.data)
                }
                loginErrorMessage = "";
            }
        }
        catch (e) {
            console.log(e)
            this.setState({ loginErrorMessage: loginErrorMessage })
        }
    };


    render() {
        return (
            <div style={styles.main}>
                <div >
                    <Paper style={styles.paper} >
                        <div className="login">
                            <form autoComplete="off">
                                <TextField
                                    // id="standard-required"
                                    error={this.state.loginErrorMessage !== ""}
                                    label="E-mail"
                                    value={this.state.emailLogIn}
                                    onChange={this.handleChangeData("emailLogIn")}
                                    margin="normal"
                                />
                                <TextField
                                    // id="standard-password-input"
                                    error={this.state.loginErrorMessage !== ""}
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.passwordLogIn}
                                    onChange={this.handleChangeData("passwordLogIn")}
                                />
                                <div><Button onClick={this.handleClickLogIn}> Log in </Button></div>
                                <ErrorMessage> {this.state.loginErrorMessage}</ErrorMessage>
                            </form>
                        </div>
                    </Paper>
                </div>


                <div  >
                    <Paper style={styles.paper}>
                        <div className="register">
                            <form autoComplete="off">
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Role</FormLabel>
                                    <RadioGroup
                                        error={this.state.roleErrorMessage !== ""}
                                        aria-label="Role"
                                        name="gender1"
                                        value={this.state.role}
                                        onChange={this.handleChange}


                                    >
                                        <FormControlLabel value="Customer" control={<Radio color="primary" />} label="Customer" />
                                        <FormControlLabel value="Restaurant" control={<Radio color="primary" />} label="Restaurant" />
                                    </RadioGroup>
                                </FormControl>
                                <ErrorMessage>{this.state.roleErrorMessage}</ErrorMessage>
                                <div>
                                    <TextField
                                        // id="standard-required"
                                        error={this.state.nameErrorMessage !== ""}
                                        label="Name"
                                        value={this.state.name}
                                        onChange={this.handleChangeData("name")}
                                        margin="normal"
                                    />
                                    <ErrorMessage>{this.state.NameErrorMessage}</ErrorMessage>

                                    {this.state.role === "Restaurant" ? " " :
                                        <TextField
                                            // id="standard-required"
                                            error={this.state.surnameErrorMessage !== ""}
                                            label="Surname"
                                            value={this.state.surname}
                                            onChange={this.handleChangeData("surname")}
                                            margin="normal"
                                        />}
                                    <ErrorMessage>{this.state.surnameErrorMessage}</ErrorMessage>
                                    <TextField
                                        // id="standard-required"
                                        label="E-mail"
                                        error={this.state.emailErrorMessage !== ""}
                                        value={this.state.email}
                                        onChange={this.handleChangeData("email")}
                                        margin="normal"
                                    />
                                    <ErrorMessage>{this.state.emailErrorMessage}</ErrorMessage>
                                    <TextField
                                        // id="standard-password-input"
                                        error={this.state.passwordErrorMessage !== ""}
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        value={this.state.password}
                                        onChange={this.handleChangeData("password")}
                                    />
                                    <ErrorMessage>{this.state.passwordErrorMessage}</ErrorMessage>
                                    <TextField
                                        // id="standard-password-input"
                                        error={this.state.password1ErrorMessage !== ""}
                                        label="Repeat password!"
                                        type="password"
                                        margin="normal"
                                        value={this.state.password1}
                                        onChange={this.handleChangeData("password1")}
                                    />
                                    <ErrorMessage>{this.state.password1ErrorMessage} </ErrorMessage>
                                </div>
                                <div>
                                    <Button
                                        onClick={this.handleClickRegister}
                                        variant="outlined"
                                        color="primary">
                                        Register
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div >
        );
    }
}

export default Authentication
