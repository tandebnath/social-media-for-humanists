"use client";

import Heading from "@/components/Heading";
import { contactData } from "@/static/contact";
import { pageSettingsData } from "@/static/pageSettings";
import { richTextToHtml } from "@/utils/richTextParser";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const accentColor = "#36aa5d";

const transformImageUrl = (url: string | null | undefined) => {
  if (!url) return null;
  return url.startsWith("/api/media/file/")
    ? url.replace("/api/media/file/", "/uploads/")
    : url;
};

export default function Contact() {
  const pageTitle =
    pageSettingsData.find((p) => p.page === "contact")?.title || "Contact";

  if (!contactData || contactData.length === 0) {
    return <p>No contact information available.</p>;
  }

  // Format + sort
  const formatted = contactData
    .map((entry) => ({
      id: String(entry.id),
      type: entry.type,
      sortOrder: entry.sortOrder ?? 999,
      body:
        entry.type === "text-block" && entry.body
          ? richTextToHtml(entry.body as any)
          : null,
      contact:
        entry.type === "contact" && entry.contact
          ? {
              name: entry.contact.name,
              position: entry.contact.position,
              institution: entry.contact.institution || null,
              email: entry.contact.email,
              imageUrl:
                entry.contact.image && entry.contact.image.url
                  ? transformImageUrl(entry.contact.image.url)
                  : null,
            }
          : null,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Breadcrumbs */}
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

      <Heading text={pageTitle} />

      {/* Render all blocks */}
      {formatted.map((entry, index) => {
        if (entry.type === "text-block" && entry.body) {
          return (
            <motion.div
              key={entry.id}
              className="mb-6 text-base leading-relaxed"
              variants={fadeInVariants}
              custom={index}
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />
          );
        }

        if (entry.type === "contact" && entry.contact) {
          const c = entry.contact;
          return (
            <motion.div
              key={entry.id}
              className="flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-xl transition-shadow overflow-hidden w-full max-w-xl mb-8 mx-auto"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                filter: "brightness(0.97)",
              }}
              variants={fadeInVariants}
              custom={index}
            >
              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={`${c.name}'s avatar`}
                  className="w-20 h-20 rounded-full mb-4 object-cover shadow-md border-4 border-gray-200"
                />
              )}
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--primary)" }}
              >
                {c.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {c.position}
              </p>
              {c.institution && (
                <p className="text-sm font-medium text-gray-500">
                  {c.institution}
                </p>
              )}
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <div className="flex items-center justify-center space-x-2">
                <FaEnvelope className="text-gray-500" />
                <a
                  href={`mailto:${c.email}`}
                  className="text-base font-medium hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  {c.email}
                </a>
              </div>
            </motion.div>
          );
        }

        return null;
      })}
    </motion.div>
  );
}