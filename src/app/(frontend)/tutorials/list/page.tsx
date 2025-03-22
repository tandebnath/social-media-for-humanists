'use client';

import { useState, useMemo } from 'react'
import { tutorialsData } from '@/static/tutorials'
import { richTextToHtml } from '@/utils/richTextParser'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaFilter } from 'react-icons/fa'
import { SiGooglecolab } from 'react-icons/si'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import Heading from '@/components/Heading'
import { pageSettingsData } from '@/static/pageSettings'

interface Tutorial {
  id: string
  title: string
  slug: string
  description: string
  contentType: 'text' | 'link'
  content: string
  sortOrder?: number
}

interface TutorialSeries {
  seriesName: string
  seriesSlug: string
  tutorials: Tutorial[]
  sortOrder?: number
}

const romanize = (num: number): string => {
  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]

  let result = ''
  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}

// Prepare the list from static data
const tutorialsListData: TutorialSeries[] = tutorialsData
  .map((series) => ({
    seriesName: series.seriesName,
    seriesSlug: series.seriesSlug,
    sortOrder: series.sortOrder ?? 999,
    tutorials: series.tutorials
      .slice()
      .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
      .map((tut) => ({
        id: tut.id,
        title: tut.title,
        slug: tut.slug,
        description: tut.description,
        contentType: tut.contentType as 'text' | 'link',
        content:
          tut.contentType === 'text'
            ? richTextToHtml(tut.content as any, { paragraphSpacing: '1.25rem' })
            : tut.linkContent || '',
        sortOrder: tut.sortOrder ?? 999,
      })),
  }))
  .sort((a, b) => a.sortOrder! - b.sortOrder!)

const TutorialsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string | null>(null)
  const [dropdownVisible, setDropdownVisible] = useState(false)

  // Get page title
  const pageTitle =
    pageSettingsData.find((p) => p.page === 'listOfTutorials')?.title || 'List of Tutorials'

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: 'easeOut' },
    }),
  }

  const filteredTutorialsListData = useMemo(() => {
    if (!filterType) return tutorialsListData
    return tutorialsListData
      .map((series) => ({
        ...series,
        tutorials: series.tutorials.filter((tutorial) => tutorial.contentType === filterType),
      }))
      .filter((series) => series.tutorials.length > 0)
  }, [filterType])

  const clearFilter = () => setFilterType(null)

  const dropdownContent = (
    <div
      className="w-[100%] p-4 shadow-lg"
      style={{
        backgroundColor: 'var(--background)',
        filter: 'brightness(0.95)',
        color: 'var(--text)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {filterType && (
        <div className="flex justify-between items-center mb-3">
          <div />
          <button
            type="button"
            onClick={clearFilter}
            className="text-sm font-semibold underline"
            style={{ color: 'var(--accent)' }}
          >
            Clear
          </button>
        </div>
      )}
      <div className="flex flex-col space-y-2">
        <button
          className={`text-left text-sm px-3 py-2 rounded ${
            filterType === 'text' ? 'bg-blue-200' : 'hover:bg-gray-100 text-text'
          }`}
          onClick={() => setFilterType('text')}
        >
          Text Tutorials
        </button>
        <button
          className={`text-left text-sm px-3 py-2 rounded ${
            filterType === 'link' ? 'bg-blue-200' : 'hover:bg-gray-100 text-text'
          }`}
          onClick={() => setFilterType('link')}
        >
          Notebook Tutorials
        </button>
      </div>
    </div>
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
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

      <Heading text={pageTitle} />

      {/* Filter */}
      <div className="flex justify-end mb-6">
        <Dropdown
          trigger={['click']}
          overlay={dropdownContent}
          animation="slide-up"
          visible={dropdownVisible}
          onVisibleChange={(visible) => setDropdownVisible(visible)}
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 shadow-lg cursor-pointer"
            style={{
              backgroundColor: 'var(--background)',
              filter: 'brightness(0.95)',
            }}
          >
            <FaFilter />
            Filter by Tutorial Type
          </button>
        </Dropdown>
      </div>

      {/* Tutorial Series */}
      {filteredTutorialsListData.map((series, index) => (
        <motion.div
          key={series.seriesSlug}
          id={series.seriesSlug}
          className="mb-12"
          variants={fadeInVariants}
          custom={index}
        >
          <h2 className="text-2xl font-semibold underline mb-4" style={{ color: 'var(--primary)' }}>
            {romanize(index + 1)}. {series.seriesName}
          </h2>

          <ul className="space-y-6">
            {series.tutorials.map((tutorial, tutorialIndex) => (
              <motion.li
                key={tutorial.id}
                className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 relative"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--accent)',
                }}
                variants={fadeInVariants}
                custom={tutorialIndex}
              >
                {tutorial.contentType === 'text' ? (
                  <Link
                    href={`/tutorials/list/${series.seriesSlug}/${tutorial.slug}`}
                    className="block"
                  >
                    <h3
                      className="text-xl font-medium hover:underline mb-2"
                      style={{ color: 'var(--accent)' }}
                    >
                      {tutorial.title}
                    </h3>
                    <p className="text-base text-gray-700">{tutorial.description}</p>
                  </Link>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <a
                        href={tutorial.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline text-xl font-medium"
                        style={{ color: 'var(--accent)' }}
                      >
                        {tutorial.title}
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                      <a
                        href={tutorial.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-600"
                        aria-label="Open in Google Colab"
                      >
                        <SiGooglecolab className="text-2xl" />
                      </a>
                    </div>
                    <p className="text-base text-gray-700 mt-2">{tutorial.description}</p>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TutorialsPage
