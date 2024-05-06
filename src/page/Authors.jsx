/* eslint-disable no-unused-vars */
import React, {  useEffect, useState } from "react";
import axios from "axios";
// import UserContextApi from "../../context/UserContextApi";


import Loader from "../components/Loader";
import { Link } from "react-router-dom";

// const { currentUser } = useContext(UserContextApi);


const Authors = () => {
  const [authors, setAuthorsData] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading to true initially

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        setAuthorsData([]);
        let URL = `${import.meta.env.VITE_APP_BASE_URL}/users`;
        const response = await axios.get(URL);
        setAuthorsData(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container author_container">
          {authors.map((author) => (
            // console.log(author)
            <Link
              key={author._id}
              to={`/posts/users/${author._id}`}
              className="author"
            >
              <div className="author_avatar">
                <img src={author.avatar} alt="" />
              </div>
              <div className="author_info">
                <h4>{author.name}</h4>
                <p>{author.posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="center">
          No authors/users found.
          <br />
          <Link to="/"> Home</Link>
        </h1>
      )}
    </section>
  );
};

export default Authors;
