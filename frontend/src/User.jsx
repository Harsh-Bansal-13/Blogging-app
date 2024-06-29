import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userContext } from "./App";
import image1 from "./assets/atal.jpg";

const User = () => {
  const user = useContext(userContext);
  const [numPosts, setNumPosts] = useState(0);
  useEffect(() => {
    const fetchNumPosts = async () => {
      try {
        console.log(user.email);
        const response = await axios.get(`/userposts/${user.email}`);
        console.log(response);
        setNumPosts(response.data.count);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchNumPosts();
  }, [user]);

  const profileInfo = {
    profilePic:
      "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719532800&semt=sph",
    username: user.username,
    email: user.email,
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-center">
            <img
              src={profileInfo.profilePic}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {profileInfo.username}
            </h2>
            <p className="text-sm text-gray-600">{profileInfo.email}</p>
            <p className="mt-2 text-sm text-gray-600">Posts: {numPosts}</p>
            <p className="mt-4">
              <Link
                to="/user/myposts"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Click Here To See Your Posts
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
