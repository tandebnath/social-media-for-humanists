import { motion } from "framer-motion";
import React from "react";

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <motion.h1
      className="text-2xl font-bold mb-6"
      style={{ color: "var(--primary)" }}
      // initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {text}
    </motion.h1>
  );
};

export default Heading;
