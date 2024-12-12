"use client";

import { motion } from "framer-motion";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

interface BlogPostContentProps {
  title: string;
  author: string;
  datePosted: string;
  longDescription: string[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  author,
  datePosted,
  longDescription,
}) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--primary)" }}
        variants={fadeInVariants}
      >
        {title}
      </motion.h1>

      <motion.div
        className="flex items-center text-sm mb-8"
        style={{ color: "var(--secondary)" }}
        variants={fadeInVariants}
      >
        <div className="flex items-center mr-4">
          <FaUser className="mr-1" />
          {author}
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1" />
          {new Date(datePosted).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </motion.div>

      {longDescription.map((paragraph, index) => (
        <motion.p
          key={index}
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--text)" }}
          variants={fadeInVariants}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default BlogPostContent;
