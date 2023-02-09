import { Avatar, Button, Container, Grid, Paper,Typography } from "@material-ui/core";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles"
import {GoogleLogin,GoogleLogout} from "@react-oauth/google"
const Auth = () => {
    const [isSignUp, setIsSignUp]= useState(false)
    const [visible,setVisible]= useState(false)
    const user= false
    const classes= useStyles()
    const switchMode=()=>{
        setIsSignUp(!isSignUp)
        setVisible(false)
    }
    const handleShowPassword=()=>{
        setVisible(!visible)
    }
    const handleChange=(e)=>{ 

    }
    const HandleSubmit=()=>{

    }
    const googleSuccess=async(res)=>{
      console.log(res)
    }
    const googleFailure=(err)=>{
      console.log(err)
    }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {!isSignUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                <Input
                  name="lastName"
                  label="La   st Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={visible ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input  
                name="confirmPassword"
                label="Confirm   Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {!isSignUp &&<GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/>}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp?"Sign Up": "sign In"}
          </Button>
            <Grid container justify-content="center">
                <Grid item xs={12}>
                    <Button onClick={switchMode} fullWidth>{isSignUp?'already have an account? Sign In ':'do not have an account?Sign Up'}</Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
  