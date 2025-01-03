"use client";

import { useState, useMemo } from "react";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import { blogData } from "@/modules/BlogData";
import Link from "next/link";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility

  const postsPerPage = 5;

  const uniqueKeywords = useMemo(() => {
    const allKeywords = blogData.flatMap((post) =>
      post.keywords.map((kw) => kw.toLowerCase())
    );
    return Array.from(new Set(allKeywords));
  }, []);

  const handleKeywordToggle = (keyword: string) => {
    setCurrentPage(1);
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearKeywords = () => {
    setSelectedKeywords([]);
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(() => {
    return blogData.filter((post) => {
      if (searchQuery) {
        const combined = (post.title + " " + post.author).toLowerCase();
        if (!combined.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }
      if (selectedKeywords.length > 0) {
        const postKeywordsLower = post.keywords.map((kw) => kw.toLowerCase());
        const matches = selectedKeywords.some((kw) =>
          postKeywordsLower.includes(kw)
        );
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedKeywords]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Dropdown content
  const dropdownContent = (
    <div
      className="w-[18rem] p-4 shadow-lg"
      style={{
        backgroundColor: "var(--background)",
        filter: "brightness(0.95)", // Darkens the background
      }}
      onClick={(e) => e.stopPropagation()} // Prevents the dropdown from closing when clicking inside
    >
      <div className="flex justify-between items-center mb-3">
        <div />
        <button
          type="button"
          onClick={clearKeywords}
          className="text-sm font-semibold underline"
          style={{ color: "var(--accent)" }}
        >
          Clear All
        </button>
      </div>

      {/* Chips */}
      {selectedKeywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedKeywords.map((kw) => (
            <div
              key={kw}
              className="inline-flex items-center px-2 py-1 bg-blue-200"
            >
              <span className="text-sm mr-1">{kw}</span>
              <FaTimes
                className="cursor-pointer"
                onClick={() => handleKeywordToggle(kw)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Keyword Checkboxes */}
      <div
        className="max-h-48 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{
          scrollbarWidth: "auto", // Always show the scrollbar
        }}
      >
        {uniqueKeywords.map((keyword) => (
          <div key={keyword} className="flex items-center space-x-1 text-sm mb-2">
            <input
              type="checkbox"
              checked={selectedKeywords.includes(keyword)}
              onChange={() => handleKeywordToggle(keyword)}
            />
            <span>{keyword}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      <div className="breadcrumbs text-sm mb-4 text-gray-500">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-700 font-semibold">Blog</li>
        </ul>
      </div>
      <Heading text="Blog Posts" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 mt-4 gap-4"
      >
        {/* Search Bar */}
        <div className="relative flex items-center w-full md:w-[60%] shadow-lg"
          style={{
            backgroundColor: "var(--background) !important",
            filter: "brightness(0.95)",
          }}>
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-10 py-2"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchQuery && (
            <FaTimes
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={clearSearch}
            />
          )}
        </div>

        {/* Filter Button with rc-dropdown */}
        <Dropdown
          trigger={["click"]}
          overlay={dropdownContent}
          animation="slide-up"
          placement="bottomRight"
          visible={dropdownVisible}
          onVisibleChange={(visible) => setDropdownVisible(visible)} // Handles dropdown visibility
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 shadow-lg cursor-pointer"
            style={{
              backgroundColor: "var(--background)",
              filter: "brightness(0.95)",
            }}
          >
            <FaFilter />
            Filter by Keywords
          </button>
        </Dropdown>
      </motion.div>

      {/* Blog Posts */}
      <motion.div className="space-y-8" initial="hidden" animate="visible">
        {paginatedPosts.map((post: BlogPost, index: number) => {
          const formattedDate = new Date(post.datePosted).toLocaleDateString(
            "en-US",
            { day: "numeric", month: "long", year: "numeric" }
          );

          return (
            <motion.div
              key={index}
              className="w-full p-6 border-l-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--accent)",
              }}
              variants={fadeInVariants}
              custom={index}
            >
              <motion.h3
                className="text-xl font-semibold mb-2 hover:underline"
                style={{ color: "var(--primary)" }}
                variants={fadeInVariants}
              >
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </motion.h3>

              <motion.div
                className="flex items-center text-sm mb-4 flex-wrap"
                style={{ color: "var(--secondary)" }}
                variants={fadeInVariants}
              >
                <div className="flex items-center mr-4 mb-2">
                  <FaUser className="mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <FaCalendarAlt className="mr-1" />
                  {formattedDate}
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="mr-1" style={{ color: "var(--primary)" }} />
                  {post.readTime} min read
                </div>
              </motion.div>

              <motion.p className="text-base mb-4" variants={fadeInVariants}>
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
          );
        })}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-center mt-8"
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <motion.button
              key={pageNum}
              className="px-4 py-2 mx-1 border"
              style={{
                backgroundColor: isActive ? "var(--primary)" : "#ffffff",
                color: isActive ? "var(--background)" : "var(--text)",
                borderColor: isActive ? "var(--primary)" : "var(--secondary)",
              }}
              onClick={() => setCurrentPage(pageNum)}
              variants={fadeInVariants}
            >
              {pageNum}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Blog;