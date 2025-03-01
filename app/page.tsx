import React from 'react'
import Link from 'next/link'
import { IoRocketOutline, IoChatbubbleOutline, IoSettingsOutline, IoHelpCircleOutline, IoWarningOutline } from 'react-icons/io5'

// کامپوننت سمت سرور برای بهبود SEO
export default function HomePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* هشدار API */}
      <div className="mb-12 p-6 bg-red-500/20 border-2 border-red-500 rounded-xl text-center animate-pulse">
        <div className="flex justify-center mb-4">
          <IoWarningOutline className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
          توجه: این چت‌بات فاقد کلید API معتبر است و کار نمی‌کند
        </h2>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          برای استفاده از این برنامه، لطفاً یک کلید API معتبر OpenAI را در فایل .env.local تنظیم کنید
        </p>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          هوش مصنوعی فارسی
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          با هوش مصنوعی پیشرفته گفتگو کنید و به سوالات خود پاسخ دهید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/chat" className="glass-effect p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <IoChatbubbleOutline className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">گفتگو</h2>
            <p className="text-gray-300">با هوش مصنوعی گفتگو کنید و سوالات خود را بپرسید</p>
          </div>
        </Link>

        <Link href="/profile" className="glass-effect p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <IoRocketOutline className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">پروفایل</h2>
            <p className="text-gray-300">مدیریت پروفایل و تنظیمات شخصی حساب کاربری</p>
          </div>
        </Link>

        <Link href="/settings" className="glass-effect p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <IoSettingsOutline className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">تنظیمات</h2>
            <p className="text-gray-300">شخصی‌سازی برنامه و تنظیمات هوش مصنوعی</p>
          </div>
        </Link>

        <Link href="/help" className="glass-effect p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <IoHelpCircleOutline className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">راهنما</h2>
            <p className="text-gray-300">راهنمای استفاده و پاسخ به سوالات متداول</p>
          </div>
        </Link>
      </div>

      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">ویژگی‌های برنامه</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">پشتیبانی از زبان فارسی</h3>
            <p className="text-gray-300">پشتیبانی کامل از زبان فارسی و پاسخگویی به سوالات به زبان فارسی</p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">رابط کاربری مدرن</h3>
            <p className="text-gray-300">طراحی زیبا و کاربرپسند با امکان شخصی‌سازی رابط کاربری</p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">پاسخگویی سریع</h3>
            <p className="text-gray-300">استفاده از فناوری استریمینگ برای دریافت پاسخ‌ها به صورت آنی</p>
          </div>
        </div>
      </div>
    </div>
  )
}
