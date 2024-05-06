/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import PostItem from "../components/PostItem";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";

const Category = () => {
  // const [posts, setPosts] = useState(Dummy_posts);

  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading to true initially

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      try {
        setPosts([])
        let URL = `${import.meta.env.VITE_APP_BASE_URL}/posts/categories/${category}`;
        const response = await axios.get(URL);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchPosts();
  }, [category]);

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



export default Category;
