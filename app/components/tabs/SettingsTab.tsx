'use client'

import { useState, useEffect } from 'react'
import { IoSaveOutline, IoRefreshOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'

interface Settings {
  isStreaming: boolean
  model: string
  temperature: number
  maxTokens: number
}

export default function SettingsTab() {
  const [settings, setSettings] = useState<Settings>({
    isStreaming: true,
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 2000
  })

  // بارگذاری تنظیمات از localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('chat-settings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('خطا در بارگذاری تنظیمات:', error)
      }
    }
  }, [])

  // ذخیره تنظیمات در localStorage
  const saveSettings = () => {
    localStorage.setItem('chat-settings', JSON.stringify(settings))
    toast.success('تنظیمات با موفقیت ذخیره شد')
  }

  // بازنشانی تنظیمات به حالت پیش‌فرض
  const resetSettings = () => {
    const defaultSettings: Settings = {
      isStreaming: true,
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 2000
    }
    setSettings(defaultSettings)
    localStorage.setItem('chat-settings', JSON.stringify(defaultSettings))
    toast.success('تنظیمات به حالت پیش‌فرض بازنشانی شد')
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="glass-effect p-6 rounded-xl mb-6">
        <h2 className="text-xl font-bold text-white mb-4">تنظیمات هوش مصنوعی</h2>
        
        <div className="space-y-6">
          {/* انتخاب مدل */}
          <div>
            <label className="block text-white mb-2">مدل هوش مصنوعی</label>
            <select
              value={settings.model}
              onChange={(e) => setSettings({...settings, model: e.target.value})}
              className="w-full p-3 bg-black/30 text-white rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-500/70 transition-all"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
            <p className="text-gray-400 text-sm mt-1">مدل GPT-3.5 Turbo برای مکالمات عمومی بهینه شده است</p>
          </div>
          
          {/* تنظیم استریمینگ */}
          <div>
            <label className="block text-white mb-2">حالت نمایش پاسخ</label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={settings.isStreaming}
                  onChange={() => setSettings({...settings, isStreaming: true})}
                  className="ml-2 accent-purple-500"
                />
                <span className="text-white">استریمینگ (تایپ شدن)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!settings.isStreaming}
                  onChange={() => setSettings({...settings, isStreaming: false})}
                  className="ml-2 accent-purple-500"
                />
                <span className="text-white">یکجا (کامل)</span>
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-1">در حالت استریمینگ، پاسخ‌ها به صورت تایپ شدن نمایش داده می‌شوند</p>
          </div>
          
          {/* تنظیم دما */}
          <div>
            <label className="block text-white mb-2">دما (خلاقیت): {settings.temperature}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>دقیق (0)</span>
              <span>متعادل (0.5)</span>
              <span>خلاق (1)</span>
            </div>
          </div>
          
          {/* تنظیم حداکثر توکن */}
          <div>
            <label className="block text-white mb-2">حداکثر طول پاسخ: {settings.maxTokens}</label>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={settings.maxTokens}
              onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>کوتاه (500)</span>
              <span>متوسط (2000)</span>
              <span>طولانی (4000)</span>
            </div>
          </div>
          
          {/* دکمه‌های ذخیره و بازنشانی */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={saveSettings}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-700/20"
            >
              <IoSaveOutline className="h-5 w-5" />
              <span>ذخیره تنظیمات</span>
            </button>
            <button
              onClick={resetSettings}
              className="flex-1 py-3 px-4 bg-black/50 hover:bg-black/70 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border border-purple-500/30"
            >
              <IoRefreshOutline className="h-5 w-5" />
              <span>بازنشانی</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="glass-effect p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white mb-4">درباره OpenAI</h2>
        <p className="text-gray-300 mb-4">
          OpenAI یک شرکت پیشرو در زمینه هوش مصنوعی است که مدل‌های زبانی قدرتمندی مانند GPT را توسعه داده است. این مدل‌ها قادر به درک و تولید متن طبیعی هستند و می‌توانند در طیف گسترده‌ای از کاربردها مورد استفاده قرار گیرند.
        </p>
        <p className="text-gray-300">
          مدل GPT-4 با بیش از 1 تریلیون پارامتر، یکی از قدرتمندترین مدل‌های زبانی موجود است که می‌تواند به سوالات پیچیده پاسخ دهد و در حل مسائل منطقی و ریاضی عملکرد بسیار خوبی دارد.
        </p>
      </div>
    </div>
  )
} 