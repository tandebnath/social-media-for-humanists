import { redirect } from "next/navigation";
import { tutorialsListData } from "@/modules/TutorialsListData";

interface Params {
  params: {
    seriesSlug: string;
  };
}

// Export generateStaticParams to satisfy "output: export"
export async function generateStaticParams() {
  // Generate params for all valid series slugs
  return tutorialsListData.map((series) => ({
    seriesSlug: series.seriesSlug,
  }));
}

// Component for redirection
const SeriesRedirectPage = ({ params }: Params) => {
  const { seriesSlug } = params;

  // Redirect to /tutorials/list#seriesSlug
  redirect(`/tutorials/list#${seriesSlug}`);

  return null;
};

export default SeriesRedirectPage;