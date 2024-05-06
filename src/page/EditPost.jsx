import { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContextApi from "../../context/UserContextApi";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // ["blockquote"],
      ["bold", "italic"],
      [{ size: ["small", false, "large", "huge"] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        // { indent: "-1" },
        // { indent: "+1" },
      ],
      ["link", "image"],
      // ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    // "strike",
    // "blockquote",
    "list",
    "bullet",
    // "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Uncategorized",
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Health",
    "Sports",
    "Education",
    "Entertainment",
    "Business",
    "Science",
    "Art",
    "Music",
    "Fitness",
    "Books",
    "Photography",
  ];

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
        // setThumbnail(response.data.thumbnail);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getPost();
  }, [id]);

  const handleChangeThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);

    // Check if thumbnail exists
    if (thumbnail) {
      postData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="create_post">
      <div className="container">
        <h2>
          Edit your post <FaEdit />
        </h2>
        {error && <div className="form_error_message">{error}</div>}

        <marquee className="form_error_message">Update your post </marquee>
        <form onSubmit={handleSubmit} className="form create_post_form">
          <input
            type="text"
            placeholder="Add a Title for Your Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={onChangeDescription}
          />

          {/* <input
            type="file"
            placeholder="Add image for Your Blog"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/jpeg, image/png" // Adjust accepted file types
          /> */}
          <input
            type="file"
            placeholder="Add image for Your Blog"
            onChange={handleChangeThumbnail}
            accept="image/jpeg, image/png"
          />

          <button type="submit" className="btn primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
