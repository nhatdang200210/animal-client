import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { IconButton, Typography } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

export default function CommentItem({ comment }) {
   //check
  const author = localStorage.getItem("name");
  const commentOwner = author === comment.author;

  const handleDelete = () => {

  
    // Hiển thị hộp thoại xác nhận khi người dùng muốn xoá comment
    const shouldDelete = window.confirm("Bạn có muốn xóa bình luận này không?");
    if (shouldDelete){
      axios
      .delete(`http://localhost:3001/api/v1/comment/${comment._id}`)
      .then((response) => {
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    }

  return (
    <div style={{ borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" style={{ fontSize: "18px", marginRight: "20px", color:"blue" }}>
          {comment.author} 
        {commentOwner && (
            <IconButton onClick={handleDelete} style={{marginBottom: "0px", color:"brown"}}>
                <Delete />
            </IconButton>
        )}
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <Typography style={{ fontSize: "12px" }}>
          {moment(comment.createdAt).format("YYYY-MM-DD")}
        </Typography>
      </div>
      <Typography style={{ fontSize: "17px" }} className="post-content">
          {comment.content}
        </Typography>
        
    </div>
  );
}