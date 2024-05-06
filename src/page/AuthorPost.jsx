/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import PostItem from "../components/PostItem";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";

const AuthorPost = () => {
  // const [posts, setPosts] = useState(Dummy_posts);

  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading to true initially

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let URL = `${import.meta.env.VITE_APP_BASE_URL}/posts/users/${id}`;
        console.log(URL);
        const response = await axios.get(
          URL
          // http://localhost:8000/api/posts/users/662caf2c820c1886cac6d791
        );
        setPosts(response?.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchPosts();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="author_post">
      {posts.length > 0 ? (
        <div className="container posts_container">
          {posts.map((post) => (
            <PostItem
              key={post._id} // Use a unique identifier for the key prop
              postId={post._id}
              thumbnail={post.thumbnail}
              description={post.description}
              category={post.category}
              title={post.title}
              creator={post.creator}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No post found</h2>
      )}
    </section>
  );
};

export default AuthorPost;
