   import React, { useEffect, useState } from "react";
import { Container, Grid, Paper} from "@material-ui/core";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { fetchAll } from "../../reducer/posts";
// import { Form } from "react-router-dom";
import Pagination from "../Pagination";  

const Home = () => {
    const [currentId,setCurrentId]= useState(0)
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(fetchAll())  
    },[])
  return (
    <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} s={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper  elevation={6}>
                <Pagination/>
                </Paper>
            </Grid>
            <Grid item xs={12} s={7} >
                <Posts  setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
  )
}
 
export default Home
 