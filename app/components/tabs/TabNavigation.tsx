'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  IoHomeOutline, 
  IoChatbubblesOutline, 
  IoPersonOutline, 
  IoSettingsOutline,
  IoHomeSharp,
  IoChatbubblesSharp,
  IoPersonSharp,
  IoSettingsSharp,
  IoTrendingUpOutline
} from 'react-icons/io5'

interface TabItem {
  name: string
  path: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  badge?: number | null
}

export default function TabNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('')
  const [animateTab, setAnimateTab] = useState<string | null>(null)

  const tabs: TabItem[] = [
    {
      name: 'خانه',
      path: '/',
      icon: <IoHomeOutline className="h-5 w-5" />,
      activeIcon: <IoHomeSharp className="h-5 w-5" />
    },
    {
      name: 'گفتگو',
      path: '/chat',
      icon: <IoChatbubblesOutline className="h-5 w-5" />,
      activeIcon: <IoChatbubblesSharp className="h-5 w-5" />,
      badge: 2
    },
    {
      name: 'پروفایل',
      path: '/profile',
      icon: <IoPersonOutline className="h-5 w-5" />,
      activeIcon: <IoPersonSharp className="h-5 w-5" />
    },
    {
      name: 'تنظیمات',
      path: '/settings',
      icon: <IoSettingsOutline className="h-5 w-5" />,
      activeIcon: <IoSettingsSharp className="h-5 w-5" />
    },
    {
      name: 'راهنما',
      path: '/help',
      icon: <IoTrendingUpOutline className="h-5 w-5" />,
      activeIcon: <IoTrendingUpOutline className="h-5 w-5" />
    }
  ]

  useEffect(() => {
    setActiveTab(pathname)
  }, [pathname])

  const handleTabClick = (path: string) => {
    setAnimateTab(path)
    setTimeout(() => {
      router.push(path)
    }, 200)
  }

  return (
    <div className="w-full fixed bottom-0 md:top-0 md:bottom-auto z-50 glass-effect py-3 px-4 border-t md:border-t-0 md:border-b border-purple-500/30">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-around md:justify-center md:gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`relative flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 md:py-2 border-b-2 transition-all duration-300 ${
                activeTab === tab.path ? 'tab-active' : 'tab-inactive'
              } ${animateTab === tab.path ? 'scale-110' : 'scale-100'}`}
            >
              {activeTab === tab.path ? tab.activeIcon : tab.icon}
              <span className="text-xs md:text-sm font-medium">{tab.name}</span>
              
              {tab.badge && (
                <span className="absolute top-0 right-0 md:-top-1 md:-right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
} 