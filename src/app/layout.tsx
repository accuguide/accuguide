import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import "@/app/globals.css";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Accuguide - Discover accessibility",
    default: "Accuguide - Discover accessible places and services",
  },
  authors: [{ name: "Accuguide Team" }],
  metadataBase: new URL("https://accuguide.org/"),
  alternates: {
    canonical: ".",
  },
  description:
    "Accuguide helps you discover accessible places and services near you. Find detailed accessibility information, reviews, and resources to make your daily life easier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="min-h-[80vh] my-8 mx-4 md:mx-12">{children}</div>
          <Footer />
          <div className="fixed bottom-4 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
