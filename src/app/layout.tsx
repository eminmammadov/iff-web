import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cookies from "@/components/common/Cookies";
import { SEO_CONFIG } from "@/seo/config/seo";
import { OrganizationStructuredData, FinancialServiceStructuredData, WebSiteStructuredData } from "@/seo/components/StructuredData";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: SEO_CONFIG.metadata.title,
  description: SEO_CONFIG.metadata.description,
  keywords: SEO_CONFIG.metadata.keywords,
  authors: [{ name: SEO_CONFIG.metadata.author }],
  creator: SEO_CONFIG.metadata.author,
  publisher: SEO_CONFIG.metadata.publisher,
  robots: SEO_CONFIG.metadata.robots,
  openGraph: {
    type: SEO_CONFIG.openGraph.type,
    locale: SEO_CONFIG.openGraph.locale,
    siteName: SEO_CONFIG.openGraph.siteName,
    title: SEO_CONFIG.openGraph.title,
    description: SEO_CONFIG.openGraph.description,
    images: [
      {
        url: SEO_CONFIG.openGraph.image.url,
        width: SEO_CONFIG.openGraph.image.width,
        height: SEO_CONFIG.openGraph.image.height,
        alt: SEO_CONFIG.openGraph.image.alt,
      },
    ],
  },
  twitter: {
    card: SEO_CONFIG.twitter.card,
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
    title: SEO_CONFIG.twitter.title,
    description: SEO_CONFIG.twitter.description,
    images: [SEO_CONFIG.twitter.image],
  },
  metadataBase: new URL(SEO_CONFIG.site.url),
  alternates: {
    canonical: SEO_CONFIG.technical.canonical,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
        <FinancialServiceStructuredData />
        <WebSiteStructuredData />
      </head>
      <body
        className={`${dmSans.variable} antialiased`}
        data-new-gr-c-s-check-loaded="14.1257.0"
        data-gr-ext-installed=""
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
        <Footer />
        <Cookies />
      </body>
    </html>
  );
}
