import { useState, useContext, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserContextApi from "../../context/UserContextApi";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");


  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;
  // If token is not available, the user is considered not logged in
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



  const createPost = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.append("title", title);
    postData.append("category", category);
    postData.append("description", description);
    postData.append("thumbnail", thumbnail); // Use append() for files
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/posts`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set proper content type for form data
          },
        }
      );
        navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  
  return (
    <section className="create_post">
      <div className="container">
        <h2>Create post</h2>
        {error && <marquee className="form_error_message">{error}</marquee>}

        <form action="" className="form create_post_form" onSubmit={createPost}>
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
            id=""
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
            onChange={setDescription}
          />
          {/* <input
            type="text"
            placeholder="Add a description for Your Blog"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}

          <input
            type="file"
            placeholder="Add image for Your Blog"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml" 
          />

          <button type="submit" className="btn primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
