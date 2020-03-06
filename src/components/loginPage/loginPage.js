import React from 'react';
import './loginPage.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import gmailIcon from '../../images/googleIcon.png';
import facebookIcon from '../../images/facebookIcon.png';
import SweetAlert from 'sweetalert2-react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';



//function to validate the errors length in the form error state
const formValid = ({formErrors, ...rest }) => {
    let valid = true;

    //validate the formErrors length-if there is an error text don't submit
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    //validate the formInput's values length-if there is an empty input don't submit
    Object.values(rest).forEach(value => {
        value == null && (valid = false)
    });
    console.log(valid);
    return valid;
}

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            formErrors: {
                username: "",
                email: "",
                password: ""
            },
            show: false
        }
    }


    //submit function to handle the data after the user submit the form
    handleSubmit = e => {
        e.preventDefault();


        if(formValid(this.state)){
            console.log(`
                --Submitting--
                email: ${this.state.username}
                passwod: ${this.state.password}
            `)
        }else{
            console.error("form invalid - display", this.state.show);
        }
    }

    //function to handle and store the data while being entered
    handleChange = e => {
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case "username":
                formErrors.username = value.length < 3 
                    ? "the username length must be at least 3" 
                    : "";
                    break;
            case "password":
                formErrors.password = value.length < 6 
                    ? "the password length must be at least 6" 
                    : "";
                    break;
            default:
                break;       
        }
        //store the data in the state
        this.setState({formErrors, [name] : value}, () => {
            console.log(this.state);
        })
    }

    render(){
        const {formErrors} = this.state; //storing the form errors array state in this variable to use it later

        return(
            <div className = "loginPage-container-Tm">
                <form className = "loginPage-loginSection-Tm" >
                    <h2 className = "loginPage-title-Tm">Login</h2>
                    <Grid item xs={12} className = "loginPage-username-Tm" /*material-ui*/ >
                                <TextField  //username field
                                    id="input-with-icon-textfield"
                                    label="username"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color = "primary"/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    onChange = {this.handleChange}
                                    name = "username"
                                    fullWidth
                                    onChange = {this.handleChange}
                                />
                                {
                                    formErrors.username.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.username}</span>
                                    )
                                }
                            </Grid>
                            <Grid item xs={12} className = "signUpForm-password-Tm" /*material-ui*/ >
                                <TextField /*password field*/
                                    id="input-with-icon-textfield"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name = "password"
                                    fullWidth
                                    onChange = {this.handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <LockIcon color = "primary"/>
                                            </InputAdornment>
                                        ),
                                        }}
                                />
                                {
                                    formErrors.password.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.password}</span>
                                    )
                                }
                            </Grid>
                            <Grid item xs = {12} /*material-ui*/ >
                                {
                                <Link className = "loginPage-loginLink-Tm" to = "#">
                                    <Button // login button
                                        type = "submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className = "loginPage-loginButton-Tm"
                                        onClick = {(e) => { 
                                            
                                            formValid(this.state) ?
                                            this.setState({ show: false }) :
                                            this.setState({ show: true })
                                            this.handleSubmit(e)
                                        }} 
                                    >
                                    Log in
                                    </Button>
                                </Link>
                                }
                            </Grid>
                            <hr className = "loginPage-hr-Tm" data-content="OR"></hr>         
                            <div className = "loginPage-createUsingBlock-Tm">
                                <div className = "loginPage-iconsBlock-Tm">
                                    <Link>
                                        <img src={facebookIcon} className = "loginPage-Facebook-Tm" />
                                     </Link>
                                    <Link>
                                        <img src={gmailIcon}  className = "loginPage-gmail-Tm" alt="gmail"/>
                                    </Link>
                                </div>
                            </div>
                            <div className = "loginPage-message-Tm">
                                <h4>Don't have an account?
                                    <Link className = "loginPage-loginLink-Tm" to = "/">Sign up</Link>
                                </h4>
                            </div>        
                </form>
                <SweetAlert //pop error message will be shown if there is an error
                        show={this.state.show}
                        title="Failed"
                        text="Correct The errors and try again, please"
                        onConfirm={() => this.setState({ show: false })}
                />
            </div>
        )
    }
}


export default LoginPage