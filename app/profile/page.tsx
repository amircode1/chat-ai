import React from 'react'

// کامپوننت استاتیک سمت سرور
function ProfileHeader() {
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        پروفایل کاربری
      </h1>
      <p className="text-gray-300 mt-2">
        اطلاعات شخصی و تنظیمات حساب کاربری خود را مدیریت کنید
      </p>
    </div>
  )
}

// کامپوننت نمایش وضعیت بارگذاری
function ProfileLoading() {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// کامپوننت کلاینت برای بارگذاری پویا
import ClientProfileTab from '../components/ClientProfileTab'

export default function ProfilePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* بخش استاتیک سمت سرور */}
      <ProfileHeader />
      
      {/* بخش داینامیک سمت کلاینت */}
      <ClientProfileTab fallback={<ProfileLoading />} />
    </div>
  )
} 