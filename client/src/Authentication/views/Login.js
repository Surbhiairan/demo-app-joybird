import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Divider, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      first_name
      last_name
      role
      email
      user_id
    }
  }`

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {

        const { email, password } = this.state
        return (
            <Grid container>
                <h2 style={{textAlign: 'center'}}>
                Login
                            </h2>
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
            <Grid item xs={12} >
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
            <Grid item xs={12} style={{paddingTop: '2%'}}>
              <Link to={`/forgotpassword`}>
                Forgot Password
              </Link>
            </Grid>
            <Grid item xs={12}  style={{paddingTop: '2%'}}>
                    <Mutation 
                        mutation={LOGIN} 
                        variables={{email, password}}
                        onCompleted={(data) => {
                            console.log("data----", data)
                            localStorage.setItem('user', JSON.stringify(data.login));
                            alert("Login Successful")
                            if(data.login.role === 'CLIENT') {
                                this.props.history.push('/home')
                            } else {
                                this.props.history.push('/admin')
                            }
                        }}
                    >
                        {(login) => (
                            <Button outline color="info" onClick={login}>Login</Button>
                        )}
                    </Mutation> 
            </Grid>
            <Grid item xs={12} style={{paddingTop: '2%'}}>
              <Link to={`/signUp`}>
                Register as new User
              </Link>
            </Grid>
            <Grid item xs={12}  style={{paddingTop: '2%'}}>
              <Divider light={false} variant="middle"/>
            </Grid>

          </Grid>


        )
    }
}

export default Login