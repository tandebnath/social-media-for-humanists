"use client";

import { useState, useMemo } from "react";
import { blogData } from "@/modules/BlogData";
import Link from "next/link";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  author: string;
  datePosted: string;
  shortDescription: string;
  slug: string;
  keywords: string[];
  readTime: number;
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 5;

  // Filtered and searched blog posts
  const filteredPosts = useMemo(() => {
    return blogData
      .filter((post) =>
        searchQuery
          ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
      .filter((post) =>
        selectedKeyword
          ? post.keywords.includes(selectedKeyword.toLowerCase())
          : true
      );
  }, [searchQuery, selectedKeyword]);

  // Paginated posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Page Heading */}
      <Heading text="Blog Posts" />

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4"
      >
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full md:w-[60%] px-4 py-2 border rounded-md"
          style={{
            borderColor: "var(--secondary)",
            color: "var(--text)",
            backgroundColor: "var(--background)",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="w-full md:w-[30%] px-4 py-2 border rounded-md"
          style={{
            borderColor: "var(--secondary)",
            color: "var(--text)",
            backgroundColor: "var(--background)",
          }}
          value={selectedKeyword}
          onChange={(e) => setSelectedKeyword(e.target.value)}
        >
          <option value="">Filter by keyword</option>
          {Array.from(new Set(blogData.flatMap((post) => post.keywords))).map(
            (keyword, index) => (
              <option key={index} value={keyword}>
                {keyword}
              </option>
            )
          )}
        </select>
      </motion.div>

      {/* Blog Posts */}
      <motion.div className="space-y-8" initial="hidden" animate="visible">
        {paginatedPosts.map((post: BlogPost, index: number) => (
          <motion.div
            key={index}
            className="w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--text)",
            }}
            variants={fadeInVariants}
            custom={index}
          >
            <motion.div
              className="flex items-center text-sm mb-4"
              style={{ color: "var(--secondary)" }}
              variants={fadeInVariants}
            >
              <FaClock className="mr-2" style={{ color: "var(--primary)" }} />
              <span>{post.readTime} min read</span>
            </motion.div>
            <motion.h3
              className="text-lg font-bold hover:underline mb-2"
              style={{ color: "var(--primary)" }}
              variants={fadeInVariants}
            >
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </motion.h3>
            <motion.div
              className="flex items-center text-sm mb-4"
              style={{ color: "var(--secondary)" }}
              variants={fadeInVariants}
            >
              <div className="flex items-center mr-4">
                <FaUser className="mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                {new Date(post.datePosted).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </motion.div>
            <motion.p className="text-sm mb-4" variants={fadeInVariants}>
              {post.shortDescription}
            </motion.p>
            <motion.div variants={fadeInVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-2 text-sm font-semibold hover:underline"
                style={{ color: "var(--accent)" }}
              >
                Read More
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-center mt-8"
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <motion.button
            key={index}
            className="px-4 py-2 mx-1 rounded-md"
            style={{
              backgroundColor:
                currentPage === index + 1 ? "var(--primary)" : "var(--text)",
              color:
                currentPage === index + 1
                  ? "var(--background)"
                  : "var(--secondary)",
            }}
            onClick={() => setCurrentPage(index + 1)}
            variants={fadeInVariants}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Blog;
