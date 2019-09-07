import React, { Component } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGN_UP = gql`
mutation signUp(
    $first_name: String!, 
    $last_name: String!,
    $email: String!, 
    $password: String!,
    $role: Role! 
    ) {
    signUp(
      first_name: $first_name, 
      email: $email,
      password: $password,
      role: $role
      last_name: $last_name
    ) {
      first_name
      last_name
      email
      password
      role
    }
  }`

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            confirm_password: '',
            role: 'CLIENT'
        }
    }
    render() {
        const {email, password, first_name, last_name, role } = this.state;
        return (
            <Grid container>
                        <h2>
                            Registration
                        </h2>
                        <Grid item xs={12} >
                            <TextField
                                id="first_name"
                                label="First Name"
                                type="text"
                                name="first_name"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.setState({first_name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="last_name"
                                label="Last name"
                                type="text"
                                name="last_name"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.setState({last_name: e.target.value})}
                            />
                
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.setState({email: e.target.value})}
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                name="password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.setState({password: e.target.value})}
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="confirm_password"
                                label="Confirm Password"
                                type="password"
                                name="password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => this.setState({confirm_password: e.target.value})}
                            />
                            
                        </Grid>
                        <Grid xs={12} >
                        <Mutation 
                            mutation={SIGN_UP} 
                            variables={{email, password, first_name, last_name, role}}
                            onCompleted={(data) => {
                                console.log("data----", data)
                                alert("Signup Successful. Please login to continue");
                            }}
                        >
                            {(signUp) => (
                                <Button outline color="primary" onClick={signUp}>Register</Button>
                        )}
                        </Mutation> 
                        </Grid>

                        <Link to={`/login`}>
                            Already have account. Login
                        </Link>
                    </Grid>

        )
    }

}

export default SignUp