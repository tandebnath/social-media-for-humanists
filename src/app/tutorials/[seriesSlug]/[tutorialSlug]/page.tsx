import { tutorialsData } from "@/modules/TutorialsData";
import { notFound } from "next/navigation";
import TutorialsContent from "@/components/TutorialsContent";

interface Params {
  params: {
    seriesSlug: string;
    tutorialSlug: string;
  };
}

export async function generateStaticParams() {
  const params: any = [];
  tutorialsData.forEach((series) => {
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
  const series = tutorialsData.find(
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

  return (
    <div>
      <TutorialsContent
        title={tutorial.title}
        description={tutorial.description}
        longDescription={[
          "This is placeholder text for the long description of the tutorial.",
          "Replace this with actual tutorial content or external Markdown files.",
        ]}
      />
    </div>
  );
};

export default TutorialPage;
