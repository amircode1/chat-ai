import React from 'react'

// کامپوننت استاتیک سمت سرور
function SettingsHeader() {
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        تنظیمات برنامه
      </h1>
      <p className="text-gray-300 mt-2">
        تنظیمات برنامه را مطابق با نیازهای خود شخصی‌سازی کنید
      </p>
    </div>
  )
}

// اطلاعات استاتیک سمت سرور
function SettingsInfo() {
  return (
    <div className="w-full bg-black/20 backdrop-blur-md p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-white mb-2">راهنمای تنظیمات</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
        <li>تنظیمات شما به صورت خودکار ذخیره می‌شوند</li>
        <li>تغییر مدل هوش مصنوعی ممکن است بر کیفیت پاسخ‌ها تأثیر بگذارد</li>
        <li>حالت استریمینگ باعث نمایش پاسخ‌ها به صورت تایپ شدن می‌شود</li>
      </ul>
    </div>
  )
}

// کامپوننت نمایش وضعیت بارگذاری
function SettingsLoading() {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// کامپوننت کلاینت برای بارگذاری پویا
import ClientSettingsTab from '../components/ClientSettingsTab'

export default function SettingsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* بخش استاتیک سمت سرور */}
      <SettingsHeader />
      <SettingsInfo />
      
      {/* بخش داینامیک سمت کلاینت */}
      <ClientSettingsTab fallback={<SettingsLoading />} />
    </div>
  )
} 