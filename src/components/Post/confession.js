import React, { useEffect, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import AvatarPost from "../AvatarPost";
import "../../css/Form.css";
import "../../css/EditForm.css";
import CommentItem from "./CommentItem";

export default function Confession({
  title,
  content,
  author,
  createdAt,
  liked,
  postId,
  attachment,
  postComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [likeCount, setLikeCount] = useState(liked);
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(
    localStorage.getItem("name")
  );
  
  //thiết lập state comment ban đầu
  const [displayedComments] = useState(3);

  //state theo dõi trạng thái mở rộng comment
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
  
  // Role Check
  // const isAdmin = localStorage.getItem("role") === "admin";
  const isOwner = localStorage.getItem("name") === author;


  const handleCommentSubmit = () => {
    const commentData = {
      content: commentContent,
      author: commentAuthor,
    };

    axios
      .post(`http://localhost:3001/api/v1/comment/${postId}`, commentData)
      .then((response) => {
        setIsCommenting(false);
        alert("Đăng comment thành công");
      setTimeout(() => {
        window.location.reload();
      }, 500);
        // Xử lý phản hồi thành công từ API (nếu cần)
      })
      
      .catch((error) => {
        // Xử lý lỗi khi gọi API (nếu cần)
        console.log(error);
      });
  };

  const handleCommentClick = () => {
    
    setIsCommenting(true);
    
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleLikeClick = () => {
    const updatedLikeCount = likeCount + 1;
    setLikeCount(updatedLikeCount);

    axios
      .put(`http://localhost:3001/api/v1/posts/${postId}`, {
        likeCount: updatedLikeCount,
      })
      .then((response) => {
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });
  };

  const handleDeleteClick = () => {
    if (isOwner) {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa status không?");
      if (confirmDelete) {
        axios
          .delete(`http://localhost:3001/api/v1/posts/${postId}`)
          .then((response) => {
            alert("Đã xoá thành công")
            setTimeout(() => window.location.reload(), 850);
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      }
    }
  };

  const handleSaveChanges = () => {
    const editedPost = {
      title: editedTitle,
      content: editedContent,
      author: editedAuthor,
    };
    axios
      .put(`http://localhost:3001/api/v1/posts/${postId}`, editedPost)
      .then((response) => {
        setIsEditing(false);

        alert("Đã sửa thành công status");

        setTimeout(() => window.location.reload(), 850);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  useEffect(() => {
    // Gọi API để lấy danh sách comment khi component được tải lên
    axios
      .get(`http://localhost:3001/api/v1/comment/${postId}`)
      .then((response) => {
        // Lưu danh sách comment vào state
        setComments(response.data.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]); 
//logic để hiển thị bình luận dựa trên việc chúng đã được mở rộng hay chưa.
  const commentsToShow = areCommentsExpanded ? comments : comments.slice(0, displayedComments);

  return (
    <Card style={{ marginBottom: "15px" }}>
      <CardHeader
        avatar={<AvatarPost attachment={attachment} author={author} />}
        title={
          <Typography
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {author}
          </Typography>
        }
        subheader={
          <Typography style={{fontSize:"12px"}}>{createdAt}</Typography>
        }
        
        action={
          <>
            {(isOwner) && (
              <>
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </>
        }
      />
      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "rgb(21, 88, 138)", fontSize: "24px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="textPrimary"
          style={{ fontSize: "18px" }}
          className="post-content"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikeClick}>
          <FavoriteIcon />
          <Typography component="span" color="textSecondary">
            {liked}
          </Typography>
        </IconButton>
        
        <IconButton onClick={handleCommentClick}>
          <CommentIcon/>
          <Typography component="span" color="textSecondary" >
            {postComments} 
          </Typography>
        </IconButton>
        

      </CardActions>
      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "rgb(21, 88, 138)", fontSize: "16px" }}
        >
          Bình luận:
        </Typography>
        {commentsToShow.length > 0 ? (
          commentsToShow.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              // onDeleteComment={handleDeleteComment}
            />
          ))
        ) : (

          <Typography style={{fontSize:"12px"}}>Chưa có comment.</Typography>
          
        )}
      
        {/* Show "Xem Thêm" button */}
        {comments.length > displayedComments && (
          <Button onClick={() => setAreCommentsExpanded  (!areCommentsExpanded)}>
            {areCommentsExpanded ? "Thu gọn" : "Xem thêm"}
          </Button>
        )}
        
      </CardContent>

{/*form thêm comment */}
      {isCommenting && (
        <Dialog open={isCommenting} onClose={() => setIsCommenting(false)} >
          <DialogTitle >Add comment</DialogTitle>
          <DialogContent >
            <TextField
              label="Nội dung"
              multiline
              minRows={5}
              variant="outlined"
              fullWidth
              value={commentContent || ""}
              onChange={(event) => setCommentContent(event.target.value)}
              InputProps={{ style: { fontSize: "16px" } }} 
              InputLabelProps={{ style: { fontSize: "16px" } }}
              style={{ marginBottom: "10px"}}
            />
            <TextField
              label="Tác giả"
              variant="outlined"
              fullWidth
              value={commentAuthor}
              onChange={(event) => setCommentAuthor(event.target.value)}
              InputProps={{ style: { fontWeight:"bold"} }} 
              InputLabelProps={{ style: { fontSize: "16px" } }}
              disabled={true}
              style={{ marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setIsCommenting(false);
              setCommentContent(""); }} color="primary" style={{fontSize:"14px"}}>
              Huỷ   |
            </Button>
            <Button color="primary" onClick={handleCommentSubmit} style={{fontSize:"14px"}}>
              Đăng Comment
            </Button>
          </DialogActions>
        </Dialog>
      )}

{/* edit form */}
      <Dialog open={isEditing} onClose={handleEditClose} style={{ paddingBottom:"300px"}}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            minwidth: "900px",
          }}
        >
          <TextareaAutosize
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
            className="title"
          />
          <TextareaAutosize
            label="Content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              marginBottom: "10px",
              width: "500px",
              paddingBottom: "20px",
            }}
            className="content"
          />
          <TextareaAutosize
            label="Author"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            style={{ marginBottom: "10px" }}
            disabled="disabled"
            className=" author-info title"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
