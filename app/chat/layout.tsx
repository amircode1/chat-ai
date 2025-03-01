import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "گفتگو با هوش مصنوعی فارسی | چت آنلاین با هوش مصنوعی",
  description: "با هوش مصنوعی پیشرفته گفتگو کنید و به سوالات خود پاسخ دقیق و سریع دریافت کنید. پشتیبانی کامل از زبان فارسی.",
  keywords: ["چت هوش مصنوعی", "گفتگو با هوش مصنوعی", "هوش مصنوعی فارسی", "چت آنلاین", "پرسش و پاسخ"],
  openGraph: {
    title: "گفتگو با هوش مصنوعی فارسی | چت آنلاین با هوش مصنوعی",
    description: "با هوش مصنوعی پیشرفته گفتگو کنید و به سوالات خود پاسخ دقیق و سریع دریافت کنید. پشتیبانی کامل از زبان فارسی.",
    images: [
      {
        url: '/chat-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'گفتگو با هوش مصنوعی فارسی',
      },
    ],
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 