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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
      <motion.section variants={fadeInVariants} className="mb-12">
        {captionContent &&
          captionContent.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-[1.5rem] leading-relaxed mb-4"
              style={{ color: "var(--text)" }}
              variants={fadeInVariants}
            >
              {paragraph}
            </motion.p>
          ))}
      </motion.section>

      {/* Latest Blog Posts Section */}
      <motion.section variants={fadeInVariants}>
        <motion.h2
          variants={fadeInVariants}
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--text)" }}
        >
          Latest Blog Posts
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
        >
          {blogData.slice(0, 3).map((blog: BlogPost, index: number) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
              custom={index}
              variants={cardVariants}
            >
              <motion.h3
                className="text-lg font-bold mb-2 hover:underline"
                style={{ color: "var(--primary)" }}
                variants={fadeInVariants}
              >
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </motion.h3>
              <motion.div
                className="flex items-center text-sm mb-4"
                style={{ color: "var(--secondary)" }}
                variants={fadeInVariants}
              >
                <div className="flex items-center mr-4">
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
              <motion.p className="text-sm mb-4" variants={fadeInVariants}>
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
