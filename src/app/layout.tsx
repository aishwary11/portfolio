import { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aishwary Shah | Senior Software Developer",
  description: "Senior Software Developer with 6+ years of experience in MERN stack, React.js, Node.js, and full-stack development. Specializing in scalable web applications, microservices, and CI/CD optimization.",
  keywords: ["Aishwary Shah", "Software Developer", "MERN Stack", "React.js", "Node.js", "Full Stack Developer", "JavaScript", "TypeScript"],
  authors: [{ name: "Aishwary Shah" }],
  creator: "Aishwary Shah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aishwaryshah.com",
    title: "Aishwary Shah | Senior Software Developer",
    description: "Senior Software Developer specializing in MERN stack and full-stack development",
    siteName: "Aishwary Shah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aishwary Shah | Senior Software Developer",
    description: "Senior Software Developer specializing in MERN stack and full-stack development",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
