import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TabNavigation from "./components/tabs/TabNavigation";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "چت هوش مصنوعی فارسی | گفتگو با هوش مصنوعی به زبان فارسی",
  description: "یک برنامه چت مدرن با استفاده از هوش مصنوعی برای پاسخگویی به سوالات شما به زبان فارسی با دقت بالا و سرعت پاسخگویی عالی",
  keywords: ["هوش مصنوعی", "چت", "OpenAI", "GPT", "Next.js", "چت فارسی", "هوش مصنوعی فارسی", "پرسش و پاسخ"],
  authors: [{ name: "نام شما", url: "https://yourwebsite.com" }],
  creator: "نام شما",
  publisher: "نام شما",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://yourwebsite.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://yourwebsite.com',
    title: 'چت هوش مصنوعی فارسی | گفتگو با هوش مصنوعی به زبان فارسی',
    description: 'یک برنامه چت مدرن با استفاده از هوش مصنوعی برای پاسخگویی به سوالات شما به زبان فارسی با دقت بالا و سرعت پاسخگویی عالی',
    siteName: 'چت هوش مصنوعی فارسی',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'چت هوش مصنوعی فارسی',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'چت هوش مصنوعی فارسی | گفتگو با هوش مصنوعی به زبان فارسی',
    description: 'یک برنامه چت مدرن با استفاده از هوش مصنوعی برای پاسخگویی به سوالات شما به زبان فارسی',
    creator: '@yourusername',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#24243e" />
      </head>
      <body className={vazirmatn.className}>
        <Toaster position="bottom-right" />
        <TabNavigation />
        <main className="flex flex-col items-center justify-between pt-16 pb-20 md:pt-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
