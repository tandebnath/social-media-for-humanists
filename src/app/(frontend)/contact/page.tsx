"use client";

import Heading from "@/components/Heading";
import { contactData } from "@/modules/ContactData";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const intro = contactData[0];
  const contacts = contactData.slice(1);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <div>
      {/* Intro Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="mb-6"
        style={{ color: "var(--text)" }}
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
            <li className="text-gray-700 font-semibold">Contact</li>
          </ul>
        </div>
        <Heading text="Contact Us" />
        <p className="text-base leading-relaxed">{intro.body}</p>
      </motion.div>

      {/* Contacts Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-xl transition-shadow overflow-hidden w-full max-w-xl"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--text)",
              filter: "brightness(0.97)", // Subtle darkening of the background
            }}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            custom={index}
          >
            {/* Profile Image */}
            <img
              src={contact.image}
              alt={`${contact.name}'s avatar`}
              className="w-20 h-20 rounded-full mb-4 object-cover shadow-md border-4 border-gray-200"
            />

            {/* Name */}
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--primary)" }}
            >
              {contact.name}
            </h3>

            {/* Position */}
            <p className="text-sm font-medium text-gray-600 mb-1">
              {contact.position}
            </p>

            {/* Institution */}
            {contact.institution && (
              <p className="text-sm font-medium text-gray-500">
                {contact.institution}
              </p>
            )}

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300 mb-4 mt-4"></div>

            {/* Email */}
            <div className="flex items-center justify-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <a
                href={`mailto:${contact.email}`}
                className="text-base font-medium hover:underline"
                style={{ color: "var(--accent)" }}
              >
                {contact.email}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}