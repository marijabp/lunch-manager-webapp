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
import StatusMessage from '../StatusMessage';


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
        borderRadius: "10px",
    }
}


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            logInEmail: "",
            logInEmailErrorMessage: "",

            logInPassword: "",
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
            role: "",

            statusMessage: "",
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
            roleErrorMessage = "Izaberite jednu ulogu!";
            valid = false;

        }
        if (this.state.name === "") {
            nameErrorMessage = "Unesite validno ime!";
            valid = false;
        }
        if (this.state.surname === "" && this.state.role === "Customer") {
            surnameErrorMessage = "Unesite validno prezime!";
            valid = false;
        }

        if (!(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) || !emailUnique) {
            emailErrorMessage = "Unesite validan email!";
            valid = false;
        }
        if (this.state.password.length < 6) {
            passwordErrorMessage = "Lozinka je prekratka!";
            valid = false;
        }

        if (this.state.password !== this.state.password1) {
            password1ErrorMessage = "Lozinke nisu iste!";
            valid = false;
        }

        this.setState({ nameErrorMessage, surnameErrorMessage, emailErrorMessage, password1ErrorMessage, passwordErrorMessage, roleErrorMessage })

        return valid;
    }

    handleClickRegister = async () => {
        let valid = this.validation();

        if (valid) {
            //  this.props.changeRole(this.state.role);
            //  this.props.changeEmail(this.state.email);
            //  this.props.logIn();

            var user = {
                "role": this.state.role,
                "email": this.state.email,
                "password": this.state.password,
                "passwordConfirm": this.state.password1,
            }
            const response = await registration(user, this.state.name, this.state.surname);
            console.log(response.status)
            if (response.status === 200) {
                this.setState({ statusMessage: "Uspješna registracija! Ulogujte se!" })
            }
        }
    }


    handleClickLogIn = async () => {
        let loginErrorMessage = "Input valid data";
        console.log("awaiting")
        try {
            const response = await login(this.state.logInEmail, this.state.logInPassword);
            //const response = await login("angelo@gmail.com", 1234567);
            //  const response = await login("marija@gmail.com", 123456);
            console.log(response)
            if (response.status === 200) {
                var userId = response.data.id
                this.props.logIn();
                this.props.changeEmail(this.state.logInEmail)
                this.props.changeRole(response.data.role);
                this.props.changeId(userId)
                if (response.data.role === 'Restaurant') {
                    const restaurant = await fetchRestaurantById(userId)
                    this.props.changeData(restaurant.data)
                }
                else {
                    const customer = await fetchCustomerById(userId)
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
        console.log(this.state.statusMessage)
        const { loginErrorMessage, logInEmail, logInPassword, roleErrorMessage, role, nameErrorMessage, name, surnameErrorMessage,
            surname, emailErrorMessage, email, passwordErrorMessage, password, password1ErrorMessage, password1, statusMessage } = this.state
        return (
            <div style={styles.main}>
                <div >
                    <Paper style={styles.paper} >
                        <div className="login">
                            <form autoComplete="off">
                                <TextField
                                    error={loginErrorMessage !== ""}
                                    label="E-mail"
                                    value={logInEmail}
                                    onChange={this.handleChangeData("logInEmail")}
                                    margin="normal"
                                />
                                <TextField
                                    error={loginErrorMessage !== ""}
                                    label="Lozinka"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={logInPassword}
                                    onChange={this.handleChangeData("logInPassword")}
                                />
                                <div>
                                    <Button
                                        onClick={this.handleClickLogIn}
                                        variant="outlined"
                                        color="primary">
                                        Log in
                                    </Button>
                                </div>
                                <ErrorMessage> {loginErrorMessage}</ErrorMessage>
                            </form>
                        </div>
                    </Paper>
                </div>

                <div>
                    <Paper style={styles.paper}>

                        <div className="register">
                            <form autoComplete="off">
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Role</FormLabel>
                                    <RadioGroup
                                        error={roleErrorMessage}
                                        aria-label="Uloga"
                                        name="gender1"
                                        value={role}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value="Customer" control={<Radio color="primary" />} label="Kupac" />
                                        <FormControlLabel value="Restaurant" control={<Radio color="primary" />} label="Restoran" />
                                    </RadioGroup>
                                </FormControl>
                                <ErrorMessage>{roleErrorMessage}</ErrorMessage>
                                <div>
                                    <TextField
                                        error={nameErrorMessage !== ""}
                                        label="Ime"
                                        value={name}
                                        onChange={this.handleChangeData("name")}
                                        margin="normal"
                                    />
                                    <ErrorMessage>{nameErrorMessage}</ErrorMessage>

                                    {role === "Restaurant" ? " " :
                                        <TextField
                                            error={surnameErrorMessage !== ""}
                                            label="Prezime"
                                            value={surname}
                                            onChange={this.handleChangeData("surname")}
                                            margin="normal"
                                        />}
                                    <ErrorMessage>{surnameErrorMessage}</ErrorMessage>
                                    <TextField
                                        label="E-mail"
                                        error={emailErrorMessage !== ""}
                                        value={email}
                                        onChange={this.handleChangeData("email")}
                                        margin="normal"
                                    />
                                    <ErrorMessage>{emailErrorMessage}</ErrorMessage>
                                    <TextField
                                        error={passwordErrorMessage !== ""}
                                        label="Lozinka"
                                        type="password"
                                        margin="normal"
                                        value={password}
                                        onChange={this.handleChangeData("password")}
                                    />
                                    <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
                                    <TextField
                                        error={password1ErrorMessage !== ""}
                                        label="Ponovo unesite lozinku"
                                        type="password"
                                        margin="normal"
                                        value={password1}
                                        onChange={this.handleChangeData("password1")}
                                    />
                                    <ErrorMessage>{password1ErrorMessage} </ErrorMessage>
                                </div>
                                <div>
                                    <Button
                                        onClick={this.handleClickRegister}
                                        variant="outlined"
                                        color="primary">
                                        Register
                                    </Button>
                                    <StatusMessage> {statusMessage} </StatusMessage>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div >
        );
    }
}

export default Authentication;