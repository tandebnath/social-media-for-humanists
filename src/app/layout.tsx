import "./globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "next-themes";

// Load fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata = {
  title: "Social Media for Humanists",
  description: "Social Media for Humanists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system">
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
