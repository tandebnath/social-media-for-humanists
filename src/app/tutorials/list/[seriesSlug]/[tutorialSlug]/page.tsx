import { tutorialsListData } from "@/modules/TutorialsListData";
import { notFound } from "next/navigation";
import TutorialsContent from "@/components/TutorialsContent";
import Link from "next/link";

interface Params {
  params: {
    seriesSlug: string;
    tutorialSlug: string;
  };
}

// Generate static params for all tutorial slugs
export async function generateStaticParams() {
  const params: { seriesSlug: string; tutorialSlug: string }[] = [];

  tutorialsListData.forEach((series) => {
    series.tutorials.forEach((tutorial) => {
      params.push({
        seriesSlug: series.seriesSlug,
        tutorialSlug: tutorial.slug,
      });
    });
  });

  return params;
}

const TutorialPage: React.FC<Params> = ({ params }) => {
  const { seriesSlug, tutorialSlug } = params;

  // Find the tutorial series
  const series = tutorialsListData.find(
    (series) => series.seriesSlug === seriesSlug
  );

  if (!series) {
    return notFound();
  }

  // Find the specific tutorial within the series
  const tutorial = series.tutorials.find(
    (tutorial) => tutorial.slug === tutorialSlug
  );

  if (!tutorial) {
    return notFound();
  }

  // Render only if contentType is "text"
  if (tutorial.contentType !== "text" || !Array.isArray(tutorial.content)) {
    return notFound(); // If not text type or content isn't an array
  }

  return (
    <div
      style={{
        color: "var(--text)",
      }}
    >
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-6">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline" style={{ color: "var(--primary)" }}>
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link href="/tutorials/list" className="hover:underline" style={{ color: "var(--primary)" }}>
              List of Tutorials
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link href={`/tutorials/list#${seriesSlug}`} className="hover:underline" style={{ color: "var(--primary)" }}>
              {series.seriesName}
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="font-semibold" style={{ color: "var(--text)" }}>
            {tutorial.title}
          </li>
        </ul>
      </div>

      {/* Tutorial Content */}
      <TutorialsContent
        title={tutorial.title}
        description={tutorial.description}
        content={tutorial.content}
        seriesSlug={seriesSlug}
      />
    </div>
  );
};

export default TutorialPage;