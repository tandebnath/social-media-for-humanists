"use client";
import PageSkeleton from "@/components/PageSkeleton";
import { aboutData } from "@/modules/AboutData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accentColor = "#36aa5d";

export default function About() {
  return (
    <PageSkeleton title="About the Project" showLine lineColor={accentColor}>
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
      <div className="clear-both" />
    </PageSkeleton>
  );
}
