/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import UserContextApi from "../../context/UserContextApi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);


  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;


  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const removePost = async () => {
    try {
      console.log("run");
      setLoading(true)
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        if (location.pathname === `/myPosts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  if (loading) {
    return <Loader />;
  }


  return (
    <Link className="btn sm danger" onClick={removePost}>
      Delete
    </Link>
  );
};

export default DeletePost;
