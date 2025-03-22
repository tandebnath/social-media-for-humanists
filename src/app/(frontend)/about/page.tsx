"use client";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import Link from "next/link";
import { aboutData } from "@/static/about";
import { pageSettingsData } from "@/static/pageSettings";
import { richTextToHtml } from "@/utils/richTextParser";

const accentColor = "#36aa5d";

export default function About() {
  if (!aboutData || aboutData.length === 0) {
    return <p>No about content available.</p>;
  }

  // Get page title
  const pageTitle =
    pageSettingsData.find((p) => p.page === "about")?.title || "About";

  // Format data
  const formattedData = aboutData
    .map((doc: any) => ({
      ...doc,
      id: String(doc.id),
      contentHtml: doc.content ? richTextToHtml(doc.content) : "",
    }))
    .sort((a, b) => (a.order || a.id) - (b.order || b.id));

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
          <li className="text-gray-700 font-semibold">About</li>
        </ul>
      </div>

      <Heading text={pageTitle} />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          },
        }}
      >
        {formattedData.map((section) => (
          <motion.div
            key={section.id}
            className="mb-6 text-base leading-relaxed tracking-normal"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: section.id * 0.1 }}
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: section.contentHtml }}
          />
        ))}
      </motion.section>

      <div className="clear-both" />
    </motion.div>
  );
}