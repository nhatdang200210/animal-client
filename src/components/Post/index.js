import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Card,
  // CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../css/FormNews.css";

export default function Post({
  title,
  image,
  content,
  author,
  onDelete,
  createdAt,
  newId,
  // liked,
  
}) {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  

 
  const [showFullContent, setShowFullContent] = useState(false);
  const [isShrinked, setIsShrinked] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    
    // setShowFullContent(contentHeight <= 90);  // Giả sử kích thước tối đa là 90px
    const contentHeight = contentRef.current.clientHeight;
    setIsShrinked(contentHeight > 40); //kích thướclớn hơn sẽ hiện xem thêm
    setShowFullContent(false);
  }, []);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
//tắt xem thêm
  const shrinkContent = () => {
    setShowFullContent(false);
  };

//edit
  const handleEdit = () => {
    setOpen(true);
  };



  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewContent(event.target.value);
  };

  const updatePost = async () => {
    const newData = {
      title: newTitle,
      content: newContent,
    };

    try {
      await axios.put(`http://localhost:3001/api/v1/news/${newId}`, newData);

      alert("Sửa bài viết thành công.");

      setTimeout(() => {
        window.location.reload();
      }, 850);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (isAdmin) {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xoá tin tức này không?"
      );

      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/v1/news/${newId}`);
          await onDelete();
          window.location.reload();
        } catch (error) {
          console.error("Lỗi khi xoá bài viết:", error);
        }
      }
    }
  };

  return (
    <Card style={{ minHeight: '630px' }}> {/* Chiều cao cố định của khung bài post */}
      <CardHeader
        subheader={createdAt}
        action={
          <div>
            {isAdmin && (
              <>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        }
      />

      {/* Hình Ảnh bài tin tức */}
      <CardMedia
        component="img"
        height="400"
        // width="90%"
        title={title}
        image={image}
        // className="post-img"
      />

      {/* Tiêu đề tin tức và nội dung */}
      <CardContent>
        <Typography
          // variant="h6"
          color="textPrimary"
          style={{ color: "blue", fontSize: "28px" ,paddingBottom:"20px", lineHeight:"30px", fontWeight:"600"}}
        >
          {title}
        </Typography>
        <div
          ref={contentRef}
          style={{
            maxHeight: showFullContent ? 'none' : "75px", // giới hạn chiều cao
            overflow: 'hidden',
            color:"rgb(21, 84, 139)"
          }}
          className="post-content"
        >
          <p>{content}</p>
        </div>


        {isShrinked && !showFullContent && (
          <Button onClick={toggleContent}>
            Xem thêm
          </Button>
        )}
        {showFullContent && (
          <Button onClick={shrinkContent}>
            Thu nhỏ
          </Button>
        )}

        {/* tác giả bài đăng */}
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          style={{ fontSize: "14px" }}
        >
          Author: {author}
        </Typography>
      </CardContent>




      <Dialog open={open} onClose={() => setOpen(false)} style={{ paddingBottom:"300px"}} >
        <DialogTitle >Sửa Tin</DialogTitle>
        <DialogContent
          style={{
            minWidth:"600px",
          }}
        >

          {/* Hiển thị các trường chỉnh sửa */}
          <TextareaAutosize
            placeholder="Title"
            fullWidth
            value={newTitle}
            onChange={handleTitleChange}
            className="posttitle title-edit"
          />
          <TextareaAutosize
            placeholder="Content"
            fullWidth
            value={newContent}
            onChange={handleContentChange}
            className="contentnews content-edit"

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" style={{fontSize:"14px"}}>
            Huỷ sửa  |
          </Button>
          <Button onClick={updatePost} color="primary" style={{fontSize:"14px"}}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
  newId: PropTypes.string.isRequired,
  liked: PropTypes.number,

};