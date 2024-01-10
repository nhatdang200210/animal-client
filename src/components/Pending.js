import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  Card, CardHeader, Typography, CardContent
} from "@material-ui/core";
import AvatarPost from "./AvatarPost"
import Menu from "./Menu"

export default function Pending({
  updateApprovedPosts,
  
}) {

    //thiết lập bài viết cần xem xét
    const [postsrv, setPostsrv] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/v1/posts?status=pending');
            setPostsrv(response.data.data.posts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPosts();
      }, []);

    //phê duyệt
    const approvePost = async (postId) => {
        try {
            // Gửi request lên server để duyệt bài viết
            await axios.put(`http://localhost:3001/api/v1/posts/approve/${postId}`);
          
          // Lấy lại danh sách bài viết đã duyệt
            const response = await axios.get('http://localhost:3001/api/v1/posts/approved');
            const approvedPostsData = response.data.data.posts;

          // Cập nhật danh sách bài viết chờ duyệt, loại bỏ bài viết đã duyệt
            const updatedPosts = postsrv.filter(post => post._id !== postId);
            setPostsrv(updatedPosts);

          // Truyền dữ liệu đã duyệt sang trang status thông qua props
            updateApprovedPosts(approvedPostsData);

          alert("Bài viết đã được duyệt thành công")
          setTimeout(() => {
            window.location.reload();
          }, 2000);


        } catch (error) {
          console.error('Lõi duyệt bài viết', error);
        }
      };

      const handleDelete = async (postId) => {
        // Hiển thị hộp thoại xác nhận khi admin xoá status
        const stdelete = window.confirm("Bạn có muốn xóa status này không?");
        // if (stdelete){
          // try {
          //   const response = await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);
            
          //   // hiển thị ds loại bỏ bài đã xoá
          //   const updatePost = postsrv.filter(post => post._id !== postId )
          //   setPostsrv(updatePost)

          //   alert("Bài viết đã được duyệt thành công")
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 2000);
          // } catch (error) {
          //   console.error('Lõi xoá bài viết', error);
          // } 
        // }
        if (stdelete) {
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
      

  return (
    <div>
      <Menu />
      <h2 style={{
        color:"blue",
        textAlign:'center',
        paddingTop:"1rem",
        paddingBottom:"2rem"
      }}>Bài viết đang chờ phê duyệt</h2>
      <ul>
        {postsrv.map(post => (
          <Card style={{marginBottom:"1.5rem"}}>
            <li key={post._id}>
            <div>
              {/* <h3>{post.title}</h3> */}
              <CardHeader 
                avatar={<AvatarPost attachment={post.attachment} author={post.author} />}
                title={
                  <Typography
                    style={{
                      color: "red",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {post.author}
                  </Typography>
              }
              subheader={
                <Typography style={{fontSize:"13px"}}>
                  {moment(post.createdAt).format("YYYY-MM-DD")}
                </Typography>
              }
              />

              <CardContent>
                <Typography
                  variant="h6"
                  style={{ color: "rgb(21, 88, 138)", fontSize: "20px" }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  color="textPrimary"
                  style={{ fontSize: "14px", whiteSpace: "pre-line"}}
                  
                >
                  {post.content}
                </Typography>
              </CardContent>

              <button style={{margin:"0 0 1rem 1.5rem", color:"blue", padding:"4px 6px", fontWeight:"bold"}} onClick={() => approvePost(post._id)}>DUYỆT</button>
              <button style={{margin:"0 0 1rem 1.5rem", color:"blue", padding:"4px 6px", fontWeight:"bold"}} onClick={()=> handleDelete(post._id)}>Xoá</button>
            </div>
          </li>
          </Card>
        ))}
      </ul>

    </div>
  );
}

