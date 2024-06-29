import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "./App";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`/getpostbyid/${id}`)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`/deletepost/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full md:w-[90%] lg:w-[50%] xl:w-[40%] bg-white p-6 shadow-lg rounded-lg">
        <div className="flex flex-col items-center gap-4">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto border border-gray-300 rounded-md"
            />
          )}
          <h2 className="text-xl font-bold text-gray-800 mt-4">Title:</h2>
          <h1 className="text-3xl font-bold text-center text-gray-800 mt-2 lg:mt-0">
            {post.title}
          </h1>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Category:</h2>
          <span className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm uppercase">
            {post.category}
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Description:</h2>
          <p className="text-lg text-gray-600">{post.description}</p>
          <div className="flex justify-end w-full mt-4">
            {user.email === post.email ? (
              <>
                <div className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 hover:text-white">
                  <Link to={`/editpost/${post._id}`}>Edit</Link>
                </div>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
