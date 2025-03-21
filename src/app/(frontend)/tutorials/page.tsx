"use client";

import Heading from "@/components/Heading";
import { generateTutorialsOverview } from "@/functions/generateTutorialsOverview";
import { motion } from "framer-motion";
import Link from "next/link";

const tutorialsOverviewData = generateTutorialsOverview();

const TutorialsOverviewPage: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-6 mb-12"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
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
          <li className="text-gray-700 font-semibold">Tutorials Overview</li>
        </ul>
      </div>
      <Heading text="Tutorials Overview" />

      {tutorialsOverviewData.map((section, index) => (
        <motion.p
          key={index}
          className="text-base leading-relaxed"
          variants={fadeInVariants}
          custom={index}
        >
          {/* Render content directly from the generated data */}
          <span dangerouslySetInnerHTML={{ __html: section.content }} />
        </motion.p>
      ))}
    </motion.div>
  );
};

export default TutorialsOverviewPage;