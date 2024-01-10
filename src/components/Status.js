import React, {  useEffect, useState } from 'react';
import Menu from './Menu';
import Form from './Form';
import { Fab, Grid, Modal } from '@material-ui/core';
import Post from './Post/confession';
import axios from 'axios'; 
import moment from 'moment';
import makeStyles from '../css/styleAdd';


export default function Status() {
  // const [posts, setPosts] = useState([]);
  const classes = makeStyles
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApprovedPosts = async ()=> {
      try{
        const response = await axios.get('http://localhost:3001/api/v1/posts/approved')
        const approvedPostsData = response.data.data.posts;
        setApprovedPosts(approvedPostsData);
      } catch (error){
        console.log(error);
      }
    };

    fetchApprovedPosts()
  }, []);

  const openModal = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsModalOpen(true);
    } else {
      alert('Vui lòng đăng nhập để có thể đăng bài');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }; 

  const top = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div>
      <Menu />
      <button className="bnt" style={{ float: 'right', marginBottom: '20px' }} onClick={openModal}>Post</button>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10}>
          {approvedPosts.map((post, index) => (
            <Post
              key={index}
              title={post.title}
              author={post.author}
              content={post.content}
              attachment={post.attachment} 
              createdAt={moment(post.createdAt).format('YYYY-MM-DD')} 
              liked={post.likeCount} 
              postId={post._id} 
              postComments={post.comments.length} 
            />
          ))}
        </Grid>
      </Grid>
      <Fab color='primary' className={classes.fab1} onClick={top}>
          TOP
      </Fab>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <Form onSave={closeModal} />
        </div>
      </Modal>
      
      
    </div>
  );
}