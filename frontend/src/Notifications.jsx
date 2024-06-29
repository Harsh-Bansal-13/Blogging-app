import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userContext } from "./App";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`/notifications/${user.email}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching notifications!", error);
      });
  }, [user.email]);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
      <ul className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-200 pb-4"
          >
            <p className="text-gray-600 mb-2 sm:mb-0">
              {notification.senderEmail} shared a post with you.
            </p>
            <Link
              to={`/post/${notification.postId._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View Post
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
