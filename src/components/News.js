import React, { useState } from 'react';
import Menu from './Menu';
import PostList from './PostList';
import { Fab, Grid, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyle from '../css/styleAdd';
import Home1 from './Home1';
import FormNews from './FormNews';


export default function News() {
  const classes = useStyle();
  const [showModal, setShowModal] = useState(false);
  const [news, setNews] = useState([]);

  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

  const handleAddNewPost = (newPost) => {
    // Add new post to the beginning of the news list
    setNews([newPost, ...news]);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const top = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };




  return (
    <div>
      <Menu />
      <Home1 />
      <PostList />
      {isAdmin && (
        <Fab color='primary' className={classes.fab} onClick={handleAddButtonClick}>
          <AddIcon />
        </Fab>
      )}
      <Fab color='primary' className={classes.fab1} onClick={top}>
          TOP
      </Fab>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Grid container className={classes.modalContainer}>
          <Grid item xs={12} className={classes.modalContent}>
             {/* Truyền hàm handleAddNewPost xuống FormNews */}
            <FormNews handleAddNewPost={handleAddNewPost} />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}