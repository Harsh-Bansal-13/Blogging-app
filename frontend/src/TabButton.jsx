import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-blue-800" : "text-blue-500";
  return (
    <button onClick={selectTab} className="p-2 border-none  focus:outline-none">
      <p className={`mr-3 font-semibold hover:text-blue-800 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-blue-500 mr-3 rounded-full"
      ></motion.div>
    </button>
  );
};

export default TabButton;
