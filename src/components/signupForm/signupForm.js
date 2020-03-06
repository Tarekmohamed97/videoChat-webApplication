import React from 'react';
import './signupform.css';
/*material-ui imports...you must install material-ui/core to import like this...example: npm install @material-ui/core*/
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SweetAlert from 'sweetalert2-react';
import FacebookIcon from '@material-ui/icons/Facebook';
import gmailIcon from '../../images/googleIcon.png'


  

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors, ...rest }) => {
    let valid = true;

    //validate the formErrors length
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });

    //validate the formInput's values length
    Object.values(rest).forEach(value => {
        value == null && (valid = false)
    });

    return valid;
}



class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            show: false
        };
    }


    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)){
            console.log(`
                --Submitting--
                firstname: ${this.state.firstName},
                lastname: ${this.state.lastName},
                email: ${this.state.email}
            `)
        }else{
            console.error("form invalid - display", this.state.show);
            this.state.show =  true;
            console.log(this.state.show);
        }
    }

    handleChange = e => {
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        
        switch (name){
            case 'firstName':
                formErrors.firstName = value.length < 3 
                    ? "minimum three characters required"
                    : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length < 3 
                    ? "minimum three characters required"
                    : "";
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) 
                    ? '' 
                    : "Invalid email address";
                break;
            case 'password':
                formErrors.password = value.length < 6 
                    ? "the password length must be at least 6" 
                    : "";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name] : value}, () => {
            console.log(this.state);
        })
    }
    
    render(){
         
        const {formErrors} = this.state;

        return(
            <div className = "signUpForm-page-Tm">
                <Container className = "signUpForm-container-Tm" maxWidth="sm" /*material-ui*/ >
                    <AccountCircleRoundedIcon className = "signUpForm-icon-Tm" /> 
                    <h1 className = "signUpForm-head-Tm">SIGN UP</h1>
                    <form onSubmit = {this.handleSubmit}>
                        <Grid container spacing = {2}>
                            <Grid className = "signUpForm-firstName-Tm" item xs={12} sm={6} /*material-ui*/ > 
                                <TextField /*material-ui*/
                                    id="outlined-basic"
                                    label="First Name"
                                    onChange = {this.handleChange} 
                                    className={formErrors.firstName.length > 0 ? "error" : null}
                                    margin="normal"
                                    variant="outlined"
                                    name = "firstName"
                                    fullWidth
                                /> 
                                {
                                    formErrors.firstName.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.firstName}</span>
                                    )
                                }
                            </Grid>
                            <Grid className = "signUpForm-firstName-Tm" item xs={12} sm={6} /*material-ui*/ >
                                <TextField /*material-ui*/
                                    id="outlined-basic"
                                    label="Last Name"
                                    onChange = {this.handleChange} 
                                    className={formErrors.lastName.length > 0 ? "error" : null}
                                    margin="normal"
                                    variant="outlined"
                                    name = "lastName"
                                    fullWidth
                                />
                                {
                                    formErrors.lastName.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.lastName}</span>
                                    )
                                }
                            </Grid>
                            <Grid item xs={12} className = "signUpForm-email-Tm" /*material-ui*/ >
                                <TextField /*material-ui*/
                                    id="outlined-basic"
                                    label="Email"
                                    onChange = {this.handleChange} 
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    margin="normal"
                                    variant="outlined"
                                    name = "email"
                                    fullWidth
                                />
                                {
                                    formErrors.email.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.email}</span>
                                    )
                                }
                            </Grid>
                            <Grid item xs={12} className = "signUpForm-password-Tm" /*material-ui*/ >
                                <TextField /*material-ui*/
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    name = "password"
                                    fullWidth
                                    onChange = {this.handleChange}
                                />
                            
                                {
                                    formErrors.password.length > 0 && (
                                        <span className = "signUpForm-error-Tm">{formErrors.password}</span>
                                    )
                                }
                            </Grid>
                            <Grid item xs={12} className = "signUpForm-password-Tm" /*material-ui*/ >
                                <Button
                                    variant="contained"
                                    component="label"
                                    >
                                    Upload Profile Picture
                                    <input
                                        type="file"
                                        
                                />
                                </Button>
                            </Grid>
                            <Grid item xs = {12} /*material-ui*/ >
                                {
                                <Link   className = "signUpForm-createAccount-Tm" to = {"/outerStudentProfile"}>
                                    <Button /*material-ui*/
                                        type = "submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className = "signUpForm-createAccount-Tm"
                                        onClick={() => { //choosing when to show the sweet alert component
                                            formValid(this.state) ?
                                            this.setState({ show: false }) :
                                            this.setState({ show: true })
                                        }}   
                                    >
                                    Create Account
                                    </Button>
                                </Link>
                                }
                            </Grid>
                            <Grid item xs = {12} /*material-ui*/ >
                                <div className = "signUpForm-createUsingBlock-Tm">
                                        <h4>Or Create an Account using</h4>
                                        <Link className = "signUpForm-Facebook-Tm"><FacebookIcon container justify="flex-end"  color="primary" style = {{fontSize: 60}}/></Link>
                                        <h4>or</h4>
                                        <Link>
                                            <img src={gmailIcon}  className = "signUpForm-gmail-Tm" alt="gmail"/>
                                        </Link>
                                </div>
                            </Grid>
                            <Grid container justify="flex-end" /*material-ui*/ >
                                <Grid item>
                                    <Link to="loginPage" variant="body2" /*material-ui*/ className = "signUpForm-createAccount-Tm">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>                            
                        </Grid>
                    </form>
                    <SweetAlert
                        show={this.state.show}
                        title="Failed"
                        text="Correct The errors and try again, please"
                        onConfirm={() => this.setState({ show: false })}
                    />
                </Container>
            </div>
        )
    }
}


export default SignUpForm;

/*


<input 
                                type = "text"
                                placeholder = "Last Name"
                                name = "lastname"
                                onChange = {this.handleChange}
                            />
<input 
                                type = "text"
                                placeholder = "Email"
                                name = "email"
                                onChange = {this.handleChange}
                            />

 <input 
                                type = "password"
                                placeholder = "Password"
                                name = "password"
                                onChange = {this.handleChange}
                            />
*/ 