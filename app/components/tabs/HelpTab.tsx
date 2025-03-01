'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface FaqItem {
  question: string
  answer: string
  isOpen: boolean
}

export default function HelpTab() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: 'چگونه می‌توانم یک گفتگوی جدید ایجاد کنم؟',
      answer: 'برای ایجاد گفتگوی جدید، روی دکمه "گفتگوی جدید" در منوی سمت راست کلیک کنید.',
      isOpen: false
    },
    {
      question: 'آیا می‌توانم تاریخچه گفتگوهایم را ذخیره کنم؟',
      answer: 'بله، تمام گفتگوهای شما به صورت خودکار ذخیره می‌شوند و می‌توانید از بخش تاریخچه به آن‌ها دسترسی داشته باشید.',
      isOpen: false
    },
    {
      question: 'چگونه می‌توانم مدل هوش مصنوعی را تغییر دهم؟',
      answer: 'برای تغییر مدل هوش مصنوعی، به بخش تنظیمات بروید و از قسمت "تنظیمات مدل هوش مصنوعی" مدل مورد نظر خود را انتخاب کنید.',
      isOpen: false
    },
    {
      question: 'آیا استفاده از این سرویس رایگان است؟',
      answer: 'ما نسخه رایگان با محدودیت تعداد پیام در روز ارائه می‌دهیم. برای استفاده نامحدود، می‌توانید به نسخه پرمیوم ارتقا دهید.',
      isOpen: false
    },
    {
      question: 'چگونه می‌توانم بازخورد ارائه دهم؟',
      answer: 'شما می‌توانید از بخش "تماس با پشتیبانی" در همین صفحه، نظرات و بازخوردهای خود را برای ما ارسال کنید.',
      isOpen: false
    }
  ])
  
  const toggleFaq = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // در اینجا می‌توان پیام را به API ارسال کرد
    if (!subject || !message) {
      toast.error('لطفاً تمام فیلدها را پر کنید')
      return
    }
    
    toast.success('پیام شما با موفقیت ارسال شد')
    setSubject('')
    setMessage('')
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6 font-primary">راهنما و پشتیبانی</h2>
      
      <div className="space-y-6">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-primary">پرسش‌های متداول</h3>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-purple-500/30 pb-4"
              >
                <button 
                  className="flex justify-between items-center w-full text-right"
                  onClick={() => toggleFaq(index)}
                >
                  <h4 className="font-bold text-white font-primary">{faq.question}</h4>
                  <svg 
                    className={`w-5 h-5 text-purple-400 transform transition-transform ${faq.isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {faq.isOpen && (
                  <p className="text-gray-300 mt-2 text-sm font-primary animation-expand">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-primary">تماس با پشتیبانی</h3>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-2 font-primary">موضوع</label>
              <input 
                type="text" 
                className="w-full bg-black/50 text-white p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500/70" 
                placeholder="موضوع پیام را وارد کنید..." 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-primary">پیام</label>
              <textarea 
                className="w-full bg-black/50 text-white p-3 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-500/70 h-32" 
                placeholder="پیام خود را بنویسید..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-primary shadow-lg shadow-purple-700/20 transition-all"
            >
              ارسال پیام
            </button>
          </form>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-primary">راه‌های ارتباطی</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center ml-3">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:support@example.com" className="text-gray-300 hover:text-white transition-colors">support@example.com</a>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center ml-3">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                </svg>
              </div>
              <a href="tel:+989123456789" className="text-gray-300 hover:text-white transition-colors">+98 912 345 6789</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 