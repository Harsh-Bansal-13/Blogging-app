import React, {
  useEffect,
  useState,
  useTransition,
  useRef,
  useContext,
} from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./App";
import axios from "axios";
import PostCard from "./PostCard";
import { motion, useInView } from "framer-motion";
function Myposts() {
  const user = useContext(userContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/getposts")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPending, startTransition] = useTransition();

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <motion.ul
      ref={ref}
      className="flex flex-wrap gap-4 justify-center items-center"
    >
      {posts.map((post, index) => (
        <motion.li
          key={index}
          variants={cardVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.3, delay: index * 0.2 }}
        >
          {user.email === post.email ? (
            <PostCard post={post} index={index}></PostCard>
          ) : (
            <></>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default Myposts;
