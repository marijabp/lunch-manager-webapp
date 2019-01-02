import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../ErrorMessage';
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

class ChangePassword extends Component {
    state = {
        oldPass: "",
        oldPassErrorMessage: "",

        newPass: "",
        newPassErrorMessage: "",

        newPass1: "",
        newPass1ErrorMessage: "",
    }
    handleInputOldPass = (event) => {
        this.setState({ oldPass: event.target.value })
    };
    handleInputNewPass = (event) => {
        this.setState({ newPass: event.target.value })
    };
    handleInputNewPass1 = (event) => {
        this.setState({ newPass1: event.target.value })
    }
    passwordValidation = () => {
        let valid = true;
        let email = this.props.emailLogIn;
        let oldPassErrorMessage = "";
        let newPass = this.state.newPass;
        let newPassErrorMessage = "";
        let newPass1 = this.state.newPass1;
        let newPass1ErrorMessage = "";
        let users = JSON.parse(localStorage.getItem('users'))
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email && this.state.oldPass !== users[i].password) {

                    valid = false;
                    oldPassErrorMessage = "Unijeli ste pogrešnu lozinku"
                }
            }
        }
        if (newPass.length < 6) {
            valid = false;
            newPassErrorMessage = "Nova lozinka je prekratka.";
        }
        if (newPass !== newPass1) {
            valid = false;
            newPass1ErrorMessage = "Lozinke nisu iste."
        }
        this.setState({ oldPassErrorMessage, newPassErrorMessage, newPass1ErrorMessage })
        return valid;
    }
    handleSubmit = () => {
        let valid = this.passwordValidation();
        let oldPass = this.state.oldPass
        let users = JSON.parse(localStorage.getItem('users'))
        let email = this.props.emailLogIn;
        if (valid) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    this.setState({ oldPass: this.state.newPass })
                    localStorage.setItem(oldPass, this.state.newPass)
                }
            }
        }
    }
    render() {
        return (
            <div style={styles.text}>
                <Paper style={styles.paper}>
                    <div>PROMJENA LOZINKE</div>
                    <form noValidate autoComplete="off">
                        <TextField
                            required
                            error={this.state.oldPassErrorMessage !== ""}
                            label="Unesite trenutnu lozinku"
                            value={this.state.oldPass}
                            onChange={this.handleInputOldPass}
                            margin="normal"
                        />
                        <ErrorMessage>{this.state.oldPassErrorMessage}</ErrorMessage>
                        <TextField
                            required
                            error={this.state.newPassErrorMessage !== ""}
                            label="Unesite novu lozinku"
                            value={this.state.newPass}
                            margin="normal"

                            onChange={this.handleInputNewPass}
                        />
                        <ErrorMessage> {this.state.newPassErrorMessage}</ErrorMessage>
                        <TextField
                            required
                            error={this.state.newPass1ErrorMessage !== ""}
                            label="Ponovite unos"
                            value={this.state.newPass1}
                            margin="normal"
                            onChange={this.handleInputNewPass1}
                        />
                        <ErrorMessage>{this.state.newPass1ErrorMessage}</ErrorMessage>
                    </form>
                    <div><Button variant="outlined" onClick={this.handleSubmit}> Potvrdi </Button></div>
                </Paper>
            </div>
        );
    }
}

export default ChangePassword;