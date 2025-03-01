import React from 'react'

// کامپوننت استاتیک سمت سرور
function HelpHeader() {
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        راهنما و پشتیبانی
      </h1>
      <p className="text-gray-300 mt-2">
        پاسخ سوالات متداول و راهنمای استفاده از برنامه
      </p>
    </div>
  )
}

// اطلاعات استاتیک سمت سرور
function HelpGuide() {
  return (
    <div className="w-full bg-black/20 backdrop-blur-md p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-white mb-2">راهنمای سریع</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
        <div className="p-3 bg-black/30 rounded-lg">
          <h3 className="font-medium text-purple-300 mb-1">شروع گفتگو</h3>
          <p>برای شروع گفتگو با هوش مصنوعی، کافیست سوال خود را در کادر پایین صفحه تایپ کنید و دکمه ارسال را بزنید.</p>
        </div>
        <div className="p-3 bg-black/30 rounded-lg">
          <h3 className="font-medium text-purple-300 mb-1">ذخیره گفتگوها</h3>
          <p>تمام گفتگوهای شما به صورت خودکار ذخیره می‌شوند و می‌توانید از منوی سمت راست به آنها دسترسی داشته باشید.</p>
        </div>
      </div>
    </div>
  )
}

// کامپوننت نمایش وضعیت بارگذاری
function HelpLoading() {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// کامپوننت کلاینت برای بارگذاری پویا
import ClientHelpTab from '../components/ClientHelpTab'

export default function HelpPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* بخش استاتیک سمت سرور */}
      <HelpHeader />
      <HelpGuide />
      
      {/* بخش داینامیک سمت کلاینت */}
      <ClientHelpTab fallback={<HelpLoading />} />
    </div>
  )
} 