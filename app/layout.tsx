import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HRBT Traffic Haikus",
  description: "Real-time haikus about Hampton Roads Bridge Tunnel traffic conditions",
  keywords: ["HRBT", "traffic", "haiku", "Hampton Roads", "bridge tunnel", "poetry"],
  authors: [{ name: "HRBT Haikus" }],
  openGraph: {
    title: "HRBT Traffic Haikus",
    description: "Real-time haikus about Hampton Roads Bridge Tunnel traffic conditions",
    type: "website",
    url: defaultUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "HRBT Traffic Haikus",
    description: "Real-time haikus about Hampton Roads Bridge Tunnel traffic conditions",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
