"use client";

import { blogData } from "@/modules/BlogData";
import { homeData } from "@/modules/HomeData";
import Link from "next/link";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  author: string;
  datePosted: string;
  shortDescription: string;
  slug: string;
}

const Home: React.FC = () => {
  const captionContent = homeData.find(
    (data: any) => data.type === "caption"
  )?.content as string[];

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
      <motion.section variants={fadeInVariants}>
        {captionContent &&
          captionContent.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text)" }}
              variants={fadeInVariants}
            >
              {paragraph}
            </motion.p>
          ))}
      </motion.section>

      {/* Decorative Divider */}
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

      {/* Latest Blog Posts Section */}
      <motion.section variants={fadeInVariants}>
        {/* Heading + View All Link */}
        <motion.div
          variants={fadeInVariants}
          className="flex items-center justify-between mb-6"
        >
          <motion.h2
            variants={fadeInVariants}
          >
            <span className="text-xl font-bold">
              Latest Blog Posts
            </span>
          </motion.h2>
          <motion.div variants={fadeInVariants}>
            <Link
              href="/blog"
              className="text-base underline font-semibold"
              style={{ color: "var(--accent)" }}
            >
              View All
            </Link>
          </motion.div>
        </motion.div>

        {/* Responsive Grid: 1 col on xs, 2 on sm, 3 on lg, cards centered */}
        <motion.div
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          initial="hidden"
          animate="visible"
        >
          {blogData.slice(0, 3).map((blog: BlogPost, index: number) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              // Larger max width per card, ensuring they won't stretch too wide
              className="w-full max-w-2xl p-6 border-l-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--accent)",
              }}
            >
              <motion.h3
                className="text-lg font-semibold mb-3 hover:underline"
                style={{ color: "var(--primary)" }}
                variants={fadeInVariants}
              >
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </motion.h3>
              <motion.div
                className="flex items-center text-sm mb-3"
                style={{ color: "var(--secondary)" }}
                variants={fadeInVariants}
              >
                <div className="flex items-center mr-3">
                  <FaUser className="mr-1" />
                  {blog.author}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  {new Date(blog.datePosted).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </motion.div>
              <motion.p className="text-base mb-4" variants={fadeInVariants}>
                {blog.shortDescription}
              </motion.p>
              <motion.div variants={fadeInVariants}>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block mt-2 text-sm font-semibold hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;