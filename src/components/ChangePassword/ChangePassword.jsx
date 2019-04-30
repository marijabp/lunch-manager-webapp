import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../ErrorMessage';
import Paper from '@material-ui/core/Paper';
import { changePassword, fetchUserById } from '../../httpClient/UserAPI/userAPI';
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

class ChangePassword extends Component {
    state = {
        oldPass: "",

        newPass: "",
        newPassErrorMessage: "",

        newPass1: "",
        newPass1ErrorMessage: "",

        errorMessage: "",
        statusMessage: "",
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
        let newPass = this.state.newPass;
        let newPassErrorMessage = "";
        let newPass1 = this.state.newPass1;
        let newPass1ErrorMessage = "";

        if (newPass.length < 6) {
            valid = false;
            newPassErrorMessage = "Nova lozinka je prekratka.";
        }
        if (newPass !== newPass1) {
            valid = false;
            newPass1ErrorMessage = "Lozinke nisu iste."
        }
        this.setState({ newPassErrorMessage, newPass1ErrorMessage })
        return valid;
    }
    handleSubmit = async () => {
        var id = this.props.id
        const user = await fetchUserById(id)
        const response = await changePassword(id, this.props.role, user.email, this.state.oldPass, this.state.newPass)
        if (response.status === 200 && this.passwordValidation()) {
            this.setState({ statusMessage: "Uspješna promjena lozinke!" })
        }
        else {
            this.setState({ errorMessage: "Unesite validne podatke!" })
        }
    }
    render() {
        const { statusMessage, errorMessage, oldPass, newPassErrorMessage, newPass,
                 newPass1ErrorMessage, newPass1 } = this.state
        return (
            <div style={styles.text}>
                <Paper style={styles.paper}>
                    <div>PROMJENA LOZINKE</div>
                    <form noValidate autoComplete="off">
                        <TextField
                            required
                            error={errorMessage !== ""}
                            label="Unesite trenutnu lozinku"
                            value={oldPass}
                            onChange={this.handleInputOldPass}
                            margin="normal"
                        />
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                        <TextField
                            required
                            error={newPassErrorMessage !== ""}
                            label="Unesite novu lozinku"
                            value={newPass}
                            margin="normal"

                            onChange={this.handleInputNewPass}
                        />
                        <ErrorMessage> {newPassErrorMessage} </ErrorMessage>
                        <TextField
                            required
                            error={newPass1ErrorMessage !== ""}
                            label="Ponovite unos"
                            value={newPass1}
                            margin="normal"
                            onChange={this.handleInputNewPass1}
                        />
                        <ErrorMessage>{newPass1ErrorMessage}</ErrorMessage>
                    </form>
                    <div><Button variant="outlined" onClick={this.handleSubmit}> Potvrdi </Button></div>
                    <ErrorMessage> {errorMessage} </ErrorMessage>
                    <StatusMessage> {statusMessage} </StatusMessage>
                </Paper>
            </div>
        );
    }
}

export default ChangePassword;