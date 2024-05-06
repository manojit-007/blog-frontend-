/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
// import Avatar from "../assets/logo.png"; // Update the path accordingly
import { useContext, useEffect, useState } from "react";
import UserContextApi from "../../context/UserContextApi";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  // console.log(id);
  // const URL = `${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`
  // console.log(URL);
  const [post, setPost] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(UserContextApi);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`
        );
        // http://localhost:8000/api
        // http://localhost:8000/api/posts/662cb173febb84a803d7ad2d
        console.log(response);
        setPost(response.data);
        // setCreatorId(response.data.creator);
        // console.log(response.data.creator);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getPost();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="post_detail">
      {error && <marquee className="form_error_message">{error}</marquee>}
      {post && (
        <div className="container post_detail_container">
          <div className="post_detail_header">
            {/* <PostAuthor authorId={post.creator} /> */}
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post.creator && (
              <div className="post_detail_buttons">
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={post._id} />
              </div>
            )}
          </div>
          <h1>Title - {post.title}</h1>
          <div className="post_detail_thumbnail">
            <img src={post.thumbnail} alt={post.title} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          <p>{post.title}</p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
