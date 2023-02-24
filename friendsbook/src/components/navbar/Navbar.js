import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../reducer/user";
import decode from "jwt-decode";
import { deepPurple } from "@mui/material/colors";

const Navbar = () => {
  // const {authData,token}= useSelector((store)=>store.user)
  // console.log(authData,token)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user)
  const logout = () => {
    dispatch(logOut());
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
      }}
      position="static"
      color="inherit"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          align="center"
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
        >
          FriendsBook
        </Typography>
      </div>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              src={user?.authData?.picture}
              alt={user?.authData?.name}
            >
              {user?.authData?.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="h6"
            >
              {user?.authData?.name}
            </Typography>
            <Button
              variant="contained"
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
