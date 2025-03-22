'use client'

import { motion } from 'framer-motion'
import { FaUser, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface BlogPostContentProps {
  title: string
  author: string
  datePosted: string
  readTime: number
  longDescriptionHtml: string
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  author,
  datePosted,
  readTime,
  longDescriptionHtml,
}) => {
  const router = useRouter()

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <button
        onClick={() => router.push('/blog')}
        className="mb-6 px-4 py-2 text-sm font-semibold text-white"
        style={{ backgroundColor: 'var(--accent)', border: 'none' }}
      >
        <FaArrowLeft className="inline mr-2" />
        Back to Blog Posts
      </button>

      <motion.h1
        className="text-3xl font-bold mb-4"
        style={{ color: 'var(--primary)' }}
        variants={fadeInVariants}
      >
        {title}
      </motion.h1>

      <motion.div
        className="flex items-center text-sm mb-8"
        style={{ color: 'var(--secondary)' }}
        variants={fadeInVariants}
      >
        <div className="flex items-center mr-4">
          <FaUser className="mr-1" />
          {author}
        </div>
        <div className="flex items-center mr-4">
          <FaCalendarAlt className="mr-1" />
          {new Date(datePosted).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <div className="flex items-center">
          <FaClock className="mr-1" />
          {readTime} min read
        </div>
      </motion.div>

      {/* Render longDescription as HTML */}
      <motion.div
        dangerouslySetInnerHTML={{ __html: longDescriptionHtml }}
        variants={fadeInVariants}
      />
    </motion.div>
  )
}

export default BlogPostContent
