'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// بارگذاری پویای کامپوننت سمت کلاینت
const DynamicSettingsTab = dynamic(
  () => import('./tabs/SettingsTab'),
  {
    loading: () => null,
    ssr: false
  }
)

interface ClientSettingsTabProps {
  fallback: React.ReactNode
}

export default function ClientSettingsTab({ fallback }: ClientSettingsTabProps) {
  return (
    <Suspense fallback={fallback}>
      <DynamicSettingsTab />
    </Suspense>
  )
} 