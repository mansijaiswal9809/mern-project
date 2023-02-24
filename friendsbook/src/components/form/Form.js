import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, getPosts, updatePost } from '../../reducer/posts';


const Form = ({ currentId, setCurrentId }) => {
  const {currentPage}=useSelector((store)=>store.posts)
  // console.log(currentPage)
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      createPost({ ...postData, name: user?.authData?.name }).then(()=>dispatch(getPosts(currentPage)))
      clear();
    } else {
      updatePost(currentId, { ...postData, name: user?.authData?.name }).then(()=>dispatch(getPosts(currentPage)));
      clear();
    }
  };

  if (!user) {
    return (
      <Paper sx={{p:2}} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper sx={{p:2}} elevation={6}>
      <form autoComplete="off" noValidate style={{margin:"4px", display:"flex", flexWrap:"wrap", justifyContent:'center'}} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          {/* <Chip
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            on={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          /> */}
        </div>
        <div style={{width:"97%", margin:"10px 0"}} ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button sx={{mb:10}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
