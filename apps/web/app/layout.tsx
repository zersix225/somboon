import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@repo/shadcn/lib/utils";
import "./globals.css";
import { Toaster } from "@repo/shadcn/components/sonner";
import Provider from "@/provider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "somboonautoair",
  description: "For store repairs data",
};

const fontSans = FontSans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
