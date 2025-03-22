import { tutorialsData } from "@/static/tutorials";
import { notFound } from "next/navigation";
import TutorialsContent from "@/components/TutorialsContent";
import Link from "next/link";
import { richTextToHtml } from "@/utils/richTextParser";

interface Params {
  params: {
    seriesSlug: string;
    tutorialSlug: string;
  };
}

export async function generateStaticParams() {
  const params: { seriesSlug: string; tutorialSlug: string }[] = [];

  tutorialsData.forEach((series) => {
    series.tutorials.forEach((tutorial) => {
      if (tutorial.contentType === "text") {
        params.push({
          seriesSlug: series.seriesSlug,
          tutorialSlug: tutorial.slug,
        });
      }
    });
  });

  return params;
}

const TutorialPage: React.FC<Params> = ({ params }) => {
  const { seriesSlug, tutorialSlug } = params;

  const series = tutorialsData.find((s) => s.seriesSlug === seriesSlug);
  if (!series) return notFound();

  const tutorial = series.tutorials.find((t) => t.slug === tutorialSlug);
  if (!tutorial || tutorial.contentType !== "text" || !tutorial.content) return notFound();

  // Convert Lexical JSON to HTML
  const tutorialContent = richTextToHtml(tutorial.content as any, {
    paragraphSpacing: "1.25rem",
    underlineColor: "var(--accent)",
    underlineThickness: "0.0625rem",
    underlineOffset: "0.2rem"
  });

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
        contentHtml={tutorialContent}
        seriesSlug={seriesSlug}
      />
    </div>
  );
};

export default TutorialPage;