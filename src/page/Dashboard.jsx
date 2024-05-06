/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContextApi from "../../context/UserContextApi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from './DeletePost'

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;

  // If token is not available, the user is considered not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/posts/users/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data); // Update allPosts state with fetched posts data
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserPosts(); // Call the fetchUserPosts function
  }, [id, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {allPosts.length > 0 ? (
        <div className="container dashboard_container">
          {allPosts.map((post) => {
            return (
              <article key={post._id} className="dashboard_post">
                <div className="dashboard_post_info">
                  <div className="dashboard_post_thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post_actions">
                  <Link to={`/posts/${post._id}`} className="btn sm">
                    View
                  </Link>
                  <Link to={`/posts/${post.i_d}/edit`} className="btn sm primary">
                    Edit
                  </Link>
                  {/* <Link to={`/posts/${post._id}/delete`} className="btn sm danger">
                    Delete
                  </Link> */}
                  <DeletePost postId={post._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h1 className="center">
          No posts found.
          <br />
          <Link to="/"> Home</Link>
        </h1>
      )}
    </section>
  );
};

export default Dashboard;
