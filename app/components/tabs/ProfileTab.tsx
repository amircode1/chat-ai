'use client'

import { useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function ProfileTab() {
  const [name, setName] = useState('کاربر ایرانی')
  const [email, setEmail] = useState('user@example.com')
  const [bio, setBio] = useState('من یک کاربر ایرانی هستم که از هوش مصنوعی برای یادگیری و کارهای روزمره استفاده می‌کنم.')
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const handleUpdateProfile = () => {
    // در اینجا می‌توان اطلاعات پروفایل را به API ارسال کرد
    toast.success('پروفایل با موفقیت بروزرسانی شد')
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePic(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6 font-primary">پروفایل کاربری</h2>
      
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              {profilePic ? (
                <Image 
                  src={profilePic} 
                  alt="تصویر پروفایل" 
                  className="object-cover" 
                  fill
                  sizes="(max-width: 768px) 100px, 96px"
                />
              ) : (
                <IoPerson className="h-12 w-12 text-white" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
              <span className="text-xs text-white">تغییر تصویر</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <h3 className="text-xl font-bold text-white font-primary">{name}</h3>
          <p className="text-gray-300 font-primary">{email}</p>
        </div>
      </div>
      
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 font-primary">اطلاعات کاربری</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2 font-primary">نام کاربری</label>
            <input 
              type="text" 
              className="w-full bg-black/50 text-white p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500/70" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-primary">ایمیل</label>
            <input 
              type="email" 
              className="w-full bg-black/50 text-white p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500/70" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-primary">درباره من</label>
            <textarea 
              className="w-full bg-black/50 text-white p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500/70 h-32" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-primary">تنظیمات اطلاع‌رسانی</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="email-notify" className="mr-2 accent-purple-500" />
                <label htmlFor="email-notify" className="text-gray-300 text-sm font-primary">دریافت ایمیل‌های اطلاع‌رسانی</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="news-notify" className="mr-2 accent-purple-500" />
                <label htmlFor="news-notify" className="text-gray-300 text-sm font-primary">دریافت خبرنامه</label>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-primary shadow-lg shadow-purple-700/20 transition-all"
            onClick={handleUpdateProfile}
          >
            بروزرسانی اطلاعات
          </button>
        </div>
      </div>
    </div>
  )
} 