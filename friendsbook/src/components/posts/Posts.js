import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const  posts  = useSelector((state) => state.posts.posts);
  // console.log(posts)
  const classes = useStyles();
const isLoading=false
  // if (!posts.length && !isLoading) return 'No posts';
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
          // "kjjhd"
        ))}
      </Grid>
    )
  );
};

export default Posts;

// posts
