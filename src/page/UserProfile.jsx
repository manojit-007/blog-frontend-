/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { FaEdit, FaCheck } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import UserContextApi from "../../context/UserContextApi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
  

const UserProfile = () => {
  // const [profileData, setProfileData] = useState();
  const [avatar, setAvatar] = useState("");
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContextApi);
  const token = currentUser?.token;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/users/${currentUser.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }, // Correct format for headers
          }
        );
        const { name, email, avatar } = response.data;
        // setProfileData(response?.data);
        setName(name); // Set avatar from fetched profile data
        setEmail(email); // Set avatar from fetched profile data
        setAvatar(avatar); // Set avatar from fetched profile data
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [currentUser.id, token]);

  const changeAvatar = async () => {
    setAvatarClicked(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/changeProfilePic`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }, // Correct format for headers
        }
      );
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async(e) =>{
    e.preventDefault();
    try {
      const userData = new FormData();
    userData.set('name', name)
    userData.set('email', email)
    userData.set('currentPassword', currentPassword)
    userData.set('newPassword', newPassword)
    userData.set('confirmNewPassword', confirmNewPassword)

    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/users/update-user`,userData,
      // http://localhost:8000/api/users/update-user
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }, // Correct format for headers
      }
    );

    if(response.status == 200){
      //log out user that user can log in with new data
      navigate('/logout')
    }
    } catch (error) {
      setError(error.response.data.message)
    }
    

  }

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myPosts/${currentUser.id}`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={avatar} alt="" />
            </div>

            {/* avatar form */}
            <form action="" className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="jpg,png,jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setAvatarClicked(true)}>
                <FaEdit />
              </label>
            </form>
            {avatarClicked && (
              <button className="profile_avatar_btn" onClick={changeAvatar}>
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser.name}</h1>

          {/* form for details  */}
          <form action="" className="form profile_form" onSubmit={updateUserDetails}>
            {error && <marquee className="form_error_message">{error}</marquee>}

            <input
              type="text"
              placeholder="Full name"
              name=""
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              name=""
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              name=""
              id=""
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              name=""
              id=""
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name=""
              id=""
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
