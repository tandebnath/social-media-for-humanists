"use client";

import { contactData } from "@/modules/ContactData";
import { motion } from "framer-motion";
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
        className="mb-10"
        style={{ color: "var(--text)" }}
      >
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--primary)" }}
        >
          Contact Us
        </h1>
        <p className="text-lg leading-relaxed">{intro.body}</p>
      </motion.div>

      {/* Contacts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--text)",
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
              className="w-24 h-24 rounded-full mb-4 object-cover shadow-md"
            />

            {/* Name and Position */}
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--accent)" }}
            >
              {contact.name}
            </h3>
            <p className="text-sm">
              {contact.position}
              {contact.institution && `, ${contact.institution}`}
            </p>

            {/* Email */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <FaEnvelope style={{ color: "var(--accent)" }} />
              <a
                href={`mailto:${contact.email}`}
                className="text-sm hover:underline"
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
