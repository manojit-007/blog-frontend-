/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [authorID]);

  let createdAtDate = new Date(createdAt);
  // let localCreatedAt = createdAtDate.toLocaleString();

  return (
    <Link to={`/posts/users/${authorID}`} className="post_author">
      <div className="post_author_avatar">
        <img src={author.avatar} alt="Avatar" />
      </div>
      <div className="post_author_details">
        <h5>{author.name} </h5>
        {/* <small>{localCreatedAt}</small> */}
        <br />
        <small>
          <ReactTimeAgo date={createdAtDate} locale="en-IN" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
