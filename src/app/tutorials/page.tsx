"use client";
import { tutorialsData } from "@/modules/TutorialsData";
import Link from "next/link";
import { motion } from "framer-motion";

interface Tutorial {
  title: string;
  slug: string;
  description: string;
}

interface TutorialSeries {
  seriesName: string;
  seriesSlug: string;
  tutorials: Tutorial[];
}

const TutorialsPage: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
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
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--primary)" }}
      >
        Tutorials
      </h1>

      {tutorialsData.map((series: TutorialSeries, index: number) => (
        <motion.div
          key={index}
          className="mb-8"
          variants={fadeInVariants}
          custom={index}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--text)" }}
          >
            {series.seriesName}
          </h2>
          <ul className="space-y-4">
            {series.tutorials.map((tutorial, tutorialIndex) => (
              <motion.li
                key={tutorialIndex}
                className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--text)",
                }}
                variants={fadeInVariants}
                custom={tutorialIndex}
              >
                <Link
                  href={`/tutorials/${series.seriesSlug}/${tutorial.slug}`}
                  className="block"
                >
                  <h3
                    className="text-xl font-medium hover:underline mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {tutorial.title}
                  </h3>
                  <p className="text-sm">{tutorial.description}</p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TutorialsPage;
