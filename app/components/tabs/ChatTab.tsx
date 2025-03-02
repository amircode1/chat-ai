'use client'

import { useState, useRef, useEffect } from 'react'
import { IoSendSharp, IoSparkles } from 'react-icons/io5'
import toast from 'react-hot-toast'

// تعریف انواع داده
interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatTabProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

// تعریف نوع برای خطاها
interface ApiError {
  message: string;
  status?: number;
}

export default function ChatTab({ messages, setMessages }: ChatTabProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // اسکرول اتوماتیک به آخرین پیام
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // بارگذاری تنظیمات از localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('chat-settings')
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setIsStreaming(settings.isStreaming !== undefined ? settings.isStreaming : true)
        // ذخیره سایر تنظیمات برای استفاده در API
      } catch (error) {
        console.error('خطا در بارگذاری تنظیمات:', error)
      }
    }
  }, [])

  // ارسال پیام به سرور
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      if (isStreaming) {
        // استفاده از استریمینگ
        await handleStreamingResponse(userMessage);
      } else {
        // استفاده از روش معمولی
        await handleNormalResponse(userMessage);
      }
    } catch (error) {
      console.error('خطا در ارسال پیام:', error);
      const typedError = error as ApiError;
      
      // نمایش پیام خطا به کاربر در چت
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: `⚠️ خطا: ${typedError.message || 'مشکلی در ارتباط با سرور هوش مصنوعی پیش آمده است. لطفاً کلید API خود را بررسی کنید یا بعداً دوباره تلاش کنید.'}` 
        };
        return newMessages;
      });
      
      // نمایش اعلان خطا
      toast.error('خطا در ارتباط با هوش مصنوعی');
    } finally {
      setIsLoading(false)
    }
  }

  // پردازش پاسخ به صورت معمولی
  const handleNormalResponse = async (userMessage: Message) => {
    const savedSettings = localStorage.getItem('chat-settings')
    let model = 'gpt-3.5-turbo'
    let temperature = 0.7
    let maxTokens = 2000
    
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        model = settings.model || 'gpt-3.5-turbo'
        temperature = settings.temperature || 0.7
        maxTokens = settings.maxTokens || 2000
      } catch (error) {
        console.error('خطا در بارگذاری تنظیمات:', error)
      }
    }

    // ایجاد یک پیام خالی برای نمایش وضعیت بارگذاری
    setMessages(prev => [...prev, { role: 'assistant', content: 'در حال دریافت پاسخ...' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          streaming: false,
          model,
          temperature,
          maxTokens
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'خطای نامشخص در سرور' }));
        throw new Error(errorData.error || `خطای سرور: ${response.status}`);
      }

      const data = await response.json();
      
      // بروزرسانی پیام با محتوای دریافت شده
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: data.message 
        };
        return newMessages;
      });
    } catch (error) {
      console.error('خطا در ارسال پیام:', error);
      const typedError = error as ApiError;
      
      // نمایش پیام خطا به کاربر در چت
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: `⚠️ خطا: ${typedError.message || 'مشکلی در ارتباط با سرور هوش مصنوعی پیش آمده است. لطفاً کلید API خود را بررسی کنید یا بعداً دوباره تلاش کنید.'}` 
        };
        return newMessages;
      });
      
      // نمایش اعلان خطا
      toast.error('خطا در ارتباط با هوش مصنوعی');
    }
  }

  // پردازش پاسخ به صورت استریمینگ
  const handleStreamingResponse = async (userMessage: Message) => {
    const savedSettings = localStorage.getItem('chat-settings')
    let model = 'gpt-3.5-turbo'
    let temperature = 0.7
    let maxTokens = 2000
    
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        model = settings.model || 'gpt-3.5-turbo'
        temperature = settings.temperature || 0.7
        maxTokens = settings.maxTokens || 2000
      } catch (error: unknown) {
        console.error('خطا در بارگذاری تنظیمات:', error)
      }
    }
    
    // ایجاد یک پیام خالی برای استریمینگ
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          streaming: true,
          model,
          temperature,
          maxTokens
        }),
      });

      if (!response.ok) {
        let errorMessage = 'خطایی در ارتباط با سرور رخ داده است';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('خطا در خواندن پاسخ خطا:', e);
        }
        
        // نمایش پیام خطا به کاربر در چت
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'assistant', 
            content: `⚠️ خطا: ${errorMessage}. لطفاً کلید API خود را در فایل .env.local بررسی کنید.` 
          };
          return newMessages;
        });
        
        // نمایش اعلان خطا
        toast.error(errorMessage);
        console.error('خطای API:', errorMessage, 'کد وضعیت:', response.status);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('خطا در خواندن پاسخ');

      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        content += chunk;
        
        // بروزرسانی پیام در حال استریمینگ
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'assistant', 
            content: content 
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('خطا در استریمینگ پاسخ:', error);
      const typedError = error as ApiError;
      
      // نمایش پیام خطا به کاربر در چت
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: `⚠️ خطا: ${typedError.message || 'مشکلی در ارتباط با سرور هوش مصنوعی پیش آمده است. لطفاً کلید API خود را در فایل .env.local بررسی کنید یا بعداً دوباره تلاش کنید.'}` 
        };
        return newMessages;
      });
      
      // نمایش اعلان خطا
      toast.error('خطا در ارتباط با هوش مصنوعی');
    }
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <IoSparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-primary">به چت هوش مصنوعی خوش آمدید</h2>
            <p className="text-gray-300 max-w-md text-center font-primary">از من هر سوالی دارید بپرسید. من اینجا هستم تا به شما کمک کنم.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] p-4 shadow-lg font-primary break-words overflow-hidden ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-bubble-reverse'
                  : 'bg-black/30 backdrop-blur-sm text-white border border-purple-500/30 rounded-bubble'
              } transition-all hover:shadow-purple-500/20`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.role === 'assistant' && isLoading && index === messages.length - 1 && (
                <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse"></span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-black/30 backdrop-blur-lg border-t border-purple-500/20">
        <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="w-full flex-1 p-4 bg-black/30 text-white rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70 transition-all placeholder-gray-400 font-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex-shrink-0 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-700/20"
          >
            {isLoading ? (
              <div className="h-6 w-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <IoSendSharp className="h-6 w-6" />
            )}
          </button>
        </form>
      </div>
    </>
  )
} 