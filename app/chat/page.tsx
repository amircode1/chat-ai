import React from 'react'
import { IoWarningOutline } from 'react-icons/io5'

// کامپوننت استاتیک سمت سرور
function ChatHeader() {
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        گفتگو با هوش مصنوعی
      </h1>
      <p className="text-gray-300 mt-2">
        از هوش مصنوعی سوال بپرسید و پاسخ‌های دقیق دریافت کنید
      </p>
    </div>
  )
}

// کامپوننت هشدار API
function ApiWarning() {
  return (
    <div className="mb-8 p-6 bg-red-500/20 border-2 border-red-500 rounded-xl text-center animate-pulse">
      <div className="flex justify-center mb-4">
        <IoWarningOutline className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-3">
        توجه: این چت‌بات فاقد کلید API معتبر است و کار نمی‌کند
      </h2>
      <p className="text-lg text-gray-200 max-w-3xl mx-auto">
        برای استفاده از این برنامه، لطفاً یک کلید API معتبر OpenAI را در فایل .env.local تنظیم کنید
      </p>
    </div>
  )
}

// کامپوننت نمایش وضعیت بارگذاری
function ChatLoading() {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// کامپوننت کلاینت برای بارگذاری پویا
import ClientChatComponent from '../components/ClientChatComponent'

export default function ChatPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* بخش استاتیک سمت سرور */}
      <ChatHeader />
      
      {/* هشدار API */}
      <ApiWarning />
      
      {/* بخش داینامیک سمت کلاینت */}
      <ClientChatComponent fallback={<ChatLoading />} />
    </div>
  )
} 