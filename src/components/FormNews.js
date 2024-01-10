import axios from "axios";
import FileBase64 from "react-file-base64";
import { useEffect, useState } from "react";
import "../css/FormNews.css";

function FormNews({ handleAddNewPost }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: localStorage.getItem("name"),
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        author: name,
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setFormData({
      title: "",
      image: "",
      content: "",
      author: "",
    });
    window.location.reload();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/news",
        formData
      );

      // Gọi hàm handleAddNewPost để cập nhật danh sách bài viết
      handleAddNewPost(response.data.data.news);

      // Reset form data and close modal
      setFormData({
        title: "",
        image: "",
        content: "",
        author: "",
      });
      alert("Tạo bài viết thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImageUpload = (base64) => {
    setFormData({ ...formData, image: base64 });
  };

  return (
    <section className="form-news-bg">
    <form onSubmit={handleFormSubmit}>
      <h2 className="h2">CREATE NEWS</h2>

      <input
        type="text"
        name="title"
        className="posttitle"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />

      <textarea
        name="content"
        placeholder="News content"
        className="contentnews"
        value={formData.content}
        onChange={handleInputChange}
      />


      <FileBase64
        accept="image/*"
        multiple={false}
        type="file"
        value={formData.image}
        // onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
        onDone={({ base64 }) => handleImageUpload(base64)}
      />

      <input
        type="text"
        name="author"
        className="authornews"
        placeholder="Author" 
        value={formData.author}
        onChange={handleInputChange}
      />

      <button type="submit" className="bnt">
        Lưu
      </button>
      <button type="button" onClick={handleCloseModal} className="bntnew">
        Huỷ tạo
      </button>
    </form>
  </section>
  );
}

export default FormNews;
