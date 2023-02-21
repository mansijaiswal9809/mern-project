import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import {  Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../reducer/user";
import  decode from "jwt-decode"


const Navbar = () => {
  // const {authData,token}= useSelector((store)=>store.user)
  // console.log(authData,token)
  const classes = useStyles();
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const location= useLocation()
  // const user = null;
  const [user, setUser]= useState(JSON.parse(localStorage.getItem("profile")))
  // console.log(user)
  const logout=()=>{
    dispatch(logOut())
    navigate("/")
    setUser(null)
  }
  useEffect(()=>{
    const token= user?.token  
    if(token){
      const decodedToken= decode(token)
      if(decodedToken.exp*1000<new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  },[location])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          align="center"
          className={classes.heading}
        >
          FriendsBook
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user?.authData?.picture}
              alt={user?.authData?.name}
            >
              {user?.authData?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.authData?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
            <Button
            component={NavLink}
            to="/auth"
            variant="contained"
            className={classes.logout}
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
