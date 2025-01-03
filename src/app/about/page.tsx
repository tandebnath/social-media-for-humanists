"use client";
import Heading from "@/components/Heading";
import PageSkeleton from "@/components/PageSkeleton";
import { aboutData } from "@/modules/AboutData";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const accentColor = "#36aa5d";

export default function About() {

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
      <Heading text="About the Project" />
      <motion.section variants={fadeInVariants}>
        {aboutData.map((section) => {
          return (
            <motion.p
              key={section.id}
              className="mb-6 text-base leading-relaxed tracking-normal"
              initial={false} // No animation initially
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: section.id * 0.1 }}
              viewport={{ once: true }}
            >
              {section.content}
            </motion.p>
          );
        })}
      </motion.section>
      <div className="clear-both" />
    </motion.div>
  );
}
