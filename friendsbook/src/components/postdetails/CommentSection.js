import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';


import useStyles from './styles';
import { commentPost } from '../../reducer/posts';

const CommentSection = ({ post }) => {
  // console.log(post,"post")
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();
  // console.log(comments)

  const handleComment =  async() => {
    let newComments= await dispatch(commentPost({name:user?.authData?.name, comment: comment, id: post._id}));
    // console.log(newComments, "vdhckb")
    setComments(newComments.payload.comments)
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments && comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c && c.split(':')[0]}</strong>
              <span> {c && c.split(':')[1]}</span>
            </Typography>
           ))} 
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length||!user} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
