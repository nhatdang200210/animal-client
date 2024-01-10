import React, { useState } from 'react';
import '../css/Form.css';
import axios from 'axios'; 
import FileBase64 from "react-file-base64";


export default function Form({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(localStorage.getItem('name') || '');
  const [attachment, setAttachment] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //nếu title hoặc content trống sx thông báo
    if (!title || !content) {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung.");
      return; 
    }
    try {
      const postData = {
        title,
        content,
        author,
        attachment,
        status: 'pending',
      }; 

      //Gửi bài viết mới lên server với trạng thái 'chờ duyet'
      await axios.post('http://localhost:3001/api/v1/posts', postData);
      onSave();
      setTitle('');
      setContent('');
      setAuthor('');
      setAttachment('');

      alert("Bài viết đã được gửi và chờ duyệt");

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (error) {
      console.log(error);
    }
  }; 


  return (
    <section className="form-section">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          className="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          type="text"
          name="content"
          id="content"
          className="content"
          placeholder="what's happening?"
          value={content}
          onChange={handleContentChange}
        />
        <input
          type="text"
          name="author"
          id="author"
          className="title author"
          placeholder="Author"
          value={author} 
          disabled="disabled"
          onChange={handleAuthorChange}
        />
      <FileBase64
        accept="image/*"
        multiple={false}
        type="file"
        value={attachment.image}
        onDone={({ base64 }) =>  
          setAttachment(base64)
        }
      /> 
      <p>{attachment.image}</p>
        <button type="submit" className="bnt">
          POST
        </button>
      </form>
    </section>
  );
}