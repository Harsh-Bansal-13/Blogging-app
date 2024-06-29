import React, { useContext } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./App";
import axios from "axios";

function Navbar() {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((res) => {
        if (res.data === "Success") {
          navigate(0);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" w-full flex justify-between bg-blue-500 p-5">
      <div>
        <h3 className="font-bold text-white">Blog App</h3>
      </div>
      <div className="flex gap-4">
        {" "}
        <div>
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        {user.email && (
          <Link to="/create" className="link">
            Create
          </Link>
        )}
        {user.email && (
          <Link to="/notifications" className="link">
            Notifications
          </Link>
        )}
        {user.email && (
          <Link to="/user" className="link">
            Profile
          </Link>
        )}
        {user.email ? (
          <div>
            <input
              type="button"
              onClick={handleLogout}
              value="Logout"
              className="btn_input"
            />
          </div>
        ) : (
          <div>
            <h5>
              <Link to="/register" className="link">
                Register/Login
              </Link>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
