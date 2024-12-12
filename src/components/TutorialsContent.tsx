"use client";

import { motion } from "framer-motion";

interface TutorialsContentProps {
  title: string;
  description: string;
  longDescription: string[];
}

const TutorialsContent: React.FC<TutorialsContentProps> = ({
  title,
  description,
  longDescription,
}) => {
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
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      {/* Tutorial Title */}
      <motion.h1
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--primary)" }}
        variants={fadeInVariants}
      >
        {title}
      </motion.h1>

      {/* Tutorial Description */}
      <motion.p
        className="text-lg leading-relaxed mb-6"
        style={{ color: "var(--text)" }}
        variants={fadeInVariants}
      >
        {description}
      </motion.p>

      {/* Tutorial Long Content */}
      {longDescription.map((paragraph, index) => (
        <motion.p
          key={index}
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--text)" }}
          variants={fadeInVariants}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default TutorialsContent;
