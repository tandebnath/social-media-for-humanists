"use client";

import { homeData } from "@/static/home";
import { blogData } from "@/static/blog";
import { richTextToHtml } from "@/utils/richTextParser";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

// Color constants
const accentColor = "#CC5500";
const secondaryColor = "#0055aa";

const Home = () => {
  // Format homepage content
  const homeEntry = homeData[0];
  const homeContent = homeEntry?.content
    ? richTextToHtml(homeEntry.content as any, {
        underlineColor: secondaryColor,
        underlineThickness: "0.25rem",
        underlineOffset: "0.25rem",
      })
    : "";

  const maxUpdates = homeEntry?.maxUpdates || 3;

  // Format blogData to match expected structure
  const formattedBlogPosts = blogData.slice(0, maxUpdates).map((post) => ({
    ...post,
    shortDescription: post.shortDescription
      ? richTextToHtml(post.shortDescription as any)
      : "",
  }));

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Caption Section */}
      <motion.section
        className="text-base leading-relaxed mb-10"
        style={{ color: "var(--text)" }}
        variants={fadeInVariants}
        dangerouslySetInnerHTML={{ __html: homeContent }}
      />

      {/* Divider */}
      <motion.div
        variants={fadeInVariants}
        className="mx-auto my-10 flex w-4/5 items-center justify-center"
      >
        <div
          className="border-t flex-grow mr-3"
          style={{ borderColor: "var(--secondary)" }}
        ></div>
        <span className="text-sm" style={{ color: "var(--secondary)" }}>
          •••
        </span>
        <div
          className="border-t flex-grow ml-3"
          style={{ borderColor: "var(--secondary)" }}
        ></div>
      </motion.div>

      {/* Latest Blog Posts */}
      <motion.section variants={fadeInVariants}>
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeInVariants}
        >
          <h2 className="text-xl font-bold">Latest Blog Posts</h2>
          <Link
            href="/blog"
            className="text-base underline font-semibold"
            style={{ color: "var(--accent)" }}
          >
            View All
          </Link>
        </motion.div>

        <motion.div
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          initial="hidden"
          animate="visible"
        >
          {formattedBlogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              custom={index}
              variants={cardVariants}
              className="w-full max-w-2xl p-6 border-l-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: accentColor,
              }}
            >
              <h3 className="text-lg font-semibold mb-3 hover:underline">
                <Link href={`/blog/${post.slug}`} style={{ color: "var(--primary)" }}>
                  {post.title}
                </Link>
              </h3>

              <div
                className="flex items-center text-sm mb-3"
                style={{ color: "var(--secondary)" }}
              >
                <div className="flex items-center mr-3">
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
              </div>

              <div
                className="text-base mb-4"
                dangerouslySetInnerHTML={{ __html: post.shortDescription }}
              />

              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-2 text-sm font-semibold hover:underline"
                style={{ color: accentColor }}
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;