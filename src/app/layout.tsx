import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Access Finder",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container mx-auto my-12">{children}</div>
          <div className="fixed bottom-4 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
