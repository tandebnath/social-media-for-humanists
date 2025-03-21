"use client";

import { useState, useMemo } from "react";
import { tutorialsListData } from "@/modules/TutorialsListData";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiGooglecolab } from "react-icons/si";
import { FaFilter } from "react-icons/fa";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import Heading from "@/components/Heading";

interface Tutorial {
  title: string;
  slug: string;
  description: string;
  contentType: string; // "text" or "link"
  content: string | string[]; // Either array of strings or a link
}

interface TutorialSeries {
  seriesName: string;
  seriesSlug: string;
  tutorials: Tutorial[];
}

const romanize = (num: number): string => {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romanNumerals[num - 1] || num.toString();
};

const TutorialsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string | null>(null); // Filter type state
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  // Filter the tutorials based on the selected content type
  const filteredTutorialsListData = useMemo(() => {
    if (!filterType) return tutorialsListData;
    return tutorialsListData.map((series) => ({
      ...series,
      tutorials: series.tutorials.filter(
        (tutorial) => tutorial.contentType === filterType
      ),
    })).filter((series) => series.tutorials.length > 0);
  }, [filterType]);

  // Clear the filter
  const clearFilter = () => setFilterType(null);

  // Dropdown content
  const dropdownContent = (
    <div
      className="w-[100%] p-4 shadow-lg"
      style={{
        backgroundColor: "var(--background)",
        filter: "brightness(0.95)", // Darkens the background
        color: "var(--text)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Conditional Clear Button */}
      {filterType && (
        <div className="flex justify-between items-center mb-3">
          <div />
          <button
            type="button"
            onClick={clearFilter}
            className="text-sm font-semibold underline"
            style={{ color: "var(--accent)" }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Filter Options */}
      <div className="flex flex-col space-y-2">
        <button
          className={`text-left text-sm px-3 py-2 rounded ${filterType === "text"
            ? "bg-blue-200"
            : "hover:bg-gray-100 text-text"
            }`}
          onClick={() => setFilterType("text")}
        >
          Text Tutorials
        </button>
        <button
          className={`text-left text-sm px-3 py-2 rounded ${filterType === "link"
            ? "bg-blue-200"
            : "hover:bg-gray-100 text-text"
            }`}
          onClick={() => setFilterType("link")}
        >
          Notebook Tutorials
        </button>
      </div>
    </div>
  );

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
          <li className="text-gray-700 font-semibold">List of Tutorials</li>
        </ul>
      </div>
      <Heading text="List of Tutorials" />

      {/* Filter by Tutorial Type Button */}
      <div className="flex justify-end mb-6">
        <Dropdown
          trigger={["click"]}
          overlay={dropdownContent}
          animation="slide-up"
          visible={dropdownVisible}
          onVisibleChange={(visible) => setDropdownVisible(visible)}
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 shadow-lg cursor-pointer"
            style={{
              backgroundColor: "var(--background)",
              filter: "brightness(0.95)",
            }}
          >
            <FaFilter />
            Filter by Tutorial Type
          </button>
        </Dropdown>
      </div>

      {filteredTutorialsListData.map((series: TutorialSeries, index: number) => (
        <motion.div
          key={index}
          id={series.seriesSlug} // Attach id to enable anchor link navigation
          className="mb-12"
          variants={fadeInVariants}
          custom={index}
        >
          {/* Series Name */}
          <h2
            className="text-2xl font-semibold underline mb-4"
            style={{ color: "var(--primary)" }}
          >
            {romanize(index + 1)}. {series.seriesName}
          </h2>

          {/* Tutorials List */}
          <ul className="space-y-6">
            {series.tutorials.map((tutorial, tutorialIndex) => (
              <motion.li
                key={tutorialIndex}
                className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 relative"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--accent)",
                }}
                variants={fadeInVariants}
                custom={tutorialIndex}
              >
                {tutorial.contentType === "text" ? (
                  // Text-based Tutorial
                  <Link
                    href={`/tutorials/list/${series.seriesSlug}/${tutorial.slug}`}
                    className="block"
                  >
                    <h3
                      className="text-xl font-medium hover:underline mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      {tutorial.title}
                    </h3>
                    <p className="text-base">{tutorial.description}</p>
                  </Link>
                ) : (
                  // Link-based Tutorial
                  <div>
                    <div className="flex items-center justify-between">
                      <a
                        href={tutorial.content as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline text-xl font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {tutorial.title}
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                      <a
                        href={tutorial.content as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-600"
                        aria-label="Open in Google Colab"
                      >
                        <SiGooglecolab className="text-2xl" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {tutorial.description}
                    </p>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TutorialsPage;