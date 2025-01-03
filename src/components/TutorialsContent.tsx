"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface TutorialsContentProps {
  title: string;
  description: string;
  content: string[];
  seriesSlug: string; // Added to navigate back to the series
}

const TutorialsContent: React.FC<TutorialsContentProps> = ({
  title,
  description,
  content,
  seriesSlug,
}) => {
  const router = useRouter(); // For navigation back to List of Tutorials
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
        color: "var(--text)",
      }}
    >
      {/* Back to Tutorials Button */}
      <button
        onClick={() => router.push(`/tutorials/list#${seriesSlug}`)}
        className="mb-6 px-4 py-2 text-sm font-semibold text-white"
        style={{
          backgroundColor: "var(--accent)",
          border: "none",
        }}
      >
        <FaArrowLeft className="inline mr-2" />
        Back to List of Tutorials
      </button>

      {/* Tutorial Title */}
      <motion.h1
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--primary)" }}
        variants={fadeInVariants}
      >
        {title}
      </motion.h1>

      {/* Tutorial Content */}
      <div className="space-y-6">
        {content.map((paragraph, index) => (
          <motion.p
            key={index}
            className="text-base leading-relaxed"
            style={{ color: "var(--text)" }}
            variants={fadeInVariants}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

export default TutorialsContent;