import { blogData } from "@/modules/BlogData";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";
import Link from "next/link";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage: React.FC<Params> = ({ params }) => {
  const blogPost = blogData.find((post) => post.slug === params.slug);

  if (!blogPost) {
    return notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
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
          <li>
            <Link href="/blog" className="hover:underline">
              Blog Posts
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-700 font-semibold">{blogPost.title}</li>
        </ul>
      </div>

      {/* Blog Post Content */}
      <BlogPostContent
        title={blogPost.title}
        author={blogPost.author}
        datePosted={blogPost.datePosted}
        readTime={blogPost.readTime} // Pass the readTime to BlogPostContent
        longDescription={blogPost.longDescription}
      />
    </div>
  );
};

export default BlogPostPage;