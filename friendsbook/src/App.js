import React, { useEffect } from "react";
import { Container, Typography, Grow, Grid, AppBar } from "@material-ui/core";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import useStyles from "./styles"
import { useDispatch } from "react-redux";
import { fetchAll } from "./reducer/posts";

const App = () => {
    const classes = useStyles()
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(fetchAll())  
    },[])
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center" className={classes.heading}>
          FriendsBook
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} s={4}>
                <Posts/>
            </Grid>
            <Grid item xs={12} s={4}>
                <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
