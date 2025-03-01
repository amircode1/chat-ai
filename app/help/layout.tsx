import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "راهنما و پشتیبانی | سوالات متداول هوش مصنوعی فارسی",
  description: "راهنمای استفاده از برنامه هوش مصنوعی فارسی و پاسخ به سوالات متداول کاربران. آموزش کامل استفاده از امکانات برنامه",
  keywords: ["راهنمای هوش مصنوعی", "پشتیبانی", "سوالات متداول", "آموزش", "هوش مصنوعی فارسی", "راهنمای استفاده"],
  openGraph: {
    title: "راهنما و پشتیبانی | سوالات متداول هوش مصنوعی فارسی",
    description: "راهنمای استفاده از برنامه هوش مصنوعی فارسی و پاسخ به سوالات متداول کاربران. آموزش کامل استفاده از امکانات برنامه",
    images: [
      {
        url: '/help-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'راهنمای هوش مصنوعی فارسی',
      },
    ],
  },
};

export default function HelpLayout({
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