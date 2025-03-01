import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تنظیمات برنامه | شخصی‌سازی هوش مصنوعی",
  description: "تنظیمات برنامه هوش مصنوعی فارسی را مطابق با نیازهای خود شخصی‌سازی کنید و از امکانات پیشرفته آن بهره‌مند شوید",
  keywords: ["تنظیمات هوش مصنوعی", "شخصی‌سازی", "تنظیمات برنامه", "هوش مصنوعی فارسی", "تنظیمات چت"],
  openGraph: {
    title: "تنظیمات برنامه | شخصی‌سازی هوش مصنوعی",
    description: "تنظیمات برنامه هوش مصنوعی فارسی را مطابق با نیازهای خود شخصی‌سازی کنید و از امکانات پیشرفته آن بهره‌مند شوید",
    images: [
      {
        url: '/settings-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'تنظیمات هوش مصنوعی فارسی',
      },
    ],
  },
};

export default function SettingsLayout({
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