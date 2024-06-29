import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PostCard = ({ post, index }) => {
  return (
    <div key={index}>
      <Link
        to={`/post/${post._id}`}
        className="w-[330px] min-h-[440px] bg-card cursor-pointer rounded-[10px] shadow-[0_0_12px_4px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ease-in-out p-[26px_10px] flex flex-col gap-[14px] hover:translate-y-[-10px] hover:shadow-[0_0_50px_4px_rgba(0,0,0,0.6)] hover:brightness-[1.1] bg-menuOverlay justify-between "
      >
        <div className="px-2 w-full h-1/3">
          <img
            src={post.image}
            className="w-full rounded-lg h-full border-slate-200 border-2"
          />
        </div>
        <div className="w-full flex flex-col gap-0 px-2">
          <div className="text-2xl text-black font-semibold  overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            {post.title}
          </div>

          <div className="text-sm font-normal overflow-hidden text-ellipsis line-clamp-3 mt-2 max-w-full">
            {post.description.substring(0, 100) + "..."}
          </div>
          <div className="flex items-end justify-end text-blue-600 hover:text-blue-800">
            <p> Read More </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
