import { blogData } from "@/modules/BlogData";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

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
    <div>
      <BlogPostContent
        title={blogPost.title}
        author={blogPost.author}
        datePosted={blogPost.datePosted}
        longDescription={blogPost.longDescription}
      />
    </div>
  );
};

export default BlogPostPage;
