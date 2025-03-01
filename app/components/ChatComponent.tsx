'use client'

import { useState } from 'react'
import { 
  IoMenuOutline, IoCloseOutline, IoAddCircle, 
  IoBookmarkOutline, IoTrashOutline, IoSearchOutline
} from 'react-icons/io5'
import toast from 'react-hot-toast'
import ChatTab from './tabs/ChatTab'
import SettingsTab from './tabs/SettingsTab'
import ProfileTab from './tabs/ProfileTab'
import HelpTab from './tabs/HelpTab'
import TabNavigation from './tabs/TabNavigation'
import { usePathname } from 'next/navigation'

// تعریف پیام ها
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// تعریف تاریخچه چت
interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  category?: string
}

export default function ChatComponent() {
  // تنظیمات استیت های اصلی
  const [messages, setMessages] = useState<Message[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'گفتگو درباره هوش مصنوعی', messages: [], createdAt: new Date(), category: 'هوش مصنوعی' },
    { id: '2', title: 'برنامه نویسی ریکت', messages: [], createdAt: new Date(Date.now() - 86400000), category: 'برنامه‌نویسی' },
    { id: '3', title: 'آموزش پایتون', messages: [], createdAt: new Date(Date.now() - 172800000), category: 'برنامه‌نویسی' },
  ])
  const [activeChat, setActiveChat] = useState('0')
  const [searchTerm, setSearchTerm] = useState('')
  
  // استفاده از مسیریابی برای تعیین تب فعال
  const pathname = usePathname() || '/chat'
  const tabPath = pathname.split('/')[1] || 'chat'

  // فیلتر کردن تاریخچه چت براساس جستجو
  const filteredHistory = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ایجاد چت جدید
  const createNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'گفتگوی جدید',
      messages: [],
      createdAt: new Date(),
    }
    setChatHistory(prev => [newChat, ...prev])
    setActiveChat(newChat.id)
    setMessages([])
    
    // حتما سایدبار بسته شود در موبایل پس از ایجاد چت جدید
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  // حذف یک چت
  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (chatHistory.length === 1) {
      toast.error('حداقل یک گفتگو باید وجود داشته باشد')
      return
    }
    
    setChatHistory(prev => prev.filter(chat => chat.id !== id))
    if (activeChat === id) {
      setActiveChat(chatHistory[0].id !== id ? chatHistory[0].id : chatHistory[1].id)
      setMessages([])
    }
    
    toast.success('گفتگو با موفقیت حذف شد')
  }

  // انتخاب چت
  const selectChat = (id: string) => {
    setActiveChat(id)
    // در اینجا می‌توان پیام‌های مربوط به چت را از دیتابیس بارگذاری کرد
    setMessages([])
    
    // حتما سایدبار بسته شود در موبایل پس از انتخاب چت
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  // رندر محتوای تب فعال
  const renderTabContent = () => {
    switch (tabPath) {
      case 'chat':
        return <ChatTab messages={messages} setMessages={setMessages} />;
      
      case 'settings':
        return <SettingsTab />;

      case 'profile':
        return <ProfileTab />;
        
      case 'help':
        return <HelpTab />;
        
      default:
        return <ChatTab messages={messages} setMessages={setMessages} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden flex font-primary">
      {/* تب‌های ناوبری */}
      <TabNavigation />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative pt-0 md:pt-14">
        {/* Chat History Sidebar */}
        <div 
          className={`fixed md:relative inset-y-0 right-0 md:w-72 w-3/4 bg-black/40 backdrop-blur-xl transform transition-all duration-500 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          } z-50 border-l border-purple-500/30 md:border-l-0 md:border-r border-purple-500/30 md:pt-0 pt-14`}
        >
          <div className="flex justify-between items-center p-6 border-b border-purple-500/30">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">تاریخچه گفتگوها</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              <IoCloseOutline className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4">
            <button 
              onClick={createNewChat}
              className="w-full py-3 px-4 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-700/20"
            >
              <IoAddCircle className="h-5 w-5" />
              <span className="font-medium">گفتگوی جدید</span>
            </button>
            
            <div className="relative mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو..."
                className="w-full p-3 pl-10 bg-black/30 text-white rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-500/70 transition-all placeholder-gray-400"
              />
              <IoSearchOutline className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="space-y-3 mt-4 overflow-y-auto max-h-[calc(100vh-220px)]">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400">هیچ گفتگویی یافت نشد</p>
                </div>
              ) : (
                filteredHistory.map((chat) => (
                  <div 
                    key={chat.id} 
                    onClick={() => selectChat(chat.id)}
                    className={`p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-purple-500/30 group ${activeChat === chat.id ? 'border-purple-500/50 bg-white/10' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">{chat.title}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-white p-1">
                          <IoBookmarkOutline className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-red-400 p-1"
                          onClick={(e) => deleteChat(chat.id, e)}
                        >
                          <IoTrashOutline className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{chat.messages[chat.messages.length - 1]?.content || 'گفتگوی جدید'}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(chat.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                      {chat.category && (
                        <span className="text-xs py-1 px-2 bg-purple-500/20 rounded-full text-purple-300">
                          {chat.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-screen md:h-[calc(100vh-56px)]">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-lg py-4 px-6 flex justify-between items-center border-b border-purple-500/20">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-white hover:text-purple-300 transition-colors"
            >
              <IoMenuOutline className="h-6 w-6" />
            </button>
            <div className="flex-1 flex justify-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">هوش مصنوعی فارسی</h1>
            </div>
            <div className="w-6 md:hidden"></div> {/* این فضا برای متعادل کردن فاصله‌ها اضافه شده */}
          </div>

          {/* Tab Content Area */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 