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

const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover", //ili 100%
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        minHeight: "700px",
    },
    paper: {
        marginTop: "20px",
        padding: "5px",
        backgroundColor: "#DAAD86",
        maxWidth: "260px",
    }
}


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailLogIn: "",
            emailLogInErrorMessage: "",

            passwordLogIn: "",
            passwordLogInErrorMessage: "",


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



        }
    }


    handleChange = event => {
        this.setState({ role: event.target.value });
    };
    handleInputEmailLogIn = event => {
        this.setState({ emailLogIn: event.target.value });
    };
    handleInputPasswordLogIn = event => {
        this.setState({ passwordLogIn: event.target.value })
    }
    handleInputName = event => {
        this.setState({ name: event.target.value })
    }
    handleInputSurname = event => {
        this.setState({ surname: event.target.value })
    }
    handleInputEmail = event => {
        this.setState({ email: event.target.value })
    }
    handleInputPassword = event => {
        this.setState({ password: event.target.value })
    }
    handleInputPassword1 = event => {
        this.setState({ password1: event.target.value })
    }

    validation = () => {
        let valid = true;
        let nameErrorMessage = "";
        let surnameErrorMessage = "";
        let emailErrorMessage = "";
        let passwordErrorMessage = "";
        let password1ErrorMessage = "";
        let emailUnique = true;

        let users = JSON.parse(localStorage.getItem('users'))
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === this.state.email) {
                    emailUnique = false;
                }
            }
        }
        if (this.state.name === "") {
            nameErrorMessage = "input name";
            valid = false;
        }
        if (this.state.surname === "") {
            surnameErrorMessage = "empty surname";
            valid = false;
        }

        if (!(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) || !emailUnique) {
            emailErrorMessage = "invalid email";
            valid = false;
        }
        if (this.state.password.length < 6) {
            passwordErrorMessage = " too short ";
            valid = false;
        }

        if (this.state.password !== this.state.password1) {
            password1ErrorMessage = " don't match ";
            valid = false;
        }

        this.setState({ nameErrorMessage })
        this.setState({ surnameErrorMessage })
        this.setState({ emailErrorMessage })
        this.setState({ passwordErrorMessage })
        this.setState({ password1ErrorMessage })

        return valid;
    }
    handleClickRegister = () => {
        let users = JSON.parse(localStorage.getItem('users'))
        let valid = this.validation();
        if (valid) {
            if (!users) {
                users = [];
                localStorage.setItem("users", JSON.stringify(users));
            }

            const user = { role: this.state.role, email: this.state.email, password: this.state.password, name: this.state.name }
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users));
            this.props.changeRole(this.state.role);
            this.props.changeEmail(this.state.email);
            this.props.logIn();
        }
    }

    handleClickLogIn = () => {
        let users = JSON.parse(localStorage.getItem('users'))
        let valid = false;
        let emailLogInErrorMessage = "Input valid email";
        let role = "";

        let passwordLogInErrorMessage = "Wrong password";
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === this.state.emailLogIn && users[i].password === this.state.passwordLogIn) {
                    valid = true;
                    role = users[i].role;
                    emailLogInErrorMessage = "";
                    passwordLogInErrorMessage = "";
                }
                if (users[i].email === this.state.emailLogIn) {
                    emailLogInErrorMessage = "";
                }
                if (users[i].password === this.state.passwordLogIn) {
                    passwordLogInErrorMessage = "";
                }
            }
        }
        else {
            emailLogInErrorMessage = " Niste registrovani! "
            passwordLogInErrorMessage = ""
        }
        this.setState({ emailLogInErrorMessage })
        this.setState({ passwordLogInErrorMessage })
        if (valid) {
            this.props.logIn();
            this.props.changeEmail(this.state.emailLogIn)
            this.props.changeRole(role);
        }

    }

    render() {
        return (
            <div style={styles.main}>
                <div >
                    <Paper style={styles.paper} >
                        <div className="login">
                            <form autoComplete="off">
                                <TextField
                                    // id="standard-required"
                                    error={this.state.emailLogInErrorMessage !== ""}
                                    label="E-mail"
                                    value={this.state.emailLogIn}
                                    onChange={this.handleInputEmailLogIn}
                                    margin="normal"
                                />
                                <ErrorMessage> {this.state.emailLogInErrorMessage} </ErrorMessage>
                                <TextField
                                    // id="standard-password-input"
                                    error={this.state.passwordLogInErrorMessage !== ""}
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.passwordLogIn}
                                    onChange={this.handleInputPasswordLogIn}
                                />
                                <ErrorMessage> {this.state.passwordLogInErrorMessage}</ErrorMessage>
                                <div><Button onClick={this.handleClickLogIn}> Log in </Button></div>
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
                                        aria-label="Role"
                                        name="gender1"
                                        value={this.state.role}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value="User" control={<Radio color="primary" />} label="User" />
                                        <FormControlLabel value="Restaurant" control={<Radio color="primary" />} label="Restaurant" />
                                    </RadioGroup>
                                </FormControl>
                                <div>
                                    <TextField
                                        // id="standard-required"
                                        error={this.state.nameErrorMessage !== ""}
                                        label="Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                        margin="normal"
                                    />
                                    <ErrorMessage>{this.state.NameErrorMessage}</ErrorMessage>

                                    {this.state.role === "Restaurant" ? " " :
                                        <TextField
                                            // id="standard-required"
                                            error={this.state.surnameErrorMessage !== ""}
                                            label="Surname"
                                            value={this.state.surname}
                                            onChange={this.handleInputSurname}
                                            margin="normal"
                                        />}
                                    <ErrorMessage>{this.state.surnameErrorMessage}</ErrorMessage>
                                    <TextField
                                        // id="standard-required"
                                        label="E-mail"
                                        error={this.state.emailErrorMessage !== ""}
                                        value={this.state.email}
                                        onChange={this.handleInputEmail}
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
                                        onChange={this.handleInputPassword}
                                    />
                                    <ErrorMessage>{this.state.passwordErrorMessage}</ErrorMessage>
                                    <TextField
                                        // id="standard-password-input"
                                        error={this.state.password1ErrorMessage !== ""}
                                        label="Repeat password!"
                                        type="password"
                                        margin="normal"
                                        value={this.state.password1}
                                        onChange={this.handleInputPassword1}
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
