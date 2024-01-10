import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Post from './Post'; 
import moment from 'moment';

export default function PostList() {
    const [news, setNews] = useState([]);
    
    // useEffect(() => {
    //     async function fetchNews() {
    //         try {
    //             const response = await axios.get('http://localhost:3001/api/v1/news');
    //             setNews(response.data.data.news);
    //         } catch (error) {
    //             console.error('Error fetching news:', error);
    //         }
    //     }

    //     fetchNews();
    // }, []); 


    useEffect(() => {
        fetchNews();
    }, []); 

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/news');
            setNews(response.data.data.news.reverse()); // Đảo ngược danh sách bài viết để bài mới nhất xuất hiện đầu danh sách
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    
    

  const handleDeletePost = async (postId) => {
    try {
      // Gửi yêu cầu DELETE đến API endpoint để xóa bài post
      await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);

      // Cập nhật state để loại bỏ bài post đã xóa
    //   const updatedNews = news.filter(item => item._id !== postId);
    //   setNews(updatedNews);
    fetchNews();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

    return (
    <div>
        <Grid container spacing={2} alignItems='stretch' justifyContent="center" style={{paddingTop:"20px"}}>
            {news.map((item) => (
                <Grid item xs={12} sm={8} key={item._id} >
                    <Post 
                        key={item._id}
                        newId = {item._id}
                        title={item.title}
                        image={item.image}
                        content={item.content}
                        author={item.author}
                        onDelete={() => handleDeletePost(item._id)}  
                        createdAt={moment(item.createdAt).format('YYYY-MM-DD')}
                    />
                </Grid>
            ))}
        </Grid>

    </div>
        
    );
}