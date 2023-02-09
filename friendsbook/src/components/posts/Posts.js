import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from './post/Post';
import useStyles from './styles';
import { fetchAll } from '../../reducer/posts';

const Posts = ({setCurrentId}) => {
  const dispatch=useDispatch()
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  const classes = useStyles();
  useEffect(()=>{
    console.log("xnjubcvd")
    dispatch(fetchAll())
  },[])

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
