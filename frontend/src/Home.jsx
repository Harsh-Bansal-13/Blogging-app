import axios from "axios";
import React, { useEffect, useState, useTransition, useRef } from "react";
import PostCard from "./PostCard";
import TabButton from "./TabButton";
import { motion, useInView } from "framer-motion";
import SearchByCategory from "./SearchByCategory";
function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/getposts")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [tab, setTab] = useState("skills");
  const [toggle, setToggle] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPending, startTransition] = useTransition();
  const handleTabChange = (id) => {
    startTransition(() => {
      setToggle(id);
    });
  };
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  const handleSearch = (category) => {
    if (category.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };
  return (
    <div className="">
      <div className="flex flex-col w-full items-center justify-center">
        <h2 className="text-transparent py-2 bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800 text-4xl font-bold mb-3">
          Blogs
        </h2>
        <div className="flex  mb-8 border-none flex-wrap">
          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("all");
            }}
            active={toggle === "all"}
          >
            All
          </TabButton>
          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("Travel");
            }}
            active={toggle === "Travel"}
          >
            Travel
          </TabButton>

          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("Technology");
            }}
            active={toggle === "Technology"}
          >
            Technology
          </TabButton>
          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("Lifestyle");
            }}
            active={toggle === "Lifestyle"}
          >
            Lifestyle
          </TabButton>
          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("Food");
            }}
            active={toggle === "Food"}
          >
            Food
          </TabButton>
          <TabButton
            selectTab={() => {
              setFilteredPosts();
              handleTabChange("Search");
            }}
            active={toggle === "Search"}
          >
            Search
          </TabButton>
        </div>
      </div>
      <motion.ul
        ref={ref}
        className="flex flex-wrap gap-4 justify-center items-center"
      >
        {toggle === "all" &&
          posts.map((post, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <PostCard post={post} index={index}></PostCard>
            </motion.li>
          ))}
        {posts
          .filter((post) => post.category === toggle)
          .map((post, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <PostCard post={post} index={index}></PostCard>
            </motion.li>
          ))}
        <div className="flex flex-col items-center justify-center gap-8">
          {toggle === "Search" && (
            <SearchByCategory handleSearch={handleSearch} />
          )}
          <div className="flex flex-wrap gap-4">
            {toggle === "Search" &&
              filteredPosts &&
              filteredPosts.map((post, index) => (
                <motion.li
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <PostCard post={post} index={index}></PostCard>
                </motion.li>
              ))}
          </div>
        </div>
      </motion.ul>
    </div>
  );
}

export default Home;
