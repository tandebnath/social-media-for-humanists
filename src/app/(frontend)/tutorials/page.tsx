'use client'

import Heading from '@/components/Heading'
import { tutorialsOverviewData } from '@/static/tutorialsOverview'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { richTextToHtml } from '@/utils/richTextParser'
import { pageSettingsData } from '@/static/pageSettings'

const TutorialsOverviewPage: React.FC = () => {
  // Get page title
  const pageTitle = pageSettingsData.find((p) => p.page === 'tutorialOverview')?.title || 'Overview'

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.15, ease: 'easeOut' },
    }),
  }

  const formattedSections = tutorialsOverviewData.map((entry) => ({
    id: entry.id,
    content: entry.content
      ? richTextToHtml(entry.content as any, {
          underlineColor: 'var(--accent)',
          underlineTextColor: 'var(--accent)',
          underlineThickness: '0.0625rem',
          underlineOffset: '0.2rem',
          paragraphSpacing: '1.25rem',
        })
      : '',
  }))

  console.log(formattedSections)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-6 mb-12"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
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
          <li className="text-gray-700 font-semibold">Tutorials Overview</li>
        </ul>
      </div>

      <Heading text={pageTitle} />

      {/* Content Sections */}
      {formattedSections.map((section, index) => (
        <motion.div
          key={section.id}
          className="text-base leading-relaxed"
          variants={fadeInVariants}
          custom={index}
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      ))}
    </motion.div>
  )
}

export default TutorialsOverviewPage
