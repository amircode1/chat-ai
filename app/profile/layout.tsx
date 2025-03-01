import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل کاربری | مدیریت حساب کاربری",
  description: "مدیریت پروفایل و تنظیمات شخصی حساب کاربری خود در سامانه هوش مصنوعی فارسی",
  keywords: ["پروفایل کاربری", "حساب کاربری", "مدیریت حساب", "تنظیمات شخصی", "هوش مصنوعی فارسی"],
  openGraph: {
    title: "پروفایل کاربری | مدیریت حساب کاربری",
    description: "مدیریت پروفایل و تنظیمات شخصی حساب کاربری خود در سامانه هوش مصنوعی فارسی",
    images: [
      {
        url: '/profile-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'پروفایل کاربری هوش مصنوعی فارسی',
      },
    ],
  },
};

export default function ProfileLayout({
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