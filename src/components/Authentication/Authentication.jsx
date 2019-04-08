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
import {registration, login} from '../../httpClient/UserAPI/userAPI';


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

            roleErrorMessage:"",
            role: "Customer"
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

 /*   handleChange = (key, value) => {
        this.setState({ [key]: value })
    }*/

    validation = () => {
        let valid = true;
        let nameErrorMessage = "";
        let surnameErrorMessage = "";
        let emailErrorMessage = "";
        let passwordErrorMessage = "";
        let password1ErrorMessage = "";
        let emailUnique = true;
        let roleErrorMessage="";

      /*  let users = JSON.parse(localStorage.getItem('users'))
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === this.state.email) {
                    emailUnique = false;
                }
            }
        }*/
        if(this.state.role===""){
            roleErrorMessage="Choose one role!";
            valid=false;

        }
        if (this.state.name === "") {
            nameErrorMessage = "Input a valid name";
            valid = false;
        }
        if (this.state.surname === "" && this.state.role==="Customer") {
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
    handleClickRegister = () => {
      //  let users = JSON.parse(localStorage.getItem('users'))
        let valid = this.validation();
        console.log(valid);
        if (valid) {
         /*   if (!users) {
                users = [];
                localStorage.setItem("users", JSON.stringify(users));
            }

            const user = { role: this.state.role, email: this.state.email, password: this.state.password, name: this.state.name }
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users));*/
            
            this.props.changeRole(this.state.role);
            this.props.changeEmail(this.state.email);
            this.props.logIn();

          /*  API.post('/registration', { 
                "user":
                {"role": this.state.role,
                    "email": this.state.email,
                    "password": this.state.password,
                    "passwordConfirm":this.state.password1
                    
                },
                    
                    "name": this.state.name,
                    "surrname": this.state.surname
             })
             .then(response => { 
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });*/
           var user1={
                "role": this.state.role,
                "email": this.state.email,
                "password": this.state.password,
                "passwordConfirm": this.state.password1, 
            
                "name": this.state.name,
                "surname": this.state.surname
            }
            const  response = registration(user1);
            console.log(response);
            
        }

       

    }

    handleClickLogIn =async () => {
      //  let users = JSON.parse(localStorage.getItem('users'))
       // let valid = false;
       // let emailLogInErrorMessage = "Input valid email";
        //let role = "";
        let loginErrorMessage = "Input valid data";

      /*  if (users) {
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
        }*/

        console.log("awaiting")
       
        try {
            const response =await login(this.state.emailLogIn, this.state.passwordLogIn); 
            console.log(response)
            console.log(response.status);
            console.log(response.data.role)

            if (response.status===200 ) {
                this.props.logIn();
                this.props.changeEmail(this.state.emailLogIn)
                this.props.changeRole(response.data.role);
                loginErrorMessage="";
               /* API.post('/login', 
                { 
                    "email": this.state.emailLogIn,
                    "password": this.state.passwordLogIn
                 })
                 .then(response => { 
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });*/
            }
        }
        catch(e) {
            console.log(e)
            this.setState({loginErrorMessage: "wrong email/pass"})
        }
      
        // else{
        //     console.log("Input valid data!");
        //     loginErrorMessage= "Input a valid data!";
        // }
        
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
                                    onChange={this.handleInputEmailLogIn}
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
                                    onChange={this.handleInputPasswordLogIn}
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
                                        <FormControlLabel value="Customer" control={<Radio color="primary" />} label="Customer"  />
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
